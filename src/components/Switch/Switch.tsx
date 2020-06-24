import React, { ReactNode, MouseEventHandler, useState } from "react";
import "./Switch.scss";
import {
  combineClasses,
  scopedClass,
  classesObj,
  updateStateOnPropChange,
} from "@utils/index";

interface Props {
  /** 选中状态 */
  checked: boolean;
  /** 默认选中状态 */
  defaultChecked: boolean;
  /** 选中时的内容 */
  checkedChildren: ReactNode;
  /** 未选中时的内容 */
  unCheckedChildren: ReactNode;
  /** 禁用状态 */
  disabled: boolean;
  /** 状态改变时的回调 */
  onChange: (checked: boolean) => {};
}

const Switch: React.FunctionComponent<Props> = ({
  checked,
  defaultChecked,
  checkedChildren,
  unCheckedChildren,
  disabled,
  onChange,
}: Props) => {
  const switchClass = (...classes: (string | Array<string> | classesObj)[]) =>
    scopedClass("switch", ...classes);

  const [checkedStatus, setCheckedStatus] = useState(typeof checked === "undefined" ? defaultChecked : checked);

  const switchClassName = combineClasses({
    [switchClass()]: true,
    [switchClass("checked")]: checkedStatus,
    [switchClass("disabled")]: disabled,
  });

  const change: MouseEventHandler<HTMLElement> = (e) => {
    if (disabled || typeof checked !== "undefined") {
      return
    }
    setCheckedStatus(!checkedStatus)
    onChange && onChange(!checkedStatus);
  };
  updateStateOnPropChange(checked, setCheckedStatus);
  return (
    <span className={switchClassName} onClick={change}>
      <span className={switchClass("unvisible")}>
        <span className={switchClass("handler")}></span>
        <span className={switchClass("inner")}>
          {checkedStatus ? checkedChildren : unCheckedChildren}
        </span>  
      </span>
      <span className={switchClass("handler")}></span>
      <span className={switchClass("inner")}>
        {checkedStatus ? checkedChildren : unCheckedChildren}
      </span>
    </span>
  );
};

export default Switch;
