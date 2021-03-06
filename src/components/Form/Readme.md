## FormItem

Form 组件需要和 FormItem 组合使用，FormItem 的 props 如下

| Prop name    | Type                             | Default      | Description                |
| ------------ | -------------------------------- | ------------ | -------------------------- |
| label        | ReactNode                        |              | 标签                       |
| labelAlign   | "left" or "center" or "right"    | "right"      | 标签对齐方式               |
| labelCol     | ColProps                         | { span: 8 }  | 标签布局，同 `Col` 组件    |
| wrapperCol   | ColProps                         | { span: 16 } | 控件布局，同 `Col` 组件    |
| name         | string                           | `required`   | 字段名                     |
| rules        | Rules                            |              | 验证规则                   |
| onChange     | (changeedValue: FormState) => {} |              | 表单控件的值发生变化时调用 |
| defaultValue | unknown                          |              | 默认值                     |

Rules 的类型是 Rule[] , Rule 的验证规则如下

| rule name | Type                                               | Description                                |
| --------- | -------------------------------------------------- | ------------------------------------------ |
| required  | boolean                                            | 是否必填                                   |
| message   | string                                             | 提示信息，若不设置，验证器有默认的提示信息 |
| validator | `(rule: Rule, value: unknown) => Promise<unknown>` | 自定义验证器，接收一个返回 Promise 的回调  |

### 基本用法

```jsx
import { FormItem } from "@components/Form";
import Input from "@components/Input";
import Button from "@components/Button";

const submit = (value) => {
  console.log(value);
};

<Form onFinish={submit}>
  <FormItem label="userName" name="userName">
    <Input></Input>
  </FormItem>

  <FormItem label="password" name="password">
    <Input></Input>
  </FormItem>
  <FormItem>
    <Button htmlType="submit">submit</Button>
  </FormItem>
</Form>;
```

### 设置标签和控件的布局以及标签对齐方式

```jsx
import { FormItem } from "@components/Form";
import Input from "@components/Input";
import Button from "@components/Button";
import { useState } from "react";

const [labelAlign, setLabelAlign] = useState("right");
const [labelCol, setLableCol] = useState({
  span: 8,
});
const [wrapperCol, setWrapperCol] = useState({
  span: 16,
});
const changeLabelAlign = (labelAlign) => {
  return () => {
    setLabelAlign(labelAlign);
  };
};

const changeCol = (labelCol, wrapperCol) => {
  return () => {
    setLableCol(labelCol);
    setWrapperCol(wrapperCol);
  };
};

<div>
  <div style={{ display: "flex", justifyContent: "center" }}>
    <Button onClick={changeLabelAlign("left")}>left</Button>
    <Button onClick={changeLabelAlign("center")}>center</Button>
    <Button onClick={changeLabelAlign("right")}>right</Button>
    <Button
      onClick={changeCol(
        {
          span: 8,
        },
        {
          span: 16,
        }
      )}
    >
      布局一
    </Button>
    <Button
      onClick={changeCol(
        {
          span: 4,
        },
        {
          span: 12,
        }
      )}
    >
      布局二
    </Button>
  </div>
  <br />
  <br />
  <Form>
    <FormItem
      label="userName"
      name="userName"
      labelAlign={labelAlign}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
    >
      <Input></Input>
    </FormItem>

    <FormItem
      label="password"
      name="password"
      labelAlign={labelAlign}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
    >
      <Input></Input>
    </FormItem>
    <FormItem>
      <Button htmlType="submit">submit</Button>
    </FormItem>
  </Form>;
</div>;
```

### 设置默认值

FormItem 内的控件是是被 FormItem 控制的，给控件组件传 value defaultValue onChange 均是无效的。如果想要设置默认值，应当在 FormItem 上设置

```jsx
import { FormItem } from "@components/Form";
import Input from "@components/Input";
import Button from "@components/Button";

const submit = (value) => {
  console.log(value);
};

<Form onFinish={submit}>
  <FormItem label="userName" name="userName" defaultValue="userName">
    <Input></Input>
  </FormItem>

  <FormItem label="password" name="password" defaultValue="passwword">
    <Input></Input>
  </FormItem>
  <FormItem>
    <Button htmlType="submit">submit</Button>
  </FormItem>
</Form>;
```

### 监听表单值发生变化

可监听整个 Form 的变化也可以监听单个 FormItem 的变化

