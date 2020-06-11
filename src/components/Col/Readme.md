### 基本用法

```jsx
import Row from "@components/Row";
<div className="grid-demo">
  <Row>
    <Col span={4}></Col>
    <Col span={4}></Col>
    <Col span={4}></Col>
    <Col span={4}></Col>
    <Col span={4}></Col>
    <Col span={4}></Col>
  </Row>
</div>;
```

### flex 布局

```jsx
import Row from "@components/Row";
<div className="grid-demo">
  <Row>
    <Col flex={2}></Col>
    <Col flex="100px"></Col>
    <Col flex="auto"></Col>
  </Row>
</div>;
```

### 左侧间隔

```jsx
import Row from "@components/Row";
<div className="grid-demo">
  <Row>
    <Col span={6}></Col>
    <Col span={6}></Col>
    <Col span={4} offset={2}></Col>
    <Col span={6}></Col>
  </Row>
</div>;
```

### 排列顺序

```jsx
import Row from "@components/Row";
<div className="grid-demo">
  <Row>
    <Col span={6}>1</Col>
    <Col span={6}>2</Col>
    <Col span={6} order={2}>
      3
    </Col>
    <Col span={6} order={1}>
      4
    </Col>
  </Row>
</div>;
```

### 左右偏移

```jsx
import Row from "@components/Row";
<div className="grid-demo">
  <Row>
    <Col span={6} push={18}></Col>
    <Col span={18} pull={6}></Col>
  </Row>
</div>;
```

### 响应式布局

```jsx
import Row from "@components/Row";
<div className="grid-demo">
  <Row justify="space-around">
    <Col span={4} xs={6} sm={5} md={4} lg={3} xl={2} xxl={1}></Col>
    <Col span={4} xs={6} sm={5} md={4} lg={3} xl={2} xxl={1}></Col>
    <Col span={4} xs={6} sm={5} md={4} lg={3} xl={2} xxl={1}></Col>
    <Col span={4} xs={6} sm={5} md={4} lg={3} xl={2} xxl={1}></Col>
  </Row>
</div>;
```
