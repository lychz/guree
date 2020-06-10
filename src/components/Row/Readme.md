```jsx
import Col from "@components/Col";
<Row justify="start">
  <Col span={6}>col-6</Col>
  <Col span={6}>col-6</Col>
  <Col span={6}>col-6</Col>
</Row>;
```

```jsx
import Col from "@components/Col";
<Row justify="end">
  <Col span={6}>col-6</Col>
  <Col span={6}>col-6</Col>
  <Col span={6}>col-6</Col>
</Row>;
```

```jsx
import Col from "@components/Col";
<Row justify="center">
  <Col span={6}>col-6</Col>
  <Col span={6}>col-6</Col>
  <Col span={6}>col-6</Col>
</Row>;
```

```jsx
import Col from "@components/Col";
<Row justify="space-around">
  <Col span={6}>col-6</Col>
  <Col span={6}>col-6</Col>
  <Col span={6}>col-6</Col>
</Row>;
```

```jsx
import Col from "@components/Col";
<Row justify="space-between">
  <Col span={6}>col-6</Col>
  <Col span={6}>col-6</Col>
  <Col span={6}>col-6</Col>
</Row>;
```

```jsx
import Col from "@components/Col";
<Row justify="space-between">
  <Col span={6}>col-6</Col>
  <Col span={6}>col-6</Col>
  <Col span={6}>col-6</Col>
</Row>;
```

```jsx
import Col from "@components/Col";
<Row gutter={16}>
  <Col className="gutter-row" span={6}>
    <div style={{ background: "#00a0e9" }}>col-6</div>
  </Col>
  <Col className="gutter-row" span={6}>
    <div style={{ background: "#00a0e9" }}>col-6</div>
  </Col>
  <Col className="gutter-row" span={6}>
    <div style={{ background: "#00a0e9" }}>col-6</div>
  </Col>
  <Col className="gutter-row" span={6}>
    <div style={{ background: "#00a0e9" }}>col-6</div>
  </Col>
</Row>;
```

```jsx
import Col from "@components/Col";
<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
  <Col className="gutter-row" span={6}>
    col-6
  </Col>
  <Col className="gutter-row" span={6}>
    col-6
  </Col>
  <Col className="gutter-row" span={6}>
    col-6
  </Col>
  <Col className="gutter-row" span={6}>
    col-6
  </Col>
</Row>
```

```jsx
import Col from "@components/Col";
<Row gutter={[16, 24]}>
  <Col className="gutter-row" span={6}>
    col-6
  </Col>
  <Col className="gutter-row" span={6}>
    col-6
  </Col>
  <Col className="gutter-row" span={6}>
    col-6
  </Col>
  <Col className="gutter-row" span={6}>
    col-6
  </Col>
  <Col className="gutter-row" span={6}>
    col-6
  </Col>
  <Col className="gutter-row" span={6}>
    col-6
  </Col>
  <Col className="gutter-row" span={6}>
    col-6
  </Col>
  <Col className="gutter-row" span={6}>
    col-6
  </Col>
</Row>
```
