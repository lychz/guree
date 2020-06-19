import React, { ReactNode, Fragment } from "react";
import "./Modal.scss";
import Dialog from "./Dialog";
import { scopedClass, classesObj } from "@utils/index";
import Icon from "@components/Icon";
import Button from "@components/Button";

export interface Props {
  children?: ReactNode;
  /** 是否存在遮罩 */
  mask?: boolean;
  /** 点击遮罩时是否关闭 */
  closeOnClickMask?: boolean;
  /** 标签内容 */
  title?: ReactNode;
  /** 点击确定时调用 */
  onConfirm?: React.MouseEventHandler<HTMLElement>;
  /** 点击取消，右上角关闭按钮，遮罩时调用 */
  onCancel?: React.MouseEventHandler<HTMLElement>;
  /** 是否可见 */
  visible?: boolean;
  /** 底部内容 */
  footer?: ReactNode;
  /** 是否显示右上角关闭按钮 */
  closeable?: boolean;
  /** 取消按钮内容 */
  cancelContent?: ReactNode;
  /** 确定按钮内容 */
  confirmContent?: ReactNode;
}

const Modal: React.FunctionComponent<Props> = ({
  children,
  mask = true,
  closeOnClickMask = true,
  title,
  onConfirm,
  onCancel,
  visible = false,
  footer,
  closeable = true,
  cancelContent = "取消",
  confirmContent = "确定",
}: Props) => {
  const modalClass = (...classes: (string | Array<string> | classesObj)[]) =>
    scopedClass("modal", ...classes);

  const clickMaskHandler: React.MouseEventHandler<HTMLElement> = (e) => {
    closeOnClickMask && cancelHandler(e);
  };

  const cancelHandler: React.MouseEventHandler<HTMLElement> = (e) => {
    onCancel && onCancel(e);
  };

  const confirmHandler: React.MouseEventHandler<HTMLElement> = (e) => {
    onConfirm && onConfirm(e);
  };

  const footerNodes =
    typeof footer === "undefined" ? (
      <Fragment>
        <Button onClick={cancelHandler}>{cancelContent}</Button>
        <Button onClick={confirmHandler} type="primary">
          {confirmContent}
        </Button>
      </Fragment>
    ) : (
      footer
    );

  return (
    <Dialog visible={visible} mask={mask} onClickMask={clickMaskHandler}>
      {closeable ? (
        <div className={modalClass("close")} onClick={cancelHandler}>
          <Icon name="times"></Icon>
        </div>
      ) : null}
      <div className={modalClass("header")}>
        <div className={modalClass("title")}>{title}</div>
      </div>
      <div className={modalClass("body")}>{children}</div>
      <div className={modalClass("footer")}>{footerNodes}</div>
    </Dialog>
  );
};

export default Modal;
