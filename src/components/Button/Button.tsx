import React, { ReactNode } from "react";
import "./Button.scss";
import Icon from "@components/Icon";
import { combineClasses, scopedClass, classesObj } from "@utils/index";

type sizeType = "large" | "middle" | "small";
interface Props {
  children?: ReactNode;
  /** 按钮大小 */
  size?: sizeType;
  /** 图标名称 */
  icon?: string;
  /** 加载状态 */
  loading?: boolean;
  /** 禁用状态 */
  disabled?: boolean;
  /** 按钮类型 */
  type?: "default" | "primary" | "warning" | "danger" | "text";
  /** 点击按钮触发 */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** 按钮的原生类型 */
  htmlType?: "button" | "submit" | "reset"
}

const Button: React.FunctionComponent<Props> = ({
  children,
  size = "middle",
  icon,
  loading,
  disabled,
  type = "default",
  onClick,
  htmlType = "button",
}: Props) => {
  const buttonClass = (...classes: (string | Array<string> | classesObj)[]) => {
    return scopedClass("button", ...classes);
  };
  const className = (size: sizeType) =>
    combineClasses(
      buttonClass(),
      buttonClass(`${size}`),
      buttonClass(`${type}`)
    );
  const iconName = loading ? "spinner" : icon;
  const IconNode = iconName && (
    <span className={buttonClass("action")}>
      <Icon name={iconName}></Icon>
    </span>
  );

  const childrenNode = children && <span>{children}</span>;

  return (
    <button
      className={`${className(size)}`}
      disabled={disabled}
      onClick={onClick}
      type={htmlType}
    >
      {IconNode} {childrenNode}
    </button>
  );
};

export default Button;
