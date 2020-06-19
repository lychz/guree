import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";
import Modal, { Props } from "./Modal";
import Button from "@components/Button";

const $modal = ({
  children,
  mask = true,
  closeOnClickMask,
  title,
  onConfirm,
  onCancel,
  footer,
  closeable,
  cancelContent,
  confirmContent,
}: Props) => {
  const visible = true;
  const container = document.createDocumentFragment();

  const confirmHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    close();
    onConfirm && onConfirm(e);
  };

  const cancelHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    close();
    onCancel && onCancel(e);
  };

  const close = () => {
    ReactDOM.unmountComponentAtNode(container);
  };

  document.body.appendChild(container);
  ReactDOM.render(
    <Modal
      children={children}
      mask={mask}
      closeOnClickMask={closeOnClickMask}
      title={title}
      onConfirm={confirmHandler}
      onCancel={cancelHandler}
      visible={visible}
      footer={footer}
      closeable={closeable}
      cancelContent={cancelContent}
      confirmContent={confirmContent}
    ></Modal>,
    container
  );

  return {
    close,
  };
};

interface ConfirmProps {
  content?: ReactNode;
  closeOnClickMask?: boolean;
  title?: ReactNode;
  onConfirm?: React.MouseEventHandler<HTMLButtonElement>;
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
  confirmContent?: ReactNode;
  cancelContent?: ReactNode;
}

const $alert = ({
  content,
  closeOnClickMask = true,
  title,
  onConfirm,
  onCancel,
  confirmContent = "确定",
}: ConfirmProps) => {
  const confirmHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    modal.close();
    onConfirm && onConfirm(e);
  };
  const footer = (
    <Button onClick={confirmHandler} type="primary">
      {confirmContent}
    </Button>
  );

  const modal = $modal({
    children: content,
    closeOnClickMask,
    title,
    onConfirm: onConfirm,
    onCancel: onCancel,
    footer,
  });
};

const $confirm = ({
  content,
  closeOnClickMask = true,
  title,
  onConfirm,
  onCancel,
  cancelContent,
  confirmContent,
}: ConfirmProps) => {
  $modal({
    children: content,
    closeOnClickMask,
    title,
    onConfirm: onConfirm,
    onCancel: onCancel,
    cancelContent,
    confirmContent,
  });
};

export { $modal, $alert, $confirm };
