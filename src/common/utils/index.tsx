import { SetStateAction, useRef, useEffect } from "react";

export interface classesObj {
  [K: string]: boolean;
}

/**
 * generateClassesList('cls1', ['cls2'], {cls3: true, cls4: false}) => ['cls1', 'cls2', 'cls3']
 */
const generateClassesList = (
  ...classes: (string | Array<string> | classesObj)[]
) => {
  return [...classes]
    .map((classes) => {
      if (typeof classes === "string") {
        // 'className' => ['className']
        return [classes];
      } else if (classes instanceof Array) {
        // '['className'] => ['className']
        return classes;
      } else {
        /**
         * {className1: true, className2: false} => ['className1']
         */
        return Object.entries(classes)
          .filter(([k, v]) => v && k)
          .map(([k, v]) => k);
      }
    })
    .flat()
    .filter(Boolean);
};

const composeClasses = (...classes: (string | Array<string> | classesObj)[]) =>
  generateClassesList(...classes).join("-");

const combineClasses = (...classes: (string | Array<string> | classesObj)[]) =>
  generateClassesList(...classes).join(" ");

const scopedClass = (...classes: (string | Array<string> | classesObj)[]) =>
  composeClasses("guree", ...classes);

const inlineFlexSpan = scopedClass("span")

const mediaAddLinstener = (
  cb: Function,
  mediaValue: number | undefined
) => {
  return (e: { matches: Boolean }) => {
    if (e.matches) {
      cb(mediaValue || 0);
    }
  };
};

const updateStateOnPropChange = <T extends unknown>(state: T, setState: React.Dispatch<React.SetStateAction<T>>) => {
  const mounting = useRef(true)

  useEffect(() => {    
    if (mounting.current) {
      mounting.current = false
    } else {
      setState(state)
    }
  }, [state])
}


export {
  generateClassesList,
  composeClasses,
  combineClasses,
  scopedClass,
  mediaAddLinstener,
  updateStateOnPropChange,
};

export {
  inlineFlexSpan,
}