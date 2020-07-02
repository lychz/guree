import { useState, ReactElement, useMemo } from "react";
import React from "react";
import { Rules } from "./validator";

export interface FormState {
  [k: string]: unknown;
}

export interface FormErrorsMsgs {
  [k: string]: string[];
}

export interface ChildrenProp {
  name: string;
  defaultValue: unknown;
  rules: Rules;
}

export type SetForm = (state: React.SetStateAction<FormState>) => void;
export type GetForm = (name: string) => unknown;
export type GetAllForm = () => FormState;
export type SetErrorsMsgs = (
  errorMsgs: React.SetStateAction<FormErrorsMsgs>
) => void;
export type GetErrorMsgs = (name: string) => string[];
export type GetChildrenProps = () => ChildrenProp[];

export interface UseForm {
  setForm: SetForm;
  getForm: GetForm;
  getAllForm: GetAllForm;
  setErrorsMsgs: SetErrorsMsgs;
  getErrorMsgs: GetErrorMsgs;
  getChildrenProps: GetChildrenProps;
}

const getInitProps: (
  children: ReactElement
) => {
  childrensProps: ChildrenProp[];
  initForm: FormState;
  initFormErrors: FormErrorsMsgs;
} = (children) => {
  const childrensProps = useMemo(() => {
    return React.Children.map(children, (item) => {
      const { name, rules, defaultValue } = item.props;
      return {
        name,
        defaultValue,
        rules,
      };
    }).filter((item) => item.name);
  }, [children]);

  const initForm = useMemo(() => {
    return childrensProps.reduce(
      (previous, current) =>
        Object.assign(
          {},
          {
            [current.name]: current.defaultValue,
          },
          previous
        ),
      {}
    );
  }, childrensProps);

  const initFormErrors = useMemo(() => {
    return childrensProps.reduce(
      (previous, current) =>
        Object.assign(
          {},
          {
            [current.name]: [],
          },
          previous
        ),
      {}
    );
  }, childrensProps);

  return {
    childrensProps,
    initForm,
    initFormErrors,
  };
};

const useFormField: (children: ReactElement) => UseForm = (children) => {
  const initProps = getInitProps(children);
  const { initForm, initFormErrors } = initProps;
  const childrensProps = initProps.childrensProps;
  const [formState, setFormState] = useState(initForm);
  const [formErrorsMsgs, setFormErrorsMsgs] = useState(initFormErrors);

  const setForm = (state: React.SetStateAction<FormState>) => {
    setFormState(state);
  };

  const getForm = (name: string) => {
    return formState[name];
  };

  const getAllForm = () => {
    return formState;
  };

  const setErrorsMsgs = (errorMsgs: React.SetStateAction<FormErrorsMsgs>) => {
    setFormErrorsMsgs(errorMsgs);
  };

  const getErrorMsgs = (name: string) => {
    return formErrorsMsgs[name];
  };

  const getChildrenProps = () => {
    return childrensProps;
  };

  return {
    setForm,
    getForm,
    getAllForm,
    setErrorsMsgs,
    getErrorMsgs,
    getChildrenProps,
  };
};

export { useFormField };
