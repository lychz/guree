import React, { useState, ReactElement } from "react";
import { radioAttrs } from "./Radio";
import "./Radio.scss";
import { scopedClass, classesObj, updateStateOnPropChange } from "@utils/index";

interface Props {
  children: ReactElement;
  value?: any;
  onChange?: (radioAttrs: radioAttrs) => {};
}

const RadioGroup: React.FunctionComponent<Props> = ({
  children,
  value,
  onChange,
}: Props) => {
  const radioGroupClass = (
    ...classes: (string | Array<string> | classesObj)[]
  ) => scopedClass("radio-group", ...classes);

  const [checkedValue, setCheckedValue] = useState(value);

  const changeChecked = (radioAttrs: radioAttrs) => {
    const { value: radioValue } = radioAttrs;
    React.Children.forEach(children, (element) => {
      const { value } = element.props;
      if (value === radioValue) {
        setCheckedValue(value);
        onChange && onChange(radioValue);
      }
    });
  };

  updateStateOnPropChange(value, setCheckedValue);

  const radioChildren = React.Children.map(children, (element) => {
    return React.cloneElement(
      element,
      Object.assign(
        {},
        {
          checked: element.props.value === checkedValue,
          onClick: changeChecked,
        },
        element.props
      )
    );
  });

  return <div className={radioGroupClass()}>{radioChildren}</div>;
};

export default RadioGroup;
