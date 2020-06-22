import React from "react";
import renderer from "react-test-renderer";
import Radio, { RadioGroup } from "..";
import { mount, shallow } from "enzyme";

describe("Radio 组件", () => {
  it("正确导出 Radio 组件", () => {
    const radio = renderer.create(<Radio></Radio>).toJSON();
    expect(radio).toMatchSnapshot();
  });

  it("测试 Radio 组件 value 参数", () => {
    const radio = renderer.create(<Radio value={"radio"}></Radio>).toJSON();
    expect(radio).toMatchSnapshot();
  });

  it("测试 Radio 组件 status 参数", () => {
    const radio = renderer.create(<Radio status></Radio>).toJSON();
    expect(radio).toMatchSnapshot();
  });

  it("测试 Radio 组件 disabled 参数", () => {
    const radio = renderer.create(<Radio disabled></Radio>).toJSON();
    expect(radio).toMatchSnapshot();
  });

  it("测试 Radio 组件 onClick 参数", () => {
    const fn = jest.fn();
    const radio = mount(<Radio onClick={fn}></Radio>);
    radio.simulate("click");
    radio.update();
    expect(fn).toBeCalled();
    expect(radio.find(".guree-radio").hasClass("guree-radio-selected")).toEqual(
      true
    );
  });

  it("测试 Radio 组件 disabled 状态下的点击事件", () => {
    const fn = jest.fn();
    const radio = mount(<Radio onClick={fn} disabled></Radio>);
    radio.simulate("click");
    radio.update();
    expect(radio.find(".guree-radio").hasClass("guree-radio-selected")).toEqual(
      false
    );
  });
});

describe("RadioGroup 组件", () => {
  it("正确导出 RadioGroup 组件", () => {
    const radioGroup = renderer.create(<RadioGroup></RadioGroup>).toJSON();
    expect(radioGroup).toMatchSnapshot();
  });

  it("正确导出 RadioGroup 组件 value 参数", () => {
    const radioGroup = renderer
      .create(
        <RadioGroup value={"radio2"}>
          <Radio value={"radio1"}>radio1</Radio>
          <Radio value={"radio2"}>radio2</Radio>
          <Radio value={"radio3"}>radio3</Radio>
        </RadioGroup>
      )
      .toJSON();
    expect(radioGroup).toMatchSnapshot();
  });

  it("正确导出 RadioGroup 组件 onChange 参数", () => {
    const fn = jest.fn();
    const radioGroup = mount(
        <RadioGroup value={"radio2"} onChange={fn}>
          <Radio value={"radio1"}>radio1</Radio>
          <Radio value={"radio2"}>radio2</Radio>
          <Radio value={"radio3"}>radio3</Radio>
        </RadioGroup>
      );
    radioGroup.find(".guree-radio").forEach((node, index)=> {
      if (index === 2) {
        node.simulate("click")
      }
    })
    expect(fn).toBeCalled()
    radioGroup.update();
    radioGroup.find(".guree-radio").forEach((node, index)=> {
      expect(node.hasClass("guree-radio-selected")).toEqual(index === 2)
    })
  });
});
