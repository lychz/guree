import React, { ReactNode } from "react";
import "./Col.scss";
import { combineClasses, scopedClass, classesObj } from "@utils/index";

interface Props {
  children?: ReactNode;
  flex?: string | number;
  offset?: number;
  order?: number;
  push?: number;
  pull?: number;
  span?: number;
}

const Col: React.FunctionComponent<Props> = ({
  children,
  flex,
  offset = 0,
  order = 0,
  push = 0,
  pull = 0,
  span = 24,
}: Props) => {
  const style: React.CSSProperties = {
    flex,
  };

  const colClass = (...classes: (string | Array<string> | classesObj)[]) =>
    scopedClass("col", ...classes);

  const styleClassNames = (offset: number, order: number) =>
    combineClasses({
      [`${colClass("offset", `${offset}`)}`]: Boolean(offset),
      [`${colClass("order", `${order}`)}`]: Boolean(order),
      [`${colClass("push", `${push}`)}`]: Boolean(push),
      [`${colClass("pull", `${pull}`)}`]: Boolean(pull),
      [`${colClass(`${span}`)}`]: true,
    });

  const className = combineClasses(colClass(), styleClassNames(offset, order));

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

export default Col;
