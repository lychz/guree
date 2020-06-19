import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Modal, { $modal, $alert, $confirm } from "..";
import { mount } from "enzyme";
import Button from "@components/Button";

jest.mock("react-dom", () => ({
  createPortal: (node) => node,
  render: jest.fn(),
  unmountComponentAtNode: jest.fn(),
}));

describe("Modal 组件", () => {
  it("正确导出 Modal 组件", () => {
    const modal = renderer.create(<Modal></Modal>).toJSON();
    expect(modal).toMatchSnapshot();
  });

  it("测试 Modal 组件 mask 参数", () => {
    const modal = renderer.create(<Modal mask={false}></Modal>).toJSON();
    expect(modal).toMatchSnapshot();
  });

  it("测试 Modal 组件 closeOnClickMask 参数", () => {
    const fn = jest.fn();
    const modal = mount(<Modal closeOnClickMask={true} onCancel={fn}></Modal>);
    modal.find(".guree-modal-mask").simulate("click");
    expect(fn).toBeCalled();
  });

  it("测试 Modal 组件 title 参数", () => {
    const modal = renderer.create(<Modal title="title"></Modal>).toJSON();
    expect(modal).toMatchSnapshot();
  });

  it("测试 Modal 组件 onConfirm 参数", () => {
    const fn = jest.fn();
    const modal = mount(<Modal visible={true} onConfirm={fn}></Modal>);
    modal.find(".guree-button-primary").simulate("click");
    expect(fn).toBeCalled();
  });

  it("测试 Modal 组件 onCancel 参数", () => {
    const fn = jest.fn();
    const modal = mount(<Modal visible={true} onCancel={fn}></Modal>);
    modal.find(".guree-button-default").simulate("click");
    expect(fn).toBeCalled();
  });

  it("测试 Modal 组件 visible 参数", () => {
    const modal = renderer.create(<Modal visible={true}></Modal>).toJSON();
    expect(modal).toMatchSnapshot();
  });

  it("测试 Modal 组件 footer 参数", () => {
    const footer = [
      <Button key="no" type="primary">
        NO
      </Button>,
      <Button key="yes" type="danger">
        Yes
      </Button>,
    ];
    const modal = renderer.create(<Modal footer={footer}></Modal>).toJSON();
    expect(modal).toMatchSnapshot();
  });

  it("测试 Modal 组件 closeable 参数", () => {
    const modal = renderer.create(<Modal closeable={false}></Modal>).toJSON();
    expect(modal).toMatchSnapshot();
  });

  it("测试 Modal 组件 cancelContent 参数", () => {
    const modal = renderer
      .create(<Modal cancelContent="cancel content"></Modal>)
      .toJSON();
    expect(modal).toMatchSnapshot();
  });

  it("测试 Modal 组件 confirmContent 参数", () => {
    const modal = renderer
      .create(<Modal confirmContent="confirm content"></Modal>)
      .toJSON();
    expect(modal).toMatchSnapshot();
  });
});

describe("Modal 组件的高阶组件", () => {
  it("测试 $modal 组件", () => {
    const modal = $modal({
      title: "title",
      children: "modal content",
    });
    const Modal = renderer.create(modal.modal).toJSON();
    expect(Modal).toMatchSnapshot();
  });

  it("测试 $modal 组件 onConfirm 参数", () => {
    const fn = jest.fn();
    const modal = $modal({
      title: "title",
      children: "modal content",
      onConfirm: fn,
    });
    const Modal = mount(modal.modal);
    Modal.find(".guree-button-primary").simulate("click");
    expect(fn).toBeCalled();
  });

  it("测试 $modal 组件 onCancel 参数", () => {
    const fn = jest.fn();
    const modal = $modal({
      title: "title",
      children: "modal content",
      onCancel: fn,
    });
    const Modal = mount(modal.modal);
    Modal.find(".guree-button-default").simulate("click");
    expect(fn).toBeCalled();
  });

  it("测试 $alert 组件", () => {
    const alert = $alert({
      title: "alert title",
      content: "alert content",
    });
    const Alert = renderer.create(alert.modal).toJSON();
    expect(Alert).toMatchSnapshot();
  });

  it("测试 $alert 组件 onConfirm 参数", () => {
    const fn = jest.fn();
    const alert = $alert({
      title: "alert title",
      children: "alert content",
      onConfirm: fn,
    });
    const Alert = mount(alert.modal);
    Alert.find(".guree-button-primary").simulate("click");
    expect(fn).toBeCalled();
  });

  it("测试 $confirm 组件", () => {
    const confirm = $confirm({
      title: "confirm title",
      content: "confirm content",
    });
    const Confirm = renderer.create(confirm.modal).toJSON();
    expect(Confirm).toMatchSnapshot();
  });
});
