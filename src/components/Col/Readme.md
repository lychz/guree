```jsx
import Row from "@components/Row";
<Row>
  <Col span={4} flex="1 1">
    aaaa
  </Col>
  <Col span={4} offset="6">
    aaaa
  </Col>
  <Col span={4} order={1}>
    aaaa
  </Col>
  <Col span={4} push={1}>
    aaaa
  </Col>
  <Col span={4} pull={1}>
    aaaa
  </Col>
  <Col span={4} offset={0}>
    aaaa
  </Col>
  <Col span={4} order={0}>
    aaaa
  </Col>
  <Col span={4} push={0}>
    aaaa
  </Col>
  <Col span={4} pull={0}>
    aaaa
  </Col>
  <Col span={0}>aaaa</Col>
</Row>;
```

```jsx
import Row from "@components/Row";
<Row>
  <Col span={4} xs={1} sm={2} md={3} lg={4} xl={5} xxl={6}>
    aaaa
  </Col>
  <Col span={4} xs="1" sm="2" md="3" lg="4" xl="5" xxl="6">
    aaaa
  </Col>
  <Col span={4} xs={{ offset: 1, order: 1, push: 1, pull: 1, span: 1 }}>
    aaaa
  </Col>
  <Col span={4} sm={{ offset: 1, order: 1, push: 1, pull: 1, span: 1 }}>
    aaaa
  </Col>
  <Col span={4} md={{ offset: 1, order: 1, push: 1, pull: 1, span: 1 }}>
    aaaa
  </Col>
  <Col span={4} lg={{ offset: 1, order: 1, push: 1, pull: 1, span: 1 }}>
    aaaa
  </Col>
  <Col span={4} xl={{ offset: 1, order: 1, push: 1, pull: 1, span: 1 }}>
    aaaa
  </Col>
  <Col span={4} xxl={{ offset: 1, order: 1, push: 1, pull: 1, span: 1 }}>
    aaaa
  </Col>
</Row>;
```
