import React from "react";
import renderer from "react-test-renderer";
import Button from "..";
import { mount } from "enzyme";

describe("Button 组件", () => {
  it("正确导出 Button 组件", () => {
    const button = renderer.create(<Button>button</Button>).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("测试 Button 组件 size 参数", () => {
    const largeButton = renderer
      .create(<Button size="large">large</Button>)
      .toJSON();
    const middleButton = renderer
      .create(<Button size="middle">middle</Button>)
      .toJSON();
    const smallButton = renderer
      .create(<Button size="small">small</Button>)
      .toJSON();

    expect(largeButton).toMatchSnapshot();
    expect(middleButton).toMatchSnapshot();
    expect(smallButton).toMatchSnapshot();
  });

  it("测试 Button 组件 icon 参数", () => {
    const button = renderer.create(<Button icon="adn">button</Button>).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("测试 Button 组件 loading 参数", () => {
    const button = renderer.create(<Button loading>loading</Button>).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("测试 Button 组件 disabled 参数", () => {
    const button = renderer.create(<Button disabled>disabled</Button>).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("测试 Button 组件 type 参数", () => {
    const defaultButton = renderer
      .create(<Button type="default">default</Button>)
      .toJSON();
    const primaryButton = renderer
      .create(<Button type="primary">primary</Button>)
      .toJSON();
    const dangerButton = renderer
      .create(<Button type="danger">danger</Button>)
      .toJSON();
    const warningButton = renderer
      .create(<Button type="warning">warning</Button>)
      .toJSON();
    const textButton = renderer
      .create(<Button type="text">text</Button>)
      .toJSON();

    expect(defaultButton).toMatchSnapshot();
    expect(primaryButton).toMatchSnapshot();
    expect(dangerButton).toMatchSnapshot();
    expect(warningButton).toMatchSnapshot();
    expect(textButton).toMatchSnapshot();
  });

  it("测试 Button 组件 onClick 事件", () => {
    const fn = jest.fn();
    const button = mount(<Button onClick={fn}>button</Button>);
    button.find("button").simulate("click");
    expect(fn).toBeCalled();
  });
});
