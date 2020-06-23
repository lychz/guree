import React, { ReactNode, useState, ReactEventHandler } from "react";
import "./Radio.scss";
import {
  combineClasses,
  scopedClass,
  classesObj,
  updateStateOnPropChange,
} from "@utils/index";

export interface radioAttrs {
  children: ReactNode;
  value: any;
  disabled: boolean;
  checked: boolean;
}

export interface Props {
  children?: ReactNode;
  /** Radio 的值，可用于与其他 Radio 区分 */
  value?: any;
  /** 禁用状态 */
  disabled?: boolean;
  /** 选中状态 */
  checked?: boolean;
  /** 点击时调用 */
  onClick?: (radioAttrs: radioAttrs) => {};
}

const Radio: React.FunctionComponent<Props> = ({
  children,
  value,
  disabled = false,
  checked = false,
  onClick,
}: Props) => {
  const radioClass = (...classes: (string | Array<string> | classesObj)[]) =>
    scopedClass("radio", ...classes);

  const [checkedStatus, setCheckedStatus] = useState(checked);
  const select = () => {
    setCheckedStatus(true);
  };

  const radioClassName = combineClasses({
    [radioClass()]: true,
    [radioClass("selected")]: checkedStatus,
    [radioClass("disabled")]: disabled,
  });
  const clickHandler: ReactEventHandler<HTMLElement> = (e) => {
    if (disabled) {
      return;
    }
    select();
    onClick && onClick({ children, value, disabled, checked: !checkedStatus });
  };
  updateStateOnPropChange(checked, setCheckedStatus);
  return (
    <span className={radioClassName} onClick={clickHandler}>
      <span className={radioClass("inner")}></span>
      <span className={radioClass("name")}>{children}</span>
    </span>
  );
};

export default Radio;
