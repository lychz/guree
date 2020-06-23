import React, { useState, ReactElement, useRef, useEffect } from "react";
import { checkAttrs } from "./Checkbox";
import "./Checkbox.scss";
import { scopedClass, classesObj, updateStateOnPropChange } from "@utils/index";

interface Props {
  children: ReactElement;
  value?: Array<any>;
  onChange?: (checkedArr?: Array<any>) => {};
}

const CheckGroup: React.FunctionComponent<Props> = ({
  children,
  value,
  onChange,
}: Props) => {
  const radioGroupClass = (
    ...classes: (string | Array<string> | classesObj)[]
  ) => scopedClass("radio-group", ...classes);

  const [checkedValues, setCheckedValues] = useState(value);

  const changeChecked = (checkAttrs: checkAttrs) => {
    React.Children.forEach(children, (element) => {
      const { value } = element.props;
      const emptyArr: Array<any> = []
      if (value === checkAttrs.value) {
        const values = checkedValues
          ? checkAttrs.checked
            ? checkedValues.concat([checkAttrs.value])
            : checkedValues.filter((v: any) => v !== checkAttrs.value)
          : emptyArr.concat([checkAttrs.value]);
        setCheckedValues(values);
        onChange && onChange(values);
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
                  onClick: changeChecked,
                }
              : {
                  onClick: changeChecked,
                },
            element.props
          )
        );
      })}
    </div>
  );
};

export default CheckGroup;
