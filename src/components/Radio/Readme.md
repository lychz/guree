### 基本用法

```jsx
<Radio value={"radio"}>radio</Radio>
```

### 默认选中

```jsx
<Radio defaultChecked value={"radio"}>
  radio
</Radio>
```

### 受控组件

```jsx
import Button from "@components/Button";
import { useState } from "react";
const [checked, setChecked] = useState(false);
const onChange = (radioAttrs) => {
  const { checked } = radioAttrs;
  setChecked(checked);
};
const changeChecked = () => {
  setChecked(!checked);
};
<div>
  <Radio checked={checked} onChange={onChange}>
    radio
  </Radio>
  <br />
  <br />
  <Button onClick={changeChecked}>change checked</Button>
</div>;
```

### 禁用选项

```jsx
<Radio status={"radio"} disabled>
  radio
</Radio>
```

### 单选组合

使用 RadioGroup 组件包裹多个 Radio 组件，可形成单选组合，通过 onChange 获取当前选中的值。注意: Radio 的 value 不能相同

```jsx
import { RadioGroup } from "@components/Radio";
<RadioGroup>
  <Radio value={1}>radio1</Radio>
  <Radio value={2}>radio2</Radio>
  <Radio value={3}>radio3</Radio>
</RadioGroup>;
```

### 单选组的默认值

```jsx
import { RadioGroup } from "@components/Radio";
<RadioGroup defaultValue={2}>
  <Radio value={1}>radio1</Radio>
  <Radio value={2}>radio2</Radio>
  <Radio value={3}>radio3</Radio>
</RadioGroup>;
```

### 受控的单选组组件

通过 value 控制当前选中的值

```jsx
import Button from "@components/Button";
import { RadioGroup } from "@components/Radio";
import { useState } from "react";
const [value, setValue] = useState(1);
const changeRadio = (value) => {
  return () => {
    setValue(value);
  };
};

const onChange = (value) => {
  setValue(value);
};

<div>
  <RadioGroup value={value} onChange={onChange}>
    <Radio value={1}>radio1</Radio>
    <Radio value={2}>radio2</Radio>
    <Radio value={3}>radio3</Radio>
  </RadioGroup>
  <br />
  <br />
  <Button onClick={changeRadio(1)}>check radio1</Button>
  <Button onClick={changeRadio(2)}>check radio2</Button>
  <Button onClick={changeRadio(3)}>check radio3</Button>
</div>;
```
