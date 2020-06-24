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

  it("测试 Radio 组件 checked 参数", () => {
    const radio = renderer.create(<Radio checked></Radio>).toJSON();
    expect(radio).toMatchSnapshot();
  });

  it("测试 Radio 组件 defaultChecked 参数", () => {
    const radio = renderer.create(<Radio defaultChecked></Radio>).toJSON();
    expect(radio).toMatchSnapshot();
  });

  it("测试 Radio 组件 checked 和 defaultChecked 并存", () => {
    const radio = renderer
      .create(<Radio defaultChecked={false} checked></Radio>)
      .toJSON();
      
    expect(radio).toMatchSnapshot();
  });

  it("测试 Radio 组件 disabled 参数", () => {
    const radio = renderer.create(<Radio disabled></Radio>).toJSON();
    expect(radio).toMatchSnapshot();
  });

  it("测试 Radio 组件 onChange 参数", () => {
    var value = null;
    const fn = (v) => (value = v.checked);
    const radio = mount(<Radio onChange={fn}></Radio>);

    radio.simulate("click");
    expect(value).toEqual(true);
    radio.update();
    expect(radio.find(".guree-radio").hasClass("guree-radio-checked")).toEqual(
      true
    );

    radio.simulate("click");
    expect(value).toEqual(true);
    radio.update();
    expect(radio.find(".guree-radio").hasClass("guree-radio-checked")).toEqual(
      true
    );
  });

  it("测试 Radio 组件 受控组件", () => {
    var value = null;
    const fn = (v) => (value = v.checked);
    const radio = mount(<Radio onChange={fn} checked={false}></Radio>);

    radio.simulate("click");
    expect(value).toEqual(true);
    radio.setProps({ checked: true });
    radio.update();
    expect(radio.find(".guree-radio").hasClass("guree-radio-checked")).toEqual(
      true
    );

    radio.simulate("click");
    expect(value).toEqual(true);
    radio.setProps({ checked: false });
    radio.update();
    expect(radio.find(".guree-radio").hasClass("guree-radio-checked")).toEqual(
      false
    );
  });

  it("测试 Radio 组件 disabled 状态下的点击事件", () => {
    const fn = jest.fn();
    const radio = mount(<Radio onChange={fn} disabled></Radio>);
    radio.simulate("click");
    expect(fn).not.toBeCalled();
    radio.update();
    expect(radio.find(".guree-radio").hasClass("guree-radio-checked")).toEqual(
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

  it("正确导出 RadioGroup 组件 defaultValue 参数", () => {
    const radioGroup = renderer
      .create(
        <RadioGroup defaultValue={"radio2"}>
          <Radio value={"radio1"}>radio1</Radio>
          <Radio value={"radio2"}>radio2</Radio>
          <Radio value={"radio3"}>radio3</Radio>
        </RadioGroup>
      )
      .toJSON();
    expect(radioGroup).toMatchSnapshot();
  });

  it("正确导出 RadioGroup 组件 value 和 defaultValue 共存", () => {
    const radioGroup = renderer
      .create(
        <RadioGroup value={"radio1"} defaultValue={"radio2"}>
          <Radio value={"radio1"}>radio1</Radio>
          <Radio value={"radio2"}>radio2</Radio>
          <Radio value={"radio3"}>radio3</Radio>
        </RadioGroup>
      )
      .toJSON();
    expect(radioGroup).toMatchSnapshot();
  });

  it("正确导出 RadioGroup 组件 onChange 参数", () => {
    const fn = jest.fn()
    const radioGroup = mount(
      <RadioGroup onChange={fn}>
        <Radio value={"radio1"}>radio1</Radio>
        <Radio value={"radio2"}>radio2</Radio>
        <Radio value={"radio3"}>radio3</Radio>
      </RadioGroup>
    );

    radioGroup.find(".guree-radio").forEach((node, index) => {
      if (index === 2) {
        node.simulate("click");
      }
    });
    expect(fn).toBeCalledWith("radio3")
    radioGroup.update();
    radioGroup.find(".guree-radio").forEach((node, index) => {
      expect(node.hasClass("guree-radio-checked")).toEqual(index === 2);
    });
  });

  it("正确导出 RadioGroup 组件 受控组件", () => {
    const fn = jest.fn()
    const radioGroup = mount(
      <RadioGroup value={"radio2"} onChange={fn}>
        <Radio value={"radio1"}>radio1</Radio>
        <Radio value={"radio2"}>radio2</Radio>
        <Radio value={"radio3"}>radio3</Radio>
      </RadioGroup>
    );

    radioGroup.find(".guree-radio").forEach((node, index) => {
      if (index === 2) {
        node.simulate("click");
      }
    });
    expect(fn).toBeCalledWith("radio3")
    radioGroup.setProps({ value: "radio3" });
    radioGroup.update();
    radioGroup.find(".guree-radio").forEach((node, index) => {
      expect(node.hasClass("guree-radio-checked")).toEqual(index === 2);
    });
  });
});
