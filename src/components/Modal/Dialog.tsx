import React, { ReactNode, Fragment } from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";
import { combineClasses, scopedClass, classesObj } from "@utils/index";

interface Props {
  children?: ReactNode;
  mask?: boolean;
  onClickMask?: React.MouseEventHandler<HTMLElement>;
  visible?: boolean;
}

const Dialog: React.FunctionComponent<Props> = ({
  children,
  mask,
  onClickMask,
  visible,
}: Props) => {
  const modalClass = (...classes: (string | Array<string> | classesObj)[]) =>
    scopedClass("modal", ...classes);

  const maskClassNames = combineClasses(modalClass("mask"), {
    [`${modalClass("hidden")}`]: !visible,
  });

  const modalClassNames = combineClasses(modalClass(), {
    [`${modalClass("hidden")}`]: !visible,
  });

  return ReactDOM.createPortal(
    <Fragment>
      {mask ? (
        <div
          className={maskClassNames}
          onClick={onClickMask}
        ></div>
      ) : null}
      <div className={modalClassNames}>{children}</div>
    </Fragment>,
    document.body
  );
};

export default Dialog;
