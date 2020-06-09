import React, { ReactNode } from "react";
import "./Row.scss";
import { combineClasses, scopedClass, classesObj } from "@utils/index";

interface Props {
  children?: ReactNode;
  align?: "top" | "middle" | "bottom";
  justify?: "start" | "end" | "center" | "space-around" | "space-between";
}

const Row: React.FunctionComponent<Props> = ({
  children,
  align,
  justify,
}: Props) => {
  const colClass = (...classes: (string | Array<string> | classesObj)[]) =>
    scopedClass("row", ...classes);

  const styleClassNames = (align?: string, justify?: string) => {
    return combineClasses({
      [`${colClass(`${align}`)}`]: Boolean(align),
      [`${colClass(`${justify}`)}`]: Boolean(justify),
    });
  };

  const className = combineClasses(colClass(), styleClassNames(align, justify));
  return <div className={className}>{children}</div>;
};

export default Row;
