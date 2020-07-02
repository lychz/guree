import React from "react";
import renderer from "react-test-renderer";
import Form, { FormItem } from "..";
import { mount } from "enzyme";
import Input from "@components/Input";
import Button from "@components/Button";
import { act } from "react-dom/test-utils";

describe("Form 组件", () => {
  it("正确导出 Form 组件", () => {
    const form = renderer
      .create(
        <Form>
          <FormItem name="userName">
            <Input></Input>
          </FormItem>
        </Form>
      )
      .toJSON();
    expect(form).toMatchSnapshot();
  });

  it("测试 Form 组件 onFinish 参数", async () => {
    var value = null;
    const fn = (v) => (value = v.userName);
    const form = mount(
      <Form onFinish={fn}>
        <FormItem name="userName">
          <Input></Input>
        </FormItem>
        <FormItem>
          <Button htmlType="submit"></Button>
        </FormItem>
      </Form>
    );

    await act(async () => {
      await form.find("input").simulate("change", { target: { value: "1" } });
      await form.find("button").simulate("submit");
    });
    expect(value).toEqual("1");
  });

  it("测试 Form 组件 onChange 参数", async () => {
    var value = null;
    const fn = (v) => (value = v.userName);
    const form = mount(
      <Form onChange={fn}>
        <FormItem name="userName">
          <Input></Input>
        </FormItem>
        <FormItem>
          <Button htmlType="submit"></Button>
        </FormItem>
      </Form>
    );

    await act(async () => {
      await form.find("input").simulate("change", { target: { value: "1" } });
    });
    expect(value).toEqual("1");
  });

  it("测试没有 Form 包裹的 FormItem", () => {
    const formItem = renderer
      .create(
        <FormItem name="userName">
          <Input></Input>
        </FormItem>
      )
      .toJSON();
    expect(formItem).toMatchSnapshot();
  });

  it("测试 FormItem 组件 label 参数", () => {
    const form = renderer
      .create(
        <Form>
          <FormItem name="userName" label="userName">
            <Input></Input>
          </FormItem>
        </Form>
      )
      .toJSON();
    expect(form).toMatchSnapshot();
  });

  it("测试 FormItem 组件 labelAlign 参数", () => {
    const labelAligns = ["left", "center", "right"];
    const forms = labelAligns.map((x) => {
      return renderer
        .create(
          <Form>
            <FormItem name="userName" label="userName" labelAlign={x}>
              <Input></Input>
            </FormItem>
          </Form>
        )
        .toJSON();
    });
    forms.forEach((x) => {
      expect(x).toMatchSnapshot();
    });
  });

  it("测试 FormItem 组件 labelCol 参数", () => {
    const form = renderer
      .create(
        <Form>
          <FormItem name="userName" labelCol={{ span: 4 }}>
            <Input></Input>
          </FormItem>
        </Form>
      )
      .toJSON();
    expect(form).toMatchSnapshot();
  });

  it("测试 FormItem 组件 wrapperCol 参数", () => {
    const form = renderer
      .create(
        <Form>
          <FormItem name="userName" wrapperCol={{ span: 12 }}>
            <Input></Input>
          </FormItem>
        </Form>
      )
      .toJSON();
    expect(form).toMatchSnapshot();
  });

  it("测试 FormItem 组件 defaultValue 参数", () => {
    const form = renderer
      .create(
        <Form>
          <FormItem name="userName" defaultValue={"default Value"}>
            <Input></Input>
          </FormItem>
        </Form>
      )
      .toJSON();
    expect(form).toMatchSnapshot();
  });

  it("测试 FormItem 组件 onChange 参数", async () => {
    var value = null;
    const fn = (v) => (value = v.userName);
    const form = mount(
      <Form>
        <FormItem name="userName" onChange={fn}>
          <Input></Input>
        </FormItem>
        <FormItem>
          <Button htmlType="submit"></Button>
        </FormItem>
      </Form>
    );

    await act(async () => {
      await form.find("input").simulate("change", { target: { value: "1" } });
      await form.find("button").simulate("submit");
    });
    expect(value).toEqual("1");
  });

  it("测试 FormItem 组件 validate 参数", async () => {
    var value = null;
    const fn = jest.fn();
    const form = mount(
      <Form onFinish={fn}>
        <FormItem
          name="userName"
          rules={[
            { required: true },
            {
              validator: (_, value) => {
                return new Promise((resolve, reject) => {
                  if (value && value.length <= 10) {
                    reject("用户名长度必须大于10个字符");
                  } else {
                    resolve();
                  }
                });
              },
            },
          ]}
        >
          <Input></Input>
        </FormItem>
        <FormItem>
          <Button htmlType="submit"></Button>
        </FormItem>
      </Form>
    );

    await act(async () => {
      await form.find("button").simulate("submit");
    });
    expect(fn).not.toBeCalled();
    expect(form.find(".guree-form-item-error").at(0).text()).toEqual(
      "required"
    );
    await act(async () => {
      await form
        .find("input")
        .simulate("change", { target: { value: "1234567891" } });
      await form.find("button").simulate("submit");
    });
    expect(fn).not.toBeCalled();
    expect(form.find(".guree-form-item-error").at(0).text()).toEqual(
      "用户名长度必须大于10个字符"
    );
    await act(async () => {
      await form
        .find("input")
        .simulate("change", { target: { value: "12345678910" } });
      await form.find("button").simulate("submit");
    });
    expect(fn).toBeCalledWith({
      userName: "12345678910",
    });
    expect(form.find(".guree-form-item-error").at(0).text()).toEqual("");
  });

  it("测试 FormItem 组件 validate 参数 验证器过程出错", async () => {
    var value = null;
    const fn = jest.fn();
    const form = mount(
      <Form onFinish={fn}>
        <FormItem
          name="userName"
          rules={[
            { required: true },
            {
              validator: (_, value) => {
                return new Promise((resolve, reject) => {
                  if (value.length <= 10) {
                    reject("用户名长度必须大于10个字符");
                  } else {
                    resolve();
                  }
                });
              },
            },
          ]}
        >
          <Input></Input>
        </FormItem>
        <FormItem>
          <Button htmlType="submit"></Button>
        </FormItem>
      </Form>
    );

    await act(async () => {
      await form.find("button").simulate("submit");
    });
    expect(fn).not.toBeCalled();
    expect(form.find(".guree-form-item-error").at(0).text()).toEqual(
      "required"
    );
  });
});