```jsx
import { FormItem } from "@components/Form";
import Input from "@components/Input";
import Button from "@components/Button";
import { useState } from "react";
const onChange = (value) => {
  console.log(value);
};
const onItemChange = (value) => {
  console.log(value);
};
<Form onChange={onChange}>
  <FormItem label="userName" name="userName" onChange={onItemChange}>
    <Input></Input>
  </FormItem>

  <FormItem label="password" name="password" onChange={onItemChange}>
    <Input></Input>
  </FormItem>
  <FormItem>
    <Button htmlType="submit">submit</Button>
  </FormItem>
</Form>;
```

### 验证表单

```jsx
import { FormItem } from "@components/Form";
import Input from "@components/Input";
import Button from "@components/Button";
import { useState } from "react";

const submit = (value) => {
  console.log(value);
};

<Form onFinish={submit}>
  <FormItem label="userName" name="userName" rules={[{ required: true }]}>
    <Input></Input>
  </FormItem>

  <FormItem
    label="password"
    name="password"
    rules={[{ required: true, message: "password is required" }]}
  >
    <Input></Input>
  </FormItem>
  <FormItem>
    <Button htmlType="submit">submit</Button>
  </FormItem>
</Form>;
```

### 自定义验证器

表单的每一项独立验证，互不影响。单个 FormItem 有多个验证器的时候，会在所有验证器都验证结束后，得到所有的错误信息

```jsx
import { FormItem } from "@components/Form";
import Input from "@components/Input";
import Button from "@components/Button";
import { useState } from "react";

const submit = (value) => {
  console.log(value);
};

<Form onFinish={submit}>
  <FormItem
    label="userName"
    name="userName"
    rules={[
      { required: true },
      {
        validator: (_, value) => {
          return new Promise((resolve, reject) => {
            if (value && value.length <= 10) {
              reject("用户名长度必须大于10个字符");
            } else {
              resolve();
            }
          });
        },
      },
      {
        validator: (_, value) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (value === "userName") {
                reject("用户名已经被占用");
              } else {
                resolve();
              }
            }, 1000);
          });
        },
      },
    ]}
  >
    <Input></Input>
  </FormItem>

  <FormItem
    label="password"
    name="password"
    rules={[{ required: true, message: "password is required" }]}
  >
    <Input></Input>
  </FormItem>
  <FormItem>
    <Button htmlType="submit">submit</Button>
  </FormItem>
</Form>;
```

### 各控件使用范例

```jsx
import { FormItem } from "@components/Form";
import Input from "@components/Input";
import Button from "@components/Button";
import Radio, { RadioGroup } from "@components/Radio";
import Checkbox, { CheckboxGroup } from "@components/Checkbox";
import Switch from "@components/Switch";
import { useState } from "react";

const submit = (value) => {
  console.log(value);
};

<Form onFinish={submit}>
  <FormItem
    label="userName"
    name="userName"
    rules={[
      { required: true },
      {
        validator: (_, value) => {
          return new Promise((resolve, reject) => {
            if (value && value.length <= 10) {
              reject("用户名长度必须大于10个字符");
            } else {
              resolve();
            }
          });
        },
      },
      {
        validator: (_, value) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (value === "userName") {
                reject("用户名已经被占用");
              } else {
                resolve();
              }
            }, 1000);
          });
        },
      },
    ]}
  >
    <Input></Input>
  </FormItem>

  <FormItem
    label="password"
    name="password"
    rules={[{ required: true, message: "password is required" }]}
  >
    <Input></Input>
  </FormItem>
  <FormItem label="radio" name="radio" rules={[{ required: true }]}>
    <RadioGroup>
      <Radio value={1}>radio1</Radio>
      <Radio value={2}>radio2</Radio>
      <Radio value={3}>radio3</Radio>
    </RadioGroup>
  </FormItem>
  <FormItem
    label="chckout"
    name="chckout"
    rules={[
      {
        validator: (_, value) => {
          return new Promise((resolve, reject) => {
            if (value && value.length > 0) {
              resolve();
            } else {
              reject("请至少选中一项");
            }
          });
        },
      },
    ]}
  >
    <CheckboxGroup>
      <Checkbox value={1}>checkbox1</Checkbox>
      <Checkbox value={2}>checkbox2</Checkbox>
      <Checkbox value={3}>checkbox3</Checkbox>
    </CheckboxGroup>
  </FormItem>
  <FormItem
    label="switch"
    name="switch"
    rules={[
      {
        validator: (_, value) => {
          return new Promise((resolve, reject) => {
            if (!value) {
              reject("必须选中")
            } else {
              resolve()
            }
          });
        },
      },
    ]}
  >
    <Switch></Switch>
  </FormItem>
  <FormItem>
    <Button htmlType="submit">submit</Button>
  </FormItem>
</Form>;
```
