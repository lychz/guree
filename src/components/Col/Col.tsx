import React, { CSSProperties } from "react";
import "./Col.scss";
import { combineClasses, scopedClass, classesObj } from "@utils/index";
import RowContext from "@components/Row/context";

type StringOrNumber = string | number;
type ResponsiveAttributeType = StringOrNumber | Object;

interface ColSize extends Object {
  offset?: StringOrNumber;
  order?: StringOrNumber;
  push?: StringOrNumber;
  pull?: StringOrNumber;
  span?: StringOrNumber;
}

export interface Props {
  children?: React.ReactNode;
  /** flex 布局属性 */
  flex?: StringOrNumber;
  /** 栅格左侧的间隔格数 */
  offset?: StringOrNumber;
  /** 栅格顺序 */
  order?: StringOrNumber;
  /** 栅格向右移动格数 */
  push?: StringOrNumber;
  /** 栅格向左移动格数 */
  pull?: StringOrNumber;
  /** 栅格占位格数，为 0 时等于 display: none */
  span?: StringOrNumber;
  /** <576px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  xs?: ResponsiveAttributeType;
  /** ≥576px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  sm?: ResponsiveAttributeType;
  /** ≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  md?: ResponsiveAttributeType;
  /** ≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  lg?: ResponsiveAttributeType;
  /** ≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象	 */
  xl?: ResponsiveAttributeType;
  /** ≥1600px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  xxl?: ResponsiveAttributeType;
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
  const flexStyle: CSSProperties = {
    flex,
  };

  const colClass = (...classes: (string | Array<string> | classesObj)[]) =>
    scopedClass("col", ...classes);

  const generateReponsiveClassNames = (
    attributeName: string,
    attributeValue: ResponsiveAttributeType
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
      const { offset, order, push, pull, span } = attributeValue as ColSize;
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
    [k: string]: ResponsiveAttributeType | undefined;
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
  
  const styleClassNames = (offset: StringOrNumber, order: StringOrNumber) =>{
    return combineClasses(
      {
        [`${colClass("offset", `${offset}`)}`]: Boolean(offset),
        [`${colClass("order", `${order}`)}`]: Boolean(order),
        [`${colClass("push", `${push}`)}`]: Boolean(push),
        [`${colClass("pull", `${pull}`)}`]: Boolean(pull),
      },
      (typeof span === "undefined")
        ? {}
        : {
          [`${colClass(`${span}`)}`]: true,
        },
      ...reponsiveClassNames
    );
  }
    
  const className = combineClasses(colClass(), styleClassNames(offset, order));

  return (
    <RowContext.Consumer>
      {({ horizontal, vertical }) => {
        const gutterStyle: CSSProperties = {
          ...(horizontal && horizontal > 0
            ? {
                paddingLeft: horizontal / 2,
                paddingRight: horizontal / 2,
              }
            : {}),
          ...(vertical && vertical! > 0
            ? {
                paddingTop: vertical / 2,
                paddingBottom: vertical / 2,
              }
            : {}),
        };
        return (
          <div className={className} style={{ ...flexStyle, ...gutterStyle }}>
            {children}
          </div>
        );
      }}
    </RowContext.Consumer>
  );
};

export default Col;
