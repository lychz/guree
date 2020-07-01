import React, { ReactNode, ReactElement, useState, useEffect } from "react";
import "./Form.scss";
import { scopedClass, classesObj, combineClasses } from "@utils/index";
import Col from "@components/Col";
import { Props as ColProps } from "@components/Col/Col";
import Row from "@components/Row";
import FormContext from "./context";
import { Rules, validate, ValidateResult, verify } from "./validator";

interface Props {
  children: ReactElement;
  label?: ReactNode;
  labelAlign?: "left" | "center" | "right";
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  name: string;
  rules?: Rules;
}

const Form: React.FunctionComponent<Props> = ({
  children,
  label,
  labelAlign = "right",
  labelCol = { span: 8 },
  wrapperCol = { span: 16 },
  name,
  rules = [],
}: Props) => {
  const formItemClass = (...classes: (string | Array<string> | classesObj)[]) =>
    scopedClass("form-item", ...classes);

  const labelClassName = combineClasses({
    [formItemClass("label")]: true,
    [formItemClass(`label-${labelAlign}`)]: Boolean(labelAlign),
  });

  return (
    <FormContext.Consumer>
      {({ formContext: { fields = {} } }) => {
        const { getForm, setForm, getErrorMsgs, setErrorsMsgs } = fields;
        const value = getForm && getForm(name);
        const errorMsgs = getErrorMsgs && getErrorMsgs(name);
        const onChange = async (value: unknown) => {
          setForm &&
            setForm((preFormState) => {
              return Object.assign({}, preFormState, {
                [name]: value,
              })
            });
          const res = await verify(rules, value);
          setErrorsMsgs &&
            setErrorsMsgs((preErrorMsgs) => {
              return Object.assign({}, preErrorMsgs, {
                [name]: res || []
              })
            });
        };

        return (
          <div className={formItemClass("wrapper")}>
            <Row>
              <Col {...labelCol}>
                <div className={labelClassName}>{label}</div>
              </Col>
              <Col {...wrapperCol}>
                <div className={formItemClass("input")}>
                  {React.cloneElement(
                    children,
                    Object.assign({}, children.props, {
                      value,
                      onChange,
                    })
                  )}
                </div>
                <div className={formItemClass("error")}>
                  {errorMsgs &&
                    errorMsgs.map((x: string, i: number) => (
                      <div key={`${i}`}>{x}</div>
                    ))}
                </div>
              </Col>
            </Row>
          </div>
        );
      }}
    </FormContext.Consumer>
  );
};

export default Form;
