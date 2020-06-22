### 基本用法

```jsx
<Radio value={"radio"}>radio</Radio>
```

### 选中状态

```jsx
<Radio status>radio</Radio>
```

### 禁用选项

```jsx
<Radio status={"radio"} disabled>radio</Radio>
```

### 单选组合
使用 RadioGroup 组件包裹多个 Radio 组件，可形成单选组合，通过 onChange 获取当前选中的值。注意: Radio 的 value 不能相同
```jsx
import { RadioGroup } from "@components/Radio";
<RadioGroup
  onChange={(radioAttrs) => {
    console.log(radioAttrs);
  }}
>
  <Radio value={"radio1"}>radio1</Radio>
  <Radio value={"radio2"}>radio2</Radio>
  <Radio value={"radio3"}>radio3</Radio>
</RadioGroup>;
```

### 控制选中
通过 value 控制当前选中的值
```jsx
import { RadioGroup } from "@components/Radio";
<RadioGroup value={"radio2"}>
  <Radio value={"radio1"}>radio1</Radio>
  <Radio value={"radio2"}>radio2</Radio>
  <Radio value={"radio3"}>radio3</Radio>
</RadioGroup>;
```
