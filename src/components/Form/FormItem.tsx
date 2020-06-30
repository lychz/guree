import React, { ReactNode, ReactElement, useState, useEffect } from "react";
import "./Form.scss";
import { scopedClass, classesObj, combineClasses } from "@utils/index";
import Col from "@components/Col";
import { Props as ColProps } from "@components/Col/Col";
import Row from "@components/Row";
import FormContext from "./context";
import { Rules, validate, ValidateResult, verify } from './validator'

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



  const array: Array<string> = []

  const [errorMsgs, setErrorMsgs] = useState(array);

  return (
    <FormContext.Consumer>
      {({ form, setForm, errorForm }) => {
        const value = form[name];
        const msg = errorForm[name]
        console.log(msg)
        const onChange = (value: unknown) => {
          setForm &&
            setForm(
              Object.assign(
                {},
                {
                  [name]: value,
                }
              )
            );
            // setErrorMsgs(msg)
            // verify(rules, value).then(res => {
            //   if (!res) {
            //     return
            //   }
            //   setErrorMsgs(res)
            // })
            // verify(value);
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
                  {msg && msg
                    .map((x: string, i: number) => (
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
