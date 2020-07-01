```jsx
import { FormItem } from "@components/Form";
import Input from "@components/Input";
import Button from "@components/Button";
import { useState } from "react";

const submit = (value) => {
  // console.log(value);
};

<Form onFinish={submit}>
  <FormItem
    label="username"
    name="username"
    rules={[
      { required: true, message: "username is required" },
      {
        validator: (_, value) => {
          // console.log(_);
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              // console.log(1111)
              reject(`${value}`);
            }, 3000);
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
    rules={[
      { required: true },
      {
        validator: (_, value) => {
          // console.log(_);
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              value === "123456" ? resolve() : reject(`fail`);
            }, 3000);
          });
        },
      },
    ]}
  >
    <Input></Input>
  </FormItem>
  <FormItem>
    <Button htmlType="submit">submit</Button>
  </FormItem>
</Form>;
```
