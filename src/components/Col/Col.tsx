import React from "react";
import "./Col.scss";
import { combineClasses, scopedClass, classesObj } from "@utils/index";
import { strict } from "assert";

type stringOrNumber = string | number;
type responsiveAttributeType = stringOrNumber | ColSize;

interface ColSize extends Object {
  offset?: stringOrNumber;
  order?: stringOrNumber;
  push?: stringOrNumber;
  pull?: stringOrNumber;
  span?: stringOrNumber;
}

interface Props {
  children?: React.ReactNode;
  flex?: string | number;
  offset?: stringOrNumber;
  order?: string | number;
  push?: string | number;
  pull?: string | number;
  span: string | number;
  xs?: responsiveAttributeType;
  sm?: responsiveAttributeType;
  md?: responsiveAttributeType;
  lg?: responsiveAttributeType;
  xl?: responsiveAttributeType;
  xxl?: responsiveAttributeType;
}

const Col: React.FunctionComponent<Props> = ({
  children,
  flex,
  offset = 0,
  order = 0,
  push = 0,
  pull = 0,
  span,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
}: Props) => {
  const style: React.CSSProperties = {
    flex,
  };

  const colClass = (...classes: (string | Array<string> | classesObj)[]) =>
    scopedClass("col", ...classes);

  const generateReponsiveClassNames = (
    attributeName: string,
    attributeValue: responsiveAttributeType
  ) => {
    if (
      typeof attributeValue === "string" ||
      typeof attributeValue === "number"
    ) {
      return {
        [`${colClass(attributeName, `${attributeValue}`)}`]: Boolean(
          attributeValue
        ),
      };
    } else {
      // typeof attributeValue => "object"
      const { offset, order, push, pull, span } = attributeValue;
      return {
        [`${colClass(`${attributeName}-offset`, `${offset}`)}`]: true,
        [`${colClass(`${attributeName}-order`, `${order}`)}`]: true,
        [`${colClass(`${attributeName}-push`, `${push}`)}`]: true,
        [`${colClass(`${attributeName}-pull`, `${pull}`)}`]: true,
        [`${colClass(`${attributeName}`, `${span}`)}`]: true,
      };
    }
  };

  const generateReponsiveClassNames2 = (obj: {
    [k: string]: responsiveAttributeType | undefined;
  }) => {
    return Object.entries(obj).map(([key, value]) => {
      if (value === undefined) {
        return "";
      }
      return generateReponsiveClassNames(key, value);
    });
  };

  const reponsiveClassNames = generateReponsiveClassNames2({
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
  });

  const styleClassNames = (offset: stringOrNumber, order: stringOrNumber) =>
    combineClasses(
      {
        [`${colClass("offset", `${offset}`)}`]: Boolean(offset),
        [`${colClass("order", `${order}`)}`]: Boolean(order),
        [`${colClass("push", `${push}`)}`]: Boolean(push),
        [`${colClass("pull", `${pull}`)}`]: Boolean(pull),
        [`${colClass(`${span}`)}`]: true,
      },
      ...reponsiveClassNames
    );

  const className = combineClasses(colClass(), styleClassNames(offset, order));

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

export default Col;
