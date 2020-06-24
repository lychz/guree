import React, { ReactNode, ChangeEventHandler, useState } from "react";
import "./Input.scss";
import {
  combineClasses,
  scopedClass,
  classesObj,
  updateStateOnPropChange,
  inlineFlexSpan,
} from "@utils/index";
import Icon from "@components/Icon";
import { isUndefined } from "util";

interface Props {
  /** 后遮罩 */
  addonAfter?: ReactNode;
  /** 前遮罩 */
  addonBefore?: ReactNode;
  /** 占位字符 */
  placeholder?: string;
  /** 禁用状态 */
  disabled?: boolean;
  /** 前缀 */
  prefix?: ReactNode;
  /** 后缀 */
  suffix?: ReactNode;
  /** 类型，同 input 原生标签一致，除了 textarea */
  type?: string;
  /** 输入值 */
  value?: string;
  /** 输入值变化时的回调 */
  onChange?: (value: string) => {};
  /** 显示清空按钮 */
  allowClear?: boolean;
  /** 点击清空按钮的回调 */
  onClickClear?: () => {};
  /** 默认值 */
  defaultValue?: string;
}

const Input: React.FunctionComponent<Props> = ({
  addonAfter,
  addonBefore,
  placeholder,
  disabled,
  prefix,
  suffix,
  type,
  value,
  onChange,
  allowClear,
  onClickClear,
  defaultValue,
}: Props) => {
  const InputClass = (...classes: (string | Array<string> | classesObj)[]) =>
    scopedClass("input", ...classes);

  const InputClassNames = (disabled?: boolean) => {
    return combineClasses(InputClass(), InputClass(disabled ? "disabled" : ""));
  };

  const [realValue, setValue] = useState(
    isUndefined(value) ? defaultValue : value
  );

  updateStateOnPropChange(value, setValue);

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value: inputValue } = e.target;
    onChange && onChange(inputValue || "");
    if (disabled || !isUndefined(value)) {
      return;
    }
    setValue(inputValue || "");
  };

  const clear = () => {
    onClickClear && onClickClear();
    if (disabled || !isUndefined(value)) {
      return;
    }
    setValue("");
  };

  const PureInput = (
    <input
      className={InputClass("content")}
      type={type === "textarea" ? undefined : type}
      placeholder={placeholder}
      value={realValue || ""}
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
            {allowClear && realValue ? (
              <span
                className={combineClasses(inlineFlexSpan, InputClass("clear"))}
              >
                <Icon
                  name="times-circle"
                  fill="currentColor"
                  onClick={clear}
                ></Icon>
              </span>
            ) : null}
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
