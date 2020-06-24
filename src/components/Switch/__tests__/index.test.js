import React from "react";
import renderer from "react-test-renderer";
import Switch from "..";
import { mount } from "enzyme";

describe("Switch 组件", () => {
  it("正确导出 Switch 组件", () => {
    const sw = renderer.create(<Switch></Switch>).toJSON();
    expect(sw).toMatchSnapshot();
  });

  it("测试 Switch 组件 checkedChildren 参数", () => {
    const sw = renderer.create(<Switch checkedChildren={"checked"}></Switch>).toJSON();
    expect(sw).toMatchSnapshot();
  });

  it("测试 Switch 组件 unCheckedChildren 参数", () => {
    const sw = renderer.create(<Switch unCheckedChildren={"unchecked"}></Switch>).toJSON();
    expect(sw).toMatchSnapshot();
  });

  it("测试 Switch 组件 defaultChecked 参数", () => {
    const sw = renderer.create(<Switch defaultChecked></Switch>).toJSON();
    expect(sw).toMatchSnapshot();
  });

  it("测试 Switch 组件 disabled 参数", () => {
    const sw = renderer.create(<Switch disabled></Switch>).toJSON();
    expect(sw).toMatchSnapshot();
  });

  it("测试 Switch 组件 checked 参数", () => {
    const sw = renderer.create(<Switch checked></Switch>).toJSON();
    expect(sw).toMatchSnapshot();
  });

  it("测试 Switch 组件 onChange 参数", () => {
    const fn = jest.fn()
    const sw = mount(<Switch onChange={fn}></Switch>);
    sw.simulate("click")
    expect(fn).toBeCalledWith(true)
    sw.update()
    expect(sw.find(".guree-switch").hasClass("guree-switch-checked")).toEqual(true);
    sw.simulate("click")
    expect(fn).toBeCalledWith(false)
    sw.update()
    expect(sw.find(".guree-switch").hasClass("guree-switch-checked")).toEqual(false);
  });

  it("测试 Switch 组件 disabled 状态下的点击事件", () => {
    const sw = mount(<Switch disabled></Switch>);
    sw.simulate("click")
    sw.update()
    expect(sw.find(".guree-switch").hasClass("guree-switch-checked")).toEqual(false);
  });

  it("测试 Switch 组件 checked 不为 undefined 状态下的点击事件", () => {
    const sw1 = mount(<Switch checked={true}></Switch>);
    const sw2 = mount(<Switch checked={false}></Switch>);
    sw1.simulate("click")
    sw2.simulate("click")
    sw1.update()
    sw2.update()
    expect(sw1.find(".guree-switch").hasClass("guree-switch-checked")).toEqual(true);
    expect(sw2.find(".guree-switch").hasClass("guree-switch-checked")).toEqual(false);
  });
});
