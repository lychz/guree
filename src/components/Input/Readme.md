### 基本用法

```jsx
<Input placeholder="please input"></Input>
```

### 实时获取输入框的值

```jsx
const onChangeHandler = (e) => {
  const vlaue = e.target.value;
  console.log(vlaue);
};
<Input onChange={onChangeHandler}></Input>;
```

### 设置输入框的值

通过 value 字段改变 Input 组件的 value 时，不会触发 onChange

```jsx
import { useState } from "react";
import Button from "@components/Button";

const [value, setValue] = useState("set value");
const onChangeHandler = (e) => {
  console.log("value changed");
};
const changeValue = () => {
  setValue("change value");
};
<div>
  <Input value={value} onChange={onChangeHandler}></Input>
  <br />
  <Button onClick={changeValue}>change value</Button>
</div>;
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
