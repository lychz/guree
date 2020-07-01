import React, { ReactNode, ReactElement, useState } from "react";
import "./Form.scss";
import { scopedClass, classesObj, combineClasses } from "@utils/index";
import Col from "@components/Col";
import { Props as ColProps } from "@components/Col/Col";
import Row from "@components/Row";
import FormContext from "./context";
import { Rules, verify } from "./validator";
import { FormState } from "./field";

interface Props {
  children: ReactElement;
  /** 标签 */
  label?: ReactNode;
  /** 标签对齐方式 */
  labelAlign?: "left" | "center" | "right";
  /** 标签布局，同 `Col` 组件 */
  labelCol?: ColProps;
  /** 控件布局，同 `Col` 组件 */
  wrapperCol?: ColProps;
  /** 字段名 */
  name: string;
  /** 验证规则 */
  rules?: Rules;
  /** 当前表单控件的值发生变化时调用 */
  onChange?: (changeedValue: FormState) => {};
  /** 默认值 */
  defaultValue: unknown;
}

const Form: React.FunctionComponent<Props> = ({
  children,
  label,
  labelAlign = "right",
  labelCol = { span: 8 },
  wrapperCol = { span: 16 },
  name,
  rules = [],
  onChange,
  defaultValue,
}: Props) => {
  const formItemClass = (...classes: (string | Array<string> | classesObj)[]) =>
    scopedClass("form-item", ...classes);
  const isRequired = rules.reduce(
    (total, rule) => rule.required || total,
    false
  );
  const labelClassName = combineClasses({
    [formItemClass("label")]: true,
    [formItemClass(`label-${labelAlign}`)]: Boolean(labelAlign),
    [formItemClass(`label-required`)]: isRequired,
  });

  const [formItemInputClassName, setFormItemInputClassName] = useState(
    formItemClass("input")
  );

  return (
    <FormContext.Consumer>
      {({ formContext: { fields = {} } }) => {
        const { getForm, setForm, getErrorMsgs, setErrorsMsgs } = fields;
        const value = getForm && getForm(name);
        const errorMsgs = getErrorMsgs && getErrorMsgs(name);
        const onChangeHandler = async (value: unknown) => {
          const changeState = {
            [name]: value,
          };
          onChange && onChange(changeState);
          setForm &&
            setForm((preFormState) => {
              return Object.assign({}, preFormState, changeState);
            });
          const res = await verify(rules, value);
          const { status, errorMsgs } = res;
          setFormItemInputClassName(
            combineClasses({
              [`${formItemClass("input")}`]: true,
              [`${formItemClass("input-error")}`]: !status,
            })
          );
          setErrorsMsgs &&
            setErrorsMsgs((preErrorMsgs) => {
              return Object.assign({}, preErrorMsgs, {
                [name]: errorMsgs || [],
              });
            });
        };

        return (
          <div className={formItemClass()}>
            <Row>
              <Col {...labelCol}>
                <div className={labelClassName}>{label}</div>
              </Col>
              <Col {...wrapperCol}>
                <div className={formItemInputClassName}>
                  {React.Children.map(children, (item) =>
                    React.cloneElement(
                      item,
                      Object.assign({}, children.props, {
                        value: value,
                        onChange: onChangeHandler,
                      })
                    )
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
