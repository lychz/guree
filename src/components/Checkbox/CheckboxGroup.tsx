import React, { useState, ReactElement, useRef, useEffect } from "react";
import { checkAttrs } from "./Checkbox";
import "./Checkbox.scss";
import { scopedClass, classesObj, updateStateOnPropChange } from "@utils/index";
import { isUndefined } from "util";

interface Props {
  children: ReactElement;
  value?: Array<any>;
  onChange?: (checkedArr?: Array<any>) => {};
  defaultValue?: Array<any>;
}

const CheckGroup: React.FunctionComponent<Props> = ({
  children,
  value,
  onChange,
  defaultValue,
}: Props) => {
  const radioGroupClass = (
    ...classes: (string | Array<string> | classesObj)[]
  ) => scopedClass("radio-group", ...classes);

  const [checkedValues, setCheckedValues] = useState(
    isUndefined(value) ? defaultValue : value
  );

  const changeChecked = (checkAttrs: checkAttrs) => {
    React.Children.forEach(children, (element) => {
      const { value: elementValue } = element.props;
      const emptyArr: Array<any> = [];
      if (elementValue === checkAttrs.value) {
        const values = checkedValues
          ? checkAttrs.checked
            ? checkedValues.concat([checkAttrs.value])
            : checkedValues.filter((v: any) => v !== checkAttrs.value)
          : emptyArr.concat([checkAttrs.value]);
        onChange && onChange(values);
        if (!isUndefined(value)) {
          return;
        }
        setCheckedValues(values);
      }
    });
  };
  updateStateOnPropChange(value, setCheckedValues);

  return (
    <div className={radioGroupClass()}>
      {React.Children.map(children, (element) => {
        return React.cloneElement(
          element,
          Object.assign(
            {},
            checkedValues
              ? {
                  checked: checkedValues.includes(element.props.value),
                  onChange: changeChecked,
                }
              : {
                  onChange: changeChecked,
                },
            element.props
          )
        );
      })}
    </div>
  );
};

export default CheckGroup;
