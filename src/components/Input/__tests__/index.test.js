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

  it("测试 Input 组件 value 参数", () => {
      const input = renderer.create(<Input value="value"></Input>).toJSON();
      expect(input).toMatchSnapshot();
  });

  it("测试 Input 组件 value 参数改变", () => {
      const input = mount(<Input value=""></Input>)
      input.setProps({value: "value Changed"})
      input.update()
      expect(input.find("input").prop("value")).toEqual("value Changed")
  });

  it("测试 Input 组件 allowClear 参数", () => {
    const input1 = renderer.create(<Input allowClear></Input>).toJSON();
    const input2 = renderer
      .create(<Input value="value" allowClear></Input>)
      .toJSON();
    expect(input1).toMatchSnapshot();
    expect(input2).toMatchSnapshot();
    mount(<Input value="value" allowClear></Input>)
      .find(".guree-input-clear svg")
      .simulate("click");
  });

  it("测试 Input 组件 onChange 参数", () => {
    const fn = jest.fn();
    const input = mount(<Input onChange={fn}></Input>);
    input.find("input").simulate("change", { target: { value: "1" } });
    input.find("input").simulate("change", { target: { value: undefined } });
    expect(fn).toBeCalled();
  });
});
