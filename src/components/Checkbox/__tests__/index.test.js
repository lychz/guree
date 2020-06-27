import React from "react";
import renderer from "react-test-renderer";
import Checkbox, { CheckboxGroup } from "..";
import { mount, shallow } from "enzyme";

describe("Checkbox 组件", () => {
  it("正确导出 Checkbox 组件", () => {
    const checkbox = renderer.create(<Checkbox></Checkbox>).toJSON();
    expect(checkbox).toMatchSnapshot();
  });

  it("测试 Checkbox 组件 value 参数", () => {
    const checkbox = renderer
      .create(<Checkbox value={"checkbox"}></Checkbox>)
      .toJSON();
    expect(checkbox).toMatchSnapshot();
  });

  it("测试 Checkbox 组件 checked 参数", () => {
    const checkbox = renderer.create(<Checkbox checked></Checkbox>).toJSON();
    expect(checkbox).toMatchSnapshot();
  });

  it("测试 Checkbox 组件 defaultValue 参数", () => {
    const checkbox = renderer.create(<Checkbox defaultValue></Checkbox>).toJSON();
    expect(checkbox).toMatchSnapshot();
  });

  it("测试 Checkbox 组件 disabled 参数", () => {
    const checkbox = renderer.create(<Checkbox disabled></Checkbox>).toJSON();
    expect(checkbox).toMatchSnapshot();
  });

  it("测试 Checkbox 组件 checked 和 defaultValue 并存", () => {
    const checkbox = renderer.create(<Checkbox checked defaultValue={false}></Checkbox>).toJSON();
    expect(checkbox).toMatchSnapshot();
  });

  it("测试 Checkbox 组件 indeterminate 参数", () => {
    const checkbox = renderer
      .create(<Checkbox indeterminate></Checkbox>)
      .toJSON();
    expect(checkbox).toMatchSnapshot();
  });

  it("测试 Checkbox 组件 indeterminate 和 checked 并存", () => {
    const checkbox = renderer
      .create(<Checkbox indeterminate checked></Checkbox>)
      .toJSON();
    expect(checkbox).toMatchSnapshot();
  });

  it("测试 Checkbox 组件 onChange 参数", () => {
    var value = null;
    const fn = (v) => (value = v.checked);
    const checkbox = mount(<Checkbox onChange={fn}></Checkbox>);
    
    checkbox.simulate("click");
    expect(value).toEqual(true);
    checkbox.update();
    expect(
      checkbox.find(".guree-checkbox").hasClass("guree-checkbox-checked")
    ).toEqual(true);

    checkbox.simulate("click");
    expect(value).toEqual(false);
    checkbox.update();
    expect(
      checkbox.find(".guree-checkbox").hasClass("guree-checkbox-checked")
    ).toEqual(false);
  });

  it("测试 Checkbox 组件 受控组件", () => {
    var value = null;
    const fn = (v) => (value = v.checked);
    const checkbox = mount(<Checkbox onChange={fn} checked={false}></Checkbox>);
    
    checkbox.simulate("click");
    expect(value).toEqual(true);
    checkbox.setProps({ checked: true });
    checkbox.update();
    expect(
      checkbox.find(".guree-checkbox").hasClass("guree-checkbox-checked")
    ).toEqual(true);

    checkbox.simulate("click");
    expect(value).toEqual(false);
    checkbox.setProps({ checked: false });
    checkbox.update();
    expect(
      checkbox.find(".guree-checkbox").hasClass("guree-checkbox-checked")
    ).toEqual(false);
  });

  it("测试 Checkbox 组件 disabled 状态下的点击事件", () => {
    const fn = jest.fn();
    const checkbox = mount(<Checkbox onChange={fn} disabled></Checkbox>);
    checkbox.simulate("click");
    expect(fn).not.toBeCalled();
    checkbox.update();
    expect(
      checkbox.find(".guree-checkbox").hasClass("guree-checkbox-checked")
    ).toEqual(false);
  });
});

