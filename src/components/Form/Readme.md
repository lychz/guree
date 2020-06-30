```jsx
import { FormItem } from "@components/Form";
import Input from "@components/Input";
import Button from "@components/Button";
import { useState } from "react";

const submit = (value) => {
  console.log(value);
};

const [form, setForm] = useState({
  username: 123,
});

<Form onFinish={submit} form={{ form, setForm }}>
  <FormItem
    label="username"
    name="username"
    rules={[
      { required: true, message: "is required" },
      {
        message: "validate",
        validator: (_, value) => {
          // console.log(_);
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              reject(`${value}`);
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
