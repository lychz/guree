### 基本用法

```jsx
import Button from "@components/Button";
import { useState } from "react";

const [visible, setVisible] = useState(false);
const showModal = () => {
  setVisible(true);
};

const hideModal = () => {
  setVisible(false);
};

const cancelHandler = (e) => {
  console.log(e);
  hideModal();
};

const confirmHandler = (e) => {
  console.log(e);
  hideModal();
};

<div>
  <Button onClick={showModal}>show</Button>

  <Modal
    title="title"
    visible={visible}
    onCancel={cancelHandler}
    onConfirm={confirmHandler}
  >
    <div>some things</div>
    <div>some things</div>
    <div>some things</div>
  </Modal>
</div>;
```

### 不显示遮罩

```jsx
import Button from "@components/Button";
import { useState } from "react";

const [visible, setVisible] = useState(false);
const showModal = () => {
  setVisible(true);
};

const hideModal = () => {
  setVisible(false);
};

const cancelHandler = (e) => {
  console.log(e);
  hideModal();
};

const confirmHandler = (e) => {
  console.log(e);
  hideModal();
};

<div>
  <Button onClick={showModal}>show</Button>

  <Modal
    title="title"
    visible={visible}
    onCancel={cancelHandler}
    onConfirm={confirmHandler}
    mask={false}
  >
    <div>some things</div>
    <div>some things</div>
    <div>some things</div>
  </Modal>
</div>;
```

### 自定义按钮文字

```jsx
import Button from "@components/Button";
import { useState } from "react";

const [visible, setVisible] = useState(false);
const showModal = () => {
  setVisible(true);
};

const hideModal = () => {
  setVisible(false);
};

const cancelHandler = (e) => {
  console.log(e);
  hideModal();
};

const confirmHandler = (e) => {
  console.log(e);
  hideModal();
};

<div>
  <Button onClick={showModal}>show</Button>

  <Modal
    title="title"
    visible={visible}
    onCancel={cancelHandler}
    onConfirm={confirmHandler}
    cancelContent="cancel"
    confirmContent="confirm"
  >
    <div>some things</div>
    <div>some things</div>
    <div>some things</div>
  </Modal>
</div>;
```

### 自定义底部内容

```jsx
import Button from "@components/Button";
import { useState } from "react";

const [visible, setVisible] = useState(false);
const showModal = () => {
  setVisible(true);
};

const hideModal = () => {
  setVisible(false);
};

const cancelHandler = (e) => {
  console.log(e);
  hideModal();
};

const confirmHandler = (e) => {
  console.log(e);
  hideModal();
};

const footer = [
  <Button key="no" onClick={cancelHandler} type="primary">
    NO
  </Button>,
  <Button key="yes" onClick={confirmHandler} type="danger">
    Yes
  </Button>,
];

<div>
  <Button onClick={showModal}>show</Button>

  <Modal
    title="warnning"
    visible={visible}
    onCancel={cancelHandler}
    onConfirm={confirmHandler}
    footer={footer}
  >
    <p>Are you sure ?</p>
  </Modal>
</div>;
```

### 不显示右上角关闭按钮

```jsx
import Button from "@components/Button";
import { useState } from "react";

const [visible, setVisible] = useState(false);
const showModal = () => {
  setVisible(true);
};

const hideModal = () => {
  setVisible(false);
};

const cancelHandler = (e) => {
  console.log(e);
  hideModal();
};

const confirmHandler = (e) => {
  console.log(e);
  hideModal();
};

<div>
  <Button onClick={showModal}>show</Button>

  <Modal
    title="title"
    visible={visible}
    onCancel={cancelHandler}
    onConfirm={confirmHandler}
    closeable={false}
  >
    <div>some things</div>
    <div>some things</div>
    <div>some things</div>
  </Modal>
</div>;
```

### 使用特定的 Modal

如果不想使用 `<Modal></Modal>` 形式，也可以使用 `$modal()` 的形式使用。注意：当使用 `$modal` 时，不支持 `visible` 参数，可用返回的 `close` 方法隐藏 Modal
另外，还有 `$alert` `$confirm` 两个特定的 Modal 可以使用

```jsx
import Button from "@components/Button";
import { $modal, $alert, $confirm } from "@components/Modal";

const cancelHandler = (e) => {
  console.log(e);
};

const confirmHandler = (e) => {
  console.log(e);
};

const showModal = () => {
  const modal = $modal({
    title: "title",
    onCancel: cancelHandler,
    onConfirm: confirmHandler,
    children: (
      <div>
        modal content
        <Button
          onClick={() => {
            modal.close();
          }}
        >
          close me
        </Button>
      </div>
    ),
  });
};

const showAlert = () => {
  $alert({
    title: "alert title",
    content: "alert content",
  });
};

const showConfirm = () => {
  $confirm({
    title: "confirm title",
    content: "confirm content",
  });
};

<div>
  <Button onClick={showModal}>show modal</Button>
  <Button onClick={showAlert}>show alert</Button>
  <Button onClick={showConfirm}>show confirm</Button>
</div>;
```
