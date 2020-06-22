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
  status: boolean;
}

export interface Props {
  children: ReactNode;
  value: any;
  disabled: boolean;
  status: boolean;
  onClick: (radioAttrs: radioAttrs) => {};
}

const Radio: React.FunctionComponent<Props> = ({
  children,
  value,
  disabled,
  status,
  onClick,
}: Props) => {
  const radioClass = (...classes: (string | Array<string> | classesObj)[]) =>
    scopedClass("radio", ...classes);

  const [selectStatus, setSelectStatus] = useState(status);
  const select = () => {
    setSelectStatus(true);
  };

  const radioClassName = combineClasses({
    [radioClass()]: true,
    [radioClass("selected")]: selectStatus,
    [radioClass("disabled")]: disabled,
  });
  const clickHandler: ReactEventHandler<HTMLElement> = (e) => {
    if (disabled) {
      return;
    }
    select();
    onClick && onClick({ children, value, disabled, status });
  };
  updateStateOnPropChange(status, setSelectStatus);
  return (
    <span className={radioClassName} onClick={clickHandler}>
      <span className={radioClass("inner")}></span>
      <span className={radioClass("name")}>{children}</span>
    </span>
  );
};

export default Radio;
