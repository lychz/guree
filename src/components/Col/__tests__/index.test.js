import React from "react";
import renderer from "react-test-renderer";
import Col from "..";
import Row from "@components/Row";

describe("Col", () => {
  it("正确导出 Col 组件", () => {
    const col = renderer
      .create(
        <Row>
          <Col span={4}></Col>
        </Row>
      )
      .toJSON();
    expect(col).toMatchSnapshot();
  });

  it("测试 Col 组件 flex 参数", () => {
    const col = renderer
      .create(
        <Row>
          <Col flex="1 1"></Col>
          <Col flex={1}></Col>
        </Row>
      )
      .toJSON();
    expect(col).toMatchSnapshot();
  });

  it("测试 Col 组件 offset 参数", () => {
    const col = renderer
      .create(
        <Row>
          <Col span={4} offset="1"></Col>
          <Col span={4} offset={1}></Col>
        </Row>
      )
      .toJSON();
    expect(col).toMatchSnapshot();
  });
  it("测试 Col 组件 order 参数", () => {
    const col = renderer
      .create(
        <Row>
          <Col span={4} order="1"></Col>
          <Col span={4} order={1}></Col>
        </Row>
      )
      .toJSON();
    expect(col).toMatchSnapshot();
  });
  it("测试 Col 组件 push 参数", () => {
    const col = renderer
      .create(
        <Row>
          <Col span={4} push="1"></Col>
          <Col span={4} push={1}></Col>
        </Row>
      )
      .toJSON();
    expect(col).toMatchSnapshot();
  });
  it("测试 Col 组件 offset 参数", () => {
    const col = renderer
      .create(
        <Row>
          <Col span={4} offset="1"></Col>
          <Col span={4} offset={1}></Col>
        </Row>
      )
      .toJSON();
    expect(col).toMatchSnapshot();
  });

  it("测试 Col 组件 xs sm md lg xl xxl 参数", () => {
    const col = renderer
      .create(
        <Row>
          <Col span={4} xs={1} sm={2} md={3} lg={4} xl={5} xxl={6}></Col>
          <Col span={4} xs="1" sm="2" md="3" lg="4" xl="5" xxl="6"></Col>
          <Col
            span={4}
            xs={{ offset: 1, order: 1, push: 1, pull: 1, span: 1 }}
          ></Col>{" "}
          <Col
            span={4}
            sm={{ offset: 1, order: 1, push: 1, pull: 1, span: 1 }}
          ></Col>
          <Col
            span={4}
            md={{ offset: 1, order: 1, push: 1, pull: 1, span: 1 }}
          ></Col>
          <Col
            span={4}
            lg={{ offset: 1, order: 1, push: 1, pull: 1, span: 1 }}
          ></Col>
          <Col
            span={4}
            xl={{ offset: 1, order: 1, push: 1, pull: 1, span: 1 }}
          ></Col>
          <Col
            span={4}
            xxl={{ offset: 1, order: 1, push: 1, pull: 1, span: 1 }}
          ></Col>
        </Row>
      )
      .toJSON();
    expect(col).toMatchSnapshot();
  });
});
