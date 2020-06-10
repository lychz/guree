import React, { ReactNode, useState, CSSProperties } from "react";
import "./Row.scss";
import { combineClasses, scopedClass, classesObj } from "@utils/index";
import RowContext from "@components/Row/context";

type GutterType =
  | number
  | {
      xs?: number;
      sm?: number;
      md?: number;
      lg?: number;
      xl?: number;
      xxl?: number;
    };

interface Props {
  children?: ReactNode;
  align?: "top" | "middle" | "bottom";
  justify?: "start" | "end" | "center" | "space-around" | "space-between";
  gutter?: GutterType | [GutterType, GutterType];
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
    sm: "(min-width: 576px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 992px)",
    xl: "(min-width: 1200px)",
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

  const [{ horizontal, vertical }, setState] = useState(getGutter(gutter));

  const responiveGutter = (gutter: GutterType, cb: Function, key: string) => {
    if (typeof gutter === "number") {
      return gutter;
    }
    Object.entries(gutter).forEach(([mediaKey, mediaValue]) => {
      const mql = window.matchMedia(MediaMap[mediaKey]);
      mql.addListener((e) => {
        if (e.matches) {
          cb({
            [key]: mediaValue || 0,
          });
        }
      });
    });
  };

  const bindGutter = (
    gutter: GutterType | [GutterType, GutterType] | undefined,
    setState: React.Dispatch<
      React.SetStateAction<{
        horizontal: number;
        vertical: number;
      }>
    >
  ) => {
    if (typeof gutter === "undefined") {
      return;
    }
    if (Array.isArray(gutter)) {
      gutter.forEach((x, i) => {
        responiveGutter(x, setState, ["horizontal", "vertical"][i]);
      });
    } else {
      responiveGutter(gutter, setState, "horizontal");
    }
  };

  bindGutter(gutter, setState);

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
