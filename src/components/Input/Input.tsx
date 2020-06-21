import React, { ReactNode, ChangeEventHandler, ChangeEvent, useState } from "react";
import "./Input.scss";
import { combineClasses, scopedClass, classesObj, updateStateOnPropChange, inlineFlexSpan } from "@utils/index";
import Icon from "@components/Icon";

interface Props {
  addonAfter?: ReactNode;
  addonBefore?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  type?: string;
  value?: string;
  onChange?: ChangeEventHandler<Element>;
  allowClear?: boolean;
}


const Input: React.FunctionComponent<Props> = ({
  addonAfter,
  addonBefore,
  placeholder,
  disabled,
  prefix,
  suffix,
  type,
  value = "",
  onChange,
  allowClear,
}: Props) => {
  const InputClass = (...classes: (string | Array<string> | classesObj)[]) =>
    scopedClass("input", ...classes);

  const InputClassNames = (disabled?: boolean) => {
    return combineClasses(InputClass(), InputClass(disabled ? "disabled" : ""));
  };

  const [realValue, setValue] = useState(value)

  updateStateOnPropChange(value, setValue)

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value || '')
    onChange && onChange(e)
  }

  const clear = () => {
    setValue("")
  }

  const PureInput = (
    <input
      className={InputClass("content")}
      type={type === "textarea" ? undefined : type}
      placeholder={placeholder}
      value={realValue}
      onChange={changeHandler}
      disabled={disabled}
    />
  );

  return (
    <div className={InputClassNames(disabled)}>
      {addonBefore ? (
        <div
          className={combineClasses(
            InputClass("add-on"),
            InputClass("add-on-before")
          )}
        >
          {addonBefore}
        </div>
      ) : null}
      {prefix || suffix || allowClear ? (
        <div className={InputClass("affix-wrapper")}>
          <div
            className={combineClasses(
              InputClass("affix"),
              InputClass("pre-fix")
            )}
          >
            {prefix}
          </div>
          {PureInput}
          <div
            className={combineClasses(
              InputClass("affix"),
              InputClass("suf-fix")
            )}
          >
            {allowClear && realValue ? <span className={combineClasses(inlineFlexSpan, InputClass("clear"))}><Icon name="times-circle" fill="currentColor" onClick={clear}></Icon></span>: null}
            {suffix}
          </div>
        </div>
      ) : (
        PureInput
      )}
      {addonAfter ? (
        <div
          className={combineClasses(
            InputClass("add-on"),
            InputClass("add-on-after")
          )}
        >
          {addonAfter}
        </div>
      ) : null}
    </div>
  );
};

export default Input;
