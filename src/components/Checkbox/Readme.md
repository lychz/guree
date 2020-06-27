### 基本用法

```jsx
const onChange = (checkboxAttrs) => {
  console.log(checkboxAttrs);
};
<Checkbox value={"checkbox"} onChange={onChange}>
  checkbox
</Checkbox>;
```

### 默认选中

```jsx
<Checkbox defaultChecked value={"radio"}>
  radio
</Checkbox>
```

### 受控组件

```jsx
import { useState } from "react";
const [checked, setChecked] = useState(false);
const onChange = (checkboxAttrs) => {
  const { checked } = checkboxAttrs;
  setChecked(checked);
};
<div>
  <Checkbox checked={checked} onChange={onChange} value={"checkbox"}>
    checkbox
  </Checkbox>
</div>;
```

### 禁用状态

```jsx
<Checkbox disabled value={"checkbox"}>
  checkbox
</Checkbox>
```

### Checkbox 组

```jsx
import { CheckboxGroup } from "@components/Checkbox";
<CheckboxGroup>
  <Checkbox value={1}>checkbox1</Checkbox>
  <Checkbox value={2}>checkbox2</Checkbox>
  <Checkbox value={3}>checkbox3</Checkbox>
</CheckboxGroup>;
```

### Checkbox 组的默认值

```jsx
import { CheckboxGroup } from "@components/Checkbox";
<CheckboxGroup defaultValue={[1, 2]}>
  <Checkbox value={1}>checkbox1</Checkbox>
  <Checkbox value={2}>checkbox2</Checkbox>
  <Checkbox value={3}>checkbox3</Checkbox>
</CheckboxGroup>;
```

### 受控的 Checkbox 组组件

```jsx
import { CheckboxGroup } from "@components/Checkbox";
import { useState } from "react";
const [checkedList, setCheckedList] = useState([]);
const onChange = (list) => {
  setCheckedList(list)
};
  <CheckboxGroup onChange={onChange} value={checkedList}>
    <Checkbox value={1}>checkbox1</Checkbox>
    <Checkbox value={2}>checkbox2</Checkbox>
    <Checkbox value={3}>checkbox3</Checkbox>
  </CheckboxGroup>
```

### 全选，需要用到 indeterminate 属性

```jsx
import { CheckboxGroup } from "@components/Checkbox";
import { useState } from "react";
const valueList = [1, 2, 3];
const [indeterminate, setIndeterminate] = useState(false);
const [checkedList, setCheckedList] = useState([]);
const [checkedAll, setCheckedAll] = useState(false);
const checkAll = (e) => {
  const { checked } = e;
  setCheckedAll(checked);
  if (checked) {
    setCheckedList(valueList);
  } else {
    setCheckedList([]);
  }
};
const onChange = (list) => {
  setCheckedList(list)
  setIndeterminate(list.length !== 0);
  setCheckedAll(list.length === valueList.length);
};
<div>
  <div>
    <Checkbox
      value={"checkAll"}
      onChange={checkAll}
      indeterminate={indeterminate}
      checked={checkedAll}
    >
      checkAll
    </Checkbox>
  </div>
  <CheckboxGroup onChange={onChange} value={checkedList}>
    <Checkbox value={valueList[0]}>checkbox1</Checkbox>
    <Checkbox value={valueList[1]}>checkbox2</Checkbox>
    <Checkbox value={valueList[2]}>checkbox3</Checkbox>
  </CheckboxGroup>
</div>;
```
