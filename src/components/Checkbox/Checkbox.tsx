import React, {
  ReactNode,
  useState,
  MouseEventHandler,
  useEffect,
  useRef,
} from "react";
import "./Checkbox.scss";
import {
  combineClasses,
  scopedClass,
  classesObj,
  updateStateOnPropChange,
} from "@utils/index";
import Icon from "@components/Icon";
import { isUndefined } from "util";

export interface checkAttrs {
  children: ReactNode;
  value: any;
  disabled: boolean;
  checked: boolean;
  indeterminate?: boolean;
}

interface Props {
  children?: ReactNode;
  /** Checkbox 的值，可用于与其他 Checkbox 区分 */
  value?: any;
  /** 选中状态 */
  checked?: boolean;
  /** 禁用状态 */
  disabled?: boolean;
  /** 设置 indeterminate 状态，只负责样式控制 */
  indeterminate?: boolean;
  /** 点击时调用 */
  onChange?: (checkAttrs: checkAttrs) => {};
  /** 默认选中状态*/
  defaultChecked?: boolean;
}

const Checkbox: React.FunctionComponent<Props> = ({
  children,
  value,
  checked,
  disabled = false,
  indeterminate,
  defaultChecked,
  onChange,
}: Props) => {
  const checkboxClass = (...classes: (string | Array<string> | classesObj)[]) =>
    scopedClass("checkbox", ...classes);

  const [checkedStatus, setCheckedStatus] = useState(
    isUndefined(checked) ? defaultChecked : checked
  );
  const check = () => {
    setCheckedStatus(!checkedStatus);
  };

  const checkboxClassName = combineClasses({
    [checkboxClass()]: true,
    [checkboxClass("checked")]: Boolean(checkedStatus),
    [checkboxClass("disabled")]: disabled,
    [checkboxClass("indeterminate")]:
      !Boolean(checkedStatus) && Boolean(indeterminate),
  });

  const clickHandler: MouseEventHandler<HTMLElement> = (e) => {
    if (disabled) {
      return;
    }
    onChange &&
      onChange({
        children,
        value,
        disabled,
        checked: !checkedStatus,
        indeterminate,
      });

    if (!isUndefined(checked)) {
      return;
    }
    check();
  };

  updateStateOnPropChange(checked, setCheckedStatus);

  return (
    <span className={checkboxClassName} onClick={clickHandler}>
      <span className={checkboxClass("inner")}>
        {checkedStatus ? (
          <Icon name="check" fill="#fff" size="10px"></Icon>
        ) : null}
      </span>
      <span className={checkboxClass("name")}>{children}</span>
    </span>
  );
};

export default Checkbox;
