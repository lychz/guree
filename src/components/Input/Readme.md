### 基本用法

```jsx
<Input placeholder="please input" onChange={(e) => console.log(e)}></Input>
```

### 设置默认值

```jsx
<Input defaultValue="default value" onChange={(e) => console.log(e)}></Input>
```

### 设置前/后标签

```jsx
import Icon from "@components/Icon";

<div>
  <Input addonBefore="http://" addonAfter=".com"></Input>
  <br />
  <Input addonAfter={<Icon name="atom" fill="currentColor"></Icon>}></Input>
</div>;
```

### 设置前/后缀

```jsx
import Icon from "@components/Icon";

<div>
  <Input prefix="￥" suffix="RMB"></Input>
  <br />
  <Input
    prefix={<Icon name="user" fill="currentColor"></Icon>}
    suffix={<Icon name="exclamation-circle" fill="currentColor"></Icon>}
  ></Input>
</div>;
```

### 清空输入框

```jsx
<Input allowClear></Input>
```

### 禁用输入框

```jsx
<Input disabled></Input>
```

### 受控组件

```jsx
import { useState } from "react";
import Button from "@components/Button";

const [value, setValue] = useState("set value");
const onChangeHandler = (v) => {
  setValue(v);
};
const clear = () => {
  setValue("");
};
<div>
  <Input
    value={value}
    onChange={onChangeHandler}
    allowClear
    onClickClear={clear}
  ></Input>
</div>;
```
