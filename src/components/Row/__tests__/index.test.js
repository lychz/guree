import React from "react";
import renderer from "react-test-renderer";
import Row from "..";
import Col from "@components/Col";

const screenList = [575, 576, 768, 992, 1200, 1600];
const resizeWindow = (width) => {
  window.innerWidth = width;
};
// const button = mount(<Button onClick={fn}>button</Button>);

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => {
    return {
      matches: (() => {
        const minOrMax = query.slice(1, 4);
        const width = Number(query.slice(12).replace("px)", ""));
        const sceenWidth = window.innerWidth;
        if (minOrMax === "max") {
          return sceenWidth < width;
        } else if (minOrMax === "min") {
          return sceenWidth >= width;
        }
        return false;
      })(),
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
  }),
});

const numberTypeComponent = (
  <Row gutter={16}>
    <Col span={6}>col-6</Col>
    <Col span={6}>col-6</Col>
    <Col span={6}>col-6</Col>
    <Col span={6}>col-6</Col>
  </Row>
);
const objectTypeComponent = (
  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 64, xxl: 128 }}>
    <Col span={6}>col-6</Col>
    <Col span={6}>col-6</Col>
    <Col span={6}>col-6</Col>
    <Col span={6}>col-6</Col>
  </Row>
);
const ArrayNumberComponent = (
  <Row gutter={[16, 24]}>
    <Col span={6}>col-6</Col>
    <Col span={6}>col-6</Col>
    <Col span={6}>col-6</Col>
    <Col span={6}>col-6</Col>
  </Row>
);

const ArrayObjectComponent = (
  <Row
    gutter={[
      { xs: 2, sm: 4, md: 6, lg: 8, xl: 10, xxl: 12 },
      { xs: 14, sm: 16, md: 18, lg: 20, xl: 22, xxl: 24 },
    ]}
  >
    <Col span={6}>col-6</Col>
    <Col span={6}>col-6</Col>
    <Col span={6}>col-6</Col>
    <Col span={6}>col-6</Col>
  </Row>
);

describe("Row", () => {
  it("正确导出 Row 组件", () => {
    const row = renderer.create(<Row></Row>).toJSON();
    expect(row).toMatchSnapshot();
  });

  it("测试 Row 组件 justify 参数", () => {
    const start = renderer
      .create(
        <Row justify="start">
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
        </Row>
      )
      .toJSON();
    const end = renderer
      .create(
        <Row justify="end">
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
        </Row>
      )
      .toJSON();
    const center = renderer
      .create(
        <Row justify="center">
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
        </Row>
      )
      .toJSON();
    const spaceAround = renderer
      .create(
        <Row justify="space-around">
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
        </Row>
      )
      .toJSON();
    const spaceBetween = renderer
      .create(
        <Row justify="space-between">
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
        </Row>
      )
      .toJSON();
    expect(start).toMatchSnapshot();
    expect(end).toMatchSnapshot();
    expect(center).toMatchSnapshot();
    expect(spaceAround).toMatchSnapshot();
    expect(spaceBetween).toMatchSnapshot();
  });

  it("测试 Row 组件 align 参数", () => {
    const top = renderer
      .create(
        <Row align="top">
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
        </Row>
      )
      .toJSON();
    const middle = renderer
      .create(
        <Row align="middle">
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
        </Row>
      )
      .toJSON();
    const bottom = renderer
      .create(
        <Row align="bottom">
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
        </Row>
      )
      .toJSON();
    expect(top).toMatchSnapshot();
    expect(middle).toMatchSnapshot();
    expect(bottom).toMatchSnapshot();
  });

  it("测试 Row 组件 gutter 参数", () => {
    const numberType = renderer.create(numberTypeComponent).toJSON();
    const objectType = renderer.create(objectTypeComponent).toJSON();
    const ArrayNumberType = renderer.create(ArrayNumberComponent).toJSON();
    const ArrayObjectType = renderer.create(ArrayObjectComponent).toJSON();
    expect(numberType).toMatchSnapshot();
    expect(objectType).toMatchSnapshot();
    expect(ArrayNumberType).toMatchSnapshot();
    expect(ArrayObjectType).toMatchSnapshot();
  });

  screenList.forEach((width) => {
    it(`测试 Row 组件 gutter 参数, window.innerWidth 为 ${width}`, () => {
      resizeWindow(width);
      const row = renderer.create(ArrayObjectComponent).toJSON();
      expect(row).toMatchSnapshot();
    });
  });

  it(`测试 Row 组件 gutter 参数, gutter 为 undefined`, () => {
    const row = renderer
      .create(
        <Row
          gutter={{
            xs: undefined,
            sm: undefined,
            md: undefined,
            lg: undefined,
            xl: undefined,
            xxl: undefined,
          }}
        >
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
        </Row>
      )
      .toJSON();
    expect(row).toMatchSnapshot();
  });
});
