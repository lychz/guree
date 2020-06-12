import React, { ReactNode, useState, CSSProperties } from "react";
import "./Row.scss";
import {
  combineClasses,
  scopedClass,
  classesObj,
  mediaAddLinstener,
} from "@utils/index";
import RowContext from "@components/Row/context";

interface responsiveType {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
}

type GutterType = number | Object;

interface Props {
  children?: ReactNode;
  /** 垂直布局属性 */
  align?: "top" | "middle" | "bottom";
  /** 水平布局属性 */
  justify?: "start" | "end" | "center" | "space-around" | "space-between";
  /** 间隔属性，传入 number 时为水平间隔，传入数组为 [水平间隔，垂直间隔]，传入 Object 可以设置响应式间隔 */
  gutter?: GutterType | Array<Number | Object>;
}

const Row: React.FunctionComponent<Props> = ({
  children,
  align,
  justify,
  gutter,
}: Props) => {
  const colClass = (...classes: (string | Array<string> | classesObj)[]) =>
    scopedClass("row", ...classes);

  const MediaMap: {
    [k: string]: string;
  } = {
    xs: "(max-width: 576px)",
    sm: "(min-width: 576px) and (max-width: 768px)",
    md: "(min-width: 768px) and (max-width: 992px)",
    lg: "(min-width: 992px) and (max-width: 1200px)",
    xl: "(min-width: 1200px) and (max-width: 1600px)",
    xxl: "(min-width: 1600px)",
  };

  const parseGutter = (gutter: GutterType) => {
    if (typeof gutter === "number") {
      return gutter;
    }
    return Object.entries(gutter).reduce((res, cur) => {
      const [mediaKey, mediaValue] = cur;
      const mql = window.matchMedia(MediaMap[mediaKey]);
      if (mql.matches) {
        return mediaValue || 0;
      }
      return res;
    }, 0);
  };

  const getGutter = (
    gutter: GutterType | [GutterType, GutterType] | undefined
  ) => {
    if (typeof gutter === "undefined") {
      return {
        horizontal: 0,
        vertical: 0,
      };
    }
    if (Array.isArray(gutter)) {
      return {
        horizontal: parseGutter(gutter[0]),
        vertical: parseGutter(gutter[1]),
      };
    }
    return {
      horizontal: parseGutter(gutter),
      vertical: 0,
    };
  };

  const curGutter = getGutter(gutter);
  const [horizontal, setHorizontalState] = useState(curGutter.horizontal);
  const [vertical, setVerticalState] = useState(curGutter.vertical);

  const responiveGutter = (gutter: GutterType, cb: Function) => {
    if (typeof gutter === "number") {
      return gutter;
    }
    Object.entries(gutter).forEach(([mediaKey, mediaValue]) => {
      const mql = window.matchMedia(MediaMap[mediaKey]);
      mql.addListener(mediaAddLinstener(cb, mediaValue));
    });
  };

  const bindGutter = (
    gutter: GutterType | [GutterType, GutterType] | undefined
  ) => {
    if (typeof gutter === "undefined") {
      return;
    }
    if (Array.isArray(gutter)) {
      responiveGutter(gutter[0], setHorizontalState);
      responiveGutter(gutter[1], setVerticalState);
    } else {
      responiveGutter(gutter, setHorizontalState);
    }
  };

  bindGutter(gutter);

  const styleClassNames = (align?: string, justify?: string) => {
    return combineClasses({
      [`${colClass(`${align}`)}`]: Boolean(align),
      [`${colClass(`${justify}`)}`]: Boolean(justify),
    });
  };

  const gutterStyle: CSSProperties = {
    ...(horizontal > 0
      ? {
          marginLeft: horizontal / -2,
          marginRight: horizontal / -2,
        }
      : {}),
    ...(vertical! > 0
      ? {
          marginTop: vertical / -2,
          marginBottom: vertical / 2,
        }
      : {}),
  };

  const className = combineClasses(colClass(), styleClassNames(align, justify));
  return (
    <RowContext.Provider value={{ horizontal, vertical }}>
      <div className={className} style={gutterStyle}>
        {children}
      </div>
    </RowContext.Provider>
  );
};

export default Row;
