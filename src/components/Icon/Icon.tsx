import React from "react";
import "./importIcons.tsx";
import "./Icon.scss";
import { scopedClass } from "@utils/index";

interface Props {
  /** 图标名称 */
  name: string;
  /** 图标大小，可以是数字或字符串，比如 10 1em 20px 等，数字默认单位是 px */
  size?: string | number;
  /** 图标颜色 */
  fill?: string;
  /** 点击图标触发 */
  onClick?: React.MouseEventHandler<SVGElement>;
}

const Icon: React.FunctionComponent<Props> = ({
  name,
  size = "1em",
  fill,
  onClick,
}: Props) => {
  const sizeValue = (size?: string | number) => {
    return typeof size === "number" ? `${size}px` : size;
  };

  return (
    <svg
      className={scopedClass("icon")}
      style={{
        width: sizeValue(size),
        height: sizeValue(size),
        fill,
      }}
      onClick={onClick}
    >
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};

export default Icon;
