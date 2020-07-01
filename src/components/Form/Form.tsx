import React, {
  ReactNode,
  useState,
  FormEventHandler,
  useRef,
  ReactElement,
  useEffect,
} from "react";
import "./Form.scss";
import { scopedClass } from "@utils/index";
import FormContext from "./context";
import { validate, verify } from "./validator";
import { useFormFields, FormState, SetErrorsMsgs } from "./fields";

interface Props {
  children: ReactElement;
  onFinish: (formValues: FormState) => {};
}

const getInitProps = (children: ReactElement) => {
  const childrensProps = React.Children.map(children, (item) => {
    const { name, value, rules } = item.props;
    return {
      name,
      value,
      rules,
    };
  });

  const initForm = childrensProps.reduce((previous, current) => {
    if (!current.name) {
      return previous;
    }
    return Object.assign(
      {},
      {
        [current.name]: current.value,
      },
      previous
    );
  }, {});

  const initFormErrors = childrensProps.reduce((previous, current) => {
    if (!current.name) {
      return previous;
    }
    return Object.assign(
      {},
      {
        [current.name]: [],
      },
      previous
    );
  }, {});

  return {
    initForm, initFormErrors
  }
};

const Form: React.FunctionComponent<Props> = ({
  children,
  onFinish,
}: Props) => {
  const fields = useFormFields();
  
  fields.init(children);
  const {getForm, getAllForm, setErrorsMsgs, getChildrenProps} = fields
  const formValues = getAllForm()

  const totalValidate = (
    setErrorsMsgs: SetErrorsMsgs
  ) => {
    getChildrenProps().forEach(async (item) => {
      const {name, rules} = item
      const res = await verify(rules, getForm(name))
      setErrorsMsgs((preErrorMsgs) => {
        return Object.assign({}, preErrorMsgs, {
          [name]: res || [],
        })
      });
    });
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    totalValidate(setErrorsMsgs);
    onFinish(formValues);
  };
  return (
    <FormContext.Provider
      value={{
        formContext: { fields: fields },
      }}
    >
      <form onSubmit={submitHandler}>{children}</form>
    </FormContext.Provider>
  );
};

export default Form;
