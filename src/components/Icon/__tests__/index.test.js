import React from "react";
import renderer from "react-test-renderer";
import Icon from "..";
import { mount } from "enzyme";

describe("Icon 组件", () => {
  it("正确导出 Icon 组件", () => {
    const icon = renderer.create(<Icon name="adn"></Icon>).toJSON();
    expect(icon).toMatchSnapshot();
  });

  it("测试 Icon 组件 size 参数", () => {
    const numberType = renderer.create(<Icon size={10}></Icon>).toJSON();
    const stringType = renderer.create(<Icon size="1em"></Icon>);
    expect(numberType).toMatchSnapshot();
    expect(stringType).toMatchSnapshot();
  });

  it("测试 Icon 组件 fill 参数", () => {
    const icon = renderer.create(<Icon fill="blue"></Icon>).toJSON();
    expect(icon).toMatchSnapshot();
  });

  it("测试 Icon 组件 onClick 事件", () => {
    const fn = jest.fn();
    const icon = mount(<Icon name="adn" onClick={fn}></Icon>);
    icon.find("svg").simulate("click");
    expect(fn).toBeCalled();
  });
});
