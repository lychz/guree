import React, { ReactNode, MouseEventHandler, useState } from "react";
import "./Switch.scss";
import {
  combineClasses,
  scopedClass,
  classesObj,
  updateStateOnPropChange,
} from "@utils/index";
import { isUndefined } from "util";

interface Props {
  /** 选中状态 */
  value?: boolean;
  /** 默认选中状态 */
  defaultValue?: boolean;
  /** 选中时的内容 */
  checkedChildren?: ReactNode;
  /** 未选中时的内容 */
  unCheckedChildren?: ReactNode;
  /** 禁用状态 */
  disabled?: boolean;
  /** 状态改变时的回调 */
  onChange?: (checked: boolean) => {};
}

const Switch: React.FunctionComponent<Props> = ({
  value,
  defaultValue,
  checkedChildren,
  unCheckedChildren,
  disabled = false,
  onChange,
}: Props) => {
  const switchClass = (...classes: (string | Array<string> | classesObj)[]) =>
    scopedClass("switch", ...classes);

  const [checkedStatus, setCheckedStatus] = useState(
    isUndefined(value) ? defaultValue : value
  );

  const switchClassName = combineClasses({
    [switchClass()]: true,
    [switchClass("checked")]: Boolean(checkedStatus),
    [switchClass("disabled")]: disabled,
  });

  const change: MouseEventHandler<HTMLElement> = (e) => {
    onChange && onChange(!checkedStatus);
    if (disabled || !isUndefined(value)) {
      return;
    }
    setCheckedStatus(!checkedStatus);
  };
  updateStateOnPropChange(value, setCheckedStatus);

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
