### 基本用法

```jsx
const onClick = (checkboxAttrs) => {
  console.log(checkboxAttrs);
};
<Checkbox value={"checkbox"} onClick={onClick}>
  checkbox
</Checkbox>;
```

### 受控组件

```jsx
import Button from "@components/Button";
import { useState } from "react";
const [checked, setChecked] = useState(false);
const onClick = (checkboxAttrs) => {
  const { checked } = checkboxAttrs;
  setChecked(checked);
};
const changeChecked = () => {
  setChecked(!checked);
};
<div>
  <Checkbox checked={checked} onClick={onClick} value={"checkbox"}>
    checkbox
  </Checkbox>
  <br />
  <br />
  <Button onClick={changeChecked}>change checked</Button>
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
const onChange = (valueList) => {
  console.log(valueList);
};
<CheckboxGroup onChange={onChange}>
  <Checkbox value={1}>checkbox1</Checkbox>
  <Checkbox value={2}>checkbox2</Checkbox>
  <Checkbox value={3}>checkbox3</Checkbox>
</CheckboxGroup>;
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
  setIndeterminate(list.length !== 0);
  setCheckedAll(list.length === valueList.length);
};
<div>
  <div>
    <Checkbox
      value={"checkAll"}
      onClick={checkAll}
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