describe("CheckboxGroup 组件", () => {
  it("正确导出 CheckboxGroup 组件", () => {
    const checkboxGroup = renderer
      .create(<CheckboxGroup></CheckboxGroup>)
      .toJSON();
    expect(checkboxGroup).toMatchSnapshot();
  });

  it("正确导出 CheckboxGroup 组件 value 参数", () => {
    const checkboxGroup = renderer
      .create(
        <CheckboxGroup value={[1]}>
          <Checkbox value={1}>1</Checkbox>
          <Checkbox value={2}>2</Checkbox>
          <Checkbox value={3}>3</Checkbox>
        </CheckboxGroup>
      )
      .toJSON();
    expect(checkboxGroup).toMatchSnapshot();
  });

  it("正确导出 CheckboxGroup 组件 defaultValue 参数", () => {
    const checkboxGroup = renderer
      .create(
        <CheckboxGroup defaultValue={[1]}>
          <Checkbox value={1}>1</Checkbox>
          <Checkbox value={2}>2</Checkbox>
          <Checkbox value={3}>3</Checkbox>
        </CheckboxGroup>
      )
      .toJSON();
    expect(checkboxGroup).toMatchSnapshot();
  });

  it("正确导出 CheckboxGroup 组件 onChange 参数", () => {
    const fn = jest.fn();
    const checkboxGroup = mount(
      <CheckboxGroup onChange={fn}>
        <Checkbox value={1}>1</Checkbox>
        <Checkbox value={2}>2</Checkbox>
        <Checkbox value={3}>3</Checkbox>
      </CheckboxGroup>
    );
    checkboxGroup.find(".guree-checkbox").forEach((node, index) => {
      if (index === 0 || index === 2) {
        node.simulate("click");
      }
    });
    expect(fn).toBeCalledWith([1, 3]);
    checkboxGroup.update();
    checkboxGroup.find(".guree-checkbox").forEach((node, index) => {
      expect(node.hasClass("guree-checkbox-checked")).toEqual(
        index === 0 || index === 2
      );
    });

    checkboxGroup.find(".guree-checkbox").forEach((node, index) => {
      if (index === 0 || index === 2) {
        node.simulate("click");
      }
    });
    expect(fn).toBeCalledWith([]);
    checkboxGroup.update();
    checkboxGroup.find(".guree-checkbox").forEach((node, index) => {
      expect(node.hasClass("guree-checkbox-checked")).toEqual(false);
    });
  });

  it("正确导出 CheckboxGroup 组件 受控组件", () => {
    const fn = jest.fn();
    const checkboxGroup = mount(
      <CheckboxGroup onChange={fn} value={[1]}>
        <Checkbox value={1}>1</Checkbox>
        <Checkbox value={2}>2</Checkbox>
        <Checkbox value={3}>3</Checkbox>
      </CheckboxGroup>
    );
    checkboxGroup.find(".guree-checkbox").forEach((node, index) => {
      if (index === 0 || index === 2) {
        node.simulate("click");
      }
    });
    expect(fn).toBeCalledWith([1, 3]);
    checkboxGroup.setProps({ value: [1, 3] });
    checkboxGroup.update();
    checkboxGroup.find(".guree-checkbox").forEach((node, index) => {
      expect(node.hasClass("guree-checkbox-checked")).toEqual(
        index === 0 || index === 2
      );
    });

    checkboxGroup.find(".guree-checkbox").forEach((node, index) => {
      if (index === 0 || index === 2) {
        node.simulate("click");
      }
    });
    expect(fn).toBeCalledWith([]);
    checkboxGroup.setProps({ value: [] });
    checkboxGroup.update();
    checkboxGroup.find(".guree-checkbox").forEach((node, index) => {
      expect(node.hasClass("guree-checkbox-checked")).toEqual(false);
    });
  });
});
