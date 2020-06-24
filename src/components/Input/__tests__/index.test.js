import React, { useState } from "react";
import renderer from "react-test-renderer";
import Input from "..";
import { mount, shallow } from "enzyme";
import Button from "@components/Button";

describe("Input 组件", () => {
  it("正确导出 Input 组件", () => {
    const input = renderer.create(<Input></Input>).toJSON();
    expect(input).toMatchSnapshot();
  });

  it("测试 Input 组件 addonAfter 参数", () => {
    const input = renderer.create(<Input addonAfter=".com"></Input>).toJSON();
    expect(input).toMatchSnapshot();
  });

  it("测试 Input 组件 addonBefore 参数", () => {
    const input = renderer
      .create(<Input addonBefore="http://"></Input>)
      .toJSON();
    expect(input).toMatchSnapshot();
  });

  it("测试 Input 组件 placeholder 参数", () => {
    const input = renderer
      .create(<Input placeholder="placeholder"></Input>)
      .toJSON();
    expect(input).toMatchSnapshot();
  });

  it("测试 Input 组件 disabled 参数", () => {
    const input = renderer.create(<Input disabled></Input>).toJSON();
    expect(input).toMatchSnapshot();
  });

  it("测试 Input 组件 prefix 参数", () => {
    const input = renderer.create(<Input prefix="￥"></Input>).toJSON();
    expect(input).toMatchSnapshot();
  });

  it("测试 Input 组件 suffix 参数", () => {
    const input = renderer.create(<Input suffix="RMB"></Input>).toJSON();
    expect(input).toMatchSnapshot();
  });

  it("测试 Input 组件 type 参数", () => {
    const input1 = renderer.create(<Input type="number"></Input>).toJSON();
    const input2 = renderer.create(<Input type="textarea"></Input>).toJSON();
    expect(input1).toMatchSnapshot();
    expect(input2).toMatchSnapshot();
  });

  it("测试 Input 组件 defaultValue 参数", () => {
    const input = renderer
      .create(<Input defaultValue="value"></Input>)
      .toJSON();
    expect(input).toMatchSnapshot();
  });

  it("测试 Input 组件 allowClear 参数", () => {
    const input = mount(<Input defaultValue={"value"} allowClear></Input>);
    input.find(".guree-input-clear svg").simulate("click");
    input.update();
    expect(input.find("input").instance().value).toEqual("");
  });

  it("测试 Input 组件 value 参数改变", () => {
    const input = mount(<Input value=""></Input>);
    input.setProps({ value: "value Changed" });
    input.update();
    expect(input.find("input").prop("value")).toEqual("value Changed");
  });

  it("测试 Input 组件非受控组件下的 onChange 参数", () => {
    var value = "";
    // const fn = jest.fn(); 此处 jest.fn() 有 bug ，明明应该可以接收到参数，但是却提示接收不到，可以把接收到的参数 log 出来看到
    const fn = (v) => (value = v);
    const input = mount(<Input onChange={fn}></Input>);

    input.find("input").simulate("change", { target: { value: "1" } });
    // expect(fn).toBeCalled("1");
    expect(value).toEqual("1");
    expect(input.find("input").prop("value")).toEqual("1");

    input.find("input").simulate("change", { target: { value: undefined } });
    // expect(fn).toBeCalled("");
    expect(value).toEqual("");
    input.setProps({ value: undefined });
    expect(input.find("input").prop("value")).toEqual("");

    input.find("input").simulate("change", { target: { value: "123" } });
    // expect(fn).toBeCalled("123");
    expect(value).toEqual("123");
    input.setProps({ value: undefined });
    expect(input.find("input").prop("value")).toEqual("123");
  });

  it("测试 Input 组件受控组件下的 onChange 参数", () => {
    var value = "";
    // const fn = jest.fn(); 此处 jest.fn() 有 bug ，明明应该可以接收到参数，但是却提示接收不到，可以把接收到的参数 log 出来看到
    const fn = (v) => (value = v);
    const input = mount(<Input onChange={fn} value=""></Input>);

    input.find("input").simulate("change", { target: { value: "1" } });
    // expect(fn).toBeCalled("1");
    expect(value).toEqual("1");
    expect(input.find("input").prop("value")).toEqual("");

    input.find("input").simulate("change", { target: { value: undefined } });
    // expect(fn).toBeCalled("");
    expect(value).toEqual("");
    input.setProps({ value: undefined });
    expect(input.find("input").prop("value")).toEqual("");

    input.find("input").simulate("change", { target: { value: "123" } });
    // expect(fn).toBeCalled("123");
    expect(value).toEqual("123");
    input.setProps({ value: undefined });
    expect(input.find("input").prop("value")).toEqual("123");
  });

  it("测试 Input 组件 disabled 状态下的点击事件", () => {
    const input = mount(<Input value={"value"} disabled allowClear></Input>);
    input.find(".guree-input-clear svg").simulate("click");
    input.update();
    expect(input.find("input").instance().value).toEqual("value");
  });

  it("测试 Input 组件 onClickClear 参数", () => {
    const fn = jest.fn();
    const input = mount(
      <Input defaultValue={"value"} allowClear onClickClear={fn}></Input>
    );
    input.find(".guree-input-clear svg").simulate("click");
    input.update();
    expect(fn).toBeCalled();
  });
});
