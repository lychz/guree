### 基本用法

```jsx
import Col from "@components/Col";
<div className="grid-demo grid-row-demo">
  <Row>
    <Col span={6}></Col>
    <Col span={6}></Col>
    <Col span={6}></Col>
    <Col span={6}></Col>
  </Row>
</div>;
```

### 水平布局

```jsx
import Col from "@components/Col";
<div className="grid-demo grid-row-demo">
  <Row justify="end">
    <Col span={6}></Col>
    <Col span={6}></Col>
    <Col span={6}></Col>
  </Row>
  <Row justify="center">
    <Col span={6}></Col>
    <Col span={6}></Col>
    <Col span={6}></Col>
  </Row>
  <Row justify="space-around">
    <Col span={6}></Col>
    <Col span={6}></Col>
    <Col span={6}></Col>
  </Row>
  <Row justify="space-between">
    <Col span={6}></Col>
    <Col span={6}></Col>
    <Col span={6}></Col>
  </Row>
  <Row justify="strat">
    <Col span={6}></Col>
    <Col span={6}></Col>
    <Col span={6}></Col>
  </Row>
</div>;
```

### 垂直布局

```jsx
import Col from "@components/Col";
<div className="grid-demo grid-row-demo">
  <Row align="top">
    <Col span={6}>
      <div style={{ height: "20px" }}></div>
    </Col>
    <Col span={6}>
      <div style={{ height: "50px" }}></div>
    </Col>
    <Col span={6}>
      <div style={{ height: "20px" }}></div>
    </Col>
    <Col span={6}>
      <div style={{ height: "50px" }}></div>
    </Col>
  </Row>
  <Row align="middle">
    <Col span={6}>
      <div style={{ height: "20px" }}></div>
    </Col>
    <Col span={6}>
      <div style={{ height: "50px" }}></div>
    </Col>
    <Col span={6}>
      <div style={{ height: "20px" }}></div>
    </Col>
    <Col span={6}>
      <div style={{ height: "50px" }}></div>
    </Col>
  </Row>
  <Row align="bottom">
    <Col span={6}>
      <div style={{ height: "20px" }}></div>
    </Col>
    <Col span={6}>
      <div style={{ height: "50px" }}></div>
    </Col>
    <Col span={6}>
      <div style={{ height: "20px" }}></div>
    </Col>
    <Col span={6}>
      <div style={{ height: "50px" }}></div>
    </Col>
  </Row>
</div>;
```

### 间隔

```jsx
import Col from "@components/Col";
<div className="grid-gutter-demo">
  <Row
    gutter={[
      { xs: 2, sm: 4, md: 6, lg: 8, xl: 10, xxl: 12 },
      { xs: 2, sm: 4, md: 6, lg: 8, xl: 10, xxl: 12 },
    ]}
  >
    <Col span={6}>
      <div className="grid-item"></div>
    </Col>
    <Col span={6}>
      <div className="grid-item"></div>
    </Col>
    <Col span={6}>
      <div className="grid-item"></div>
    </Col>
    <Col span={6}>
      <div className="grid-item"></div>
    </Col>
  </Row>
  <Row
    gutter={[
      { xs: 2, sm: 4, md: 6, lg: 8, xl: 10, xxl: 12 },
      { xs: 2, sm: 4, md: 6, lg: 8, xl: 10, xxl: 12 },
    ]}
  >
    <Col span={6}>
      <div className="grid-item"></div>
    </Col>
    <Col span={6}>
      <div className="grid-item"></div>
    </Col>
    <Col span={6}>
      <div className="grid-item"></div>
    </Col>
    <Col span={6}>
      <div className="grid-item"></div>
    </Col>
  </Row>
</div>;
```
