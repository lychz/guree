# Guree

使用 React + TypeScript 编写的 UI 组件库

### 安装

```
yarn add guree
```

### 使用

```
import { Icon } from 'guree';
import 'guree/build/lib/index.css';

ReactDOM.render(<Icon></Icon>, mountNode);
```

### 按需加载

`guree` 的每个组件都被打包至单独的目录下，可以支持按需加载

```
import Icon from 'guree/build/lib/components/Icon'
import 'guree/build/lib/components/Icon/index.css'
```

也可以使用 `babel-plugin-import` 或者其他插件，使用 `babel-plugin-import` 的配置如下

```
{
  libraryName: 'guree',
  camel2DashComponentName: false,
  camel2UnderlineComponentName: false,
  libraryDirectory: "/build/lib/components",
  style: (name, file) => {
    return `${name}/index.css`;
  }
}
```

之后便可以按如下使用

```
import { Icon } from 'guree';
```

### TypeScript

`guree` 完全使用 TypeScript 编写，并提供了完整的类型定义文件

### 测试

`guree` 对每个组件都进行单元测试，测试覆盖率 100%
