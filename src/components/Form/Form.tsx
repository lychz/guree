import React, { FormEventHandler, ReactElement, useEffect } from "react";
import "./Form.scss";
import { scopedClass } from "@utils/index";
import FormContext from "./context";
import { verify } from "./validator";
import { useFormField, FormState, SetErrorsMsgs } from "./field";

interface Props {
  children: ReactElement;
  /** 提交时调用 */
  onFinish?: (formValues: FormState) => {};
  /** 表单值发生变化时调用 */
  onChange: (changeedValue: FormState) => {};
}

const Form: React.FunctionComponent<Props> = ({
  children,
  onFinish,
  onChange,
}: Props) => {
  const fields = useFormField(children);
  const { getForm, getAllForm, setErrorsMsgs, getChildrenProps } = fields;
  const formValues = getAllForm();

  const totalValidate = (setErrorsMsgs: SetErrorsMsgs) => {
    return Promise.all(
      getChildrenProps().map(async (item) => {
        const { name, rules } = item;
        const res = await verify(rules, getForm(name));
        const { status, errorMsgs } = res;
        setErrorsMsgs((preErrorMsgs) => {
          return Object.assign({}, preErrorMsgs, {
            [name]: errorMsgs,
          });
        });
        return status;
      })
    );
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await totalValidate(setErrorsMsgs);
    const validateResult = res.reduce((total, cur) => total && cur, true);
    validateResult && onFinish && onFinish(formValues);
  };

  useEffect(() => {
    onChange(formValues);
  }, [formValues]);
  return (
    <FormContext.Provider
      value={{
        formContext: { fields: fields },
      }}
    >
      <form onSubmit={submitHandler} className={scopedClass("form")}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

export default Form;
