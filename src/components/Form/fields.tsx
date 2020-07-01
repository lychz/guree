import { useState, ReactElement } from "react";
import React from "react";

export interface FormState {
  [k: string]: unknown;
}

export interface FormErrorsMsgs {
  [k: string]: string[];
}

export interface childrenProp {
  name: any;
  value: any;
  rules: any;
}

export type Init = (children: ReactElement) => void;
export type Set = (state: React.SetStateAction<FormState>) => void
export type Get = (name: string) => unknown
export type GetAll = () => FormState
export type SetErrorsMsgs = (errorMsgs: React.SetStateAction<FormErrorsMsgs>) => void
export type GetErrorMsgs = (name: string) => string[];
export type GetAllErrorMsgs = () => FormErrorsMsgs;
export type GetChildrenProps=  () => childrenProp[];

export interface UseFormFields {
  init: Init;
  setForm: Set;
  getForm: Get;
  getAllForm: GetAll;
  setErrorsMsgs: SetErrorsMsgs;
  getErrorMsgs: GetErrorMsgs;
  getAllErrorMsgs: GetAllErrorMsgs;
  getChildrenProps: GetChildrenProps;
}

const getInitProps = (children: ReactElement) => {
  const childrensProps = React.Children.map(children, (item) => {
    const { name, value, rules } = item.props;
    return {
      name,
      value,
      rules,
    };
  }).filter((item) => item.name);

  const initForm = childrensProps.reduce(
    (previous, current) =>
      Object.assign(
        {},
        {
          [current.name]: current.value,
        },
        previous
      ),
    {}
  );

  const initFormErrors = childrensProps.reduce(
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

  return {
    childrensProps,
    initForm,
    initFormErrors,
  };
};

const useFormFields: () => UseFormFields = () => {
  let childrensProps: childrenProp[];
  let formState: FormState;
  let setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  let formErrorsMsgs: FormErrorsMsgs;
  let setFormErrorsMsgs: React.Dispatch<React.SetStateAction<FormErrorsMsgs>>;

  const init = (children: ReactElement) => {
    const initProps = getInitProps(children);
    const { initForm, initFormErrors } = initProps;
    childrensProps = initProps.childrensProps;
    [formState, setFormState] = useState(initForm);
    [formErrorsMsgs, setFormErrorsMsgs] = useState(initFormErrors);
  };

  const setForm = (state: React.SetStateAction<FormState>) => {
    if (typeof state === "function") {
      setFormState(state)
    } else {
      setFormState(Object.assign({}, formState, state));
    }
  };

  const getForm = (name: string) => {
    return formState[name];
  };

  const getAllForm = () => {
    return formState;
  };

  const setErrorsMsgs = (errorMsgs: React.SetStateAction<FormErrorsMsgs>) => {
    if (typeof errorMsgs === "function") {
      setFormErrorsMsgs(errorMsgs)
    } else {
      setFormErrorsMsgs(Object.assign({}, formErrorsMsgs, errorMsgs));
    }
  };

  const getErrorMsgs = (name: string) => {
    return formErrorsMsgs[name];
  };

  const getAllErrorMsgs = () => {
    return formErrorsMsgs;
  };

  const getChildrenProps = () => {
    return childrensProps
  }

  return {
    init,
    setForm,
    getForm,
    getAllForm,
    setErrorsMsgs,
    getErrorMsgs,
    getAllErrorMsgs,
    getChildrenProps,
  };
};

export { useFormFields };
