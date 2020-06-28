import React, { useState, ReactElement } from "react";
import { radioAttrs } from "./Radio";
import "./Radio.scss";
import { scopedClass, classesObj, updateStateOnPropChange } from "@utils/index";
import { isUndefined } from "util";

interface Props {
  children: ReactElement;
  value?: any;
  onChange?: (radioAttrs: radioAttrs) => {};
  defaultValue?: any;
}

const RadioGroup: React.FunctionComponent<Props> = ({
  children,
  value,
  onChange,
  defaultValue,
}: Props) => {
  const radioGroupClass = (
    ...classes: (string | Array<string> | classesObj)[]
  ) => scopedClass("radio-group", ...classes);

  const [checkedValue, setCheckedValue] = useState(
    isUndefined(value) ? defaultValue : value
  );

  const changeChecked = (radioAttrs: radioAttrs) => {
    const { value: checkedValue } = radioAttrs;
    React.Children.forEach(children, (element) => {
      const { value: radioValue } = element.props;
      if (radioValue === checkedValue) {
        onChange && onChange(checkedValue);
        if (!isUndefined(value)) {
          return;
        }
        setCheckedValue(radioValue);
      }
    });
  };

  updateStateOnPropChange(value, setCheckedValue);

  const radioChildren = React.Children.map(children, (element) => {
    return React.cloneElement(
      element,
      Object.assign(
        {},
        element.props,
        {
          checked: element.props.value === checkedValue,
          onChange: changeChecked,
        }
      )
    );
  });

  return <div className={radioGroupClass()}>{radioChildren}</div>;
};

export default RadioGroup;
