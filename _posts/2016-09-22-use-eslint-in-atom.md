---
layout: post
title: 在 Atom 使用 eslint
tags: atom eslint
---

由于团队在做 React Native 开发时选择遵守 AirBnb 的编码规范，所以有机会研究了下如何在 Atom 下实现规范检查。

## 编码规范

> 本段介绍我所在项目所使用的规范，会对下面「开始」段产生一些影响。

1. 基本遵循 [AirBnb 编码规范](https://github.com/airbnb/javascript)；
2. 支持 ES7；
3. 允许在 JS 文件中使用 JSX；
4. 允许类的非静态方法不使用 `this`；
5. 允许引用指定的通过 `providesModule` 声明的模块。

## 开始

### 1. 安装 eslint

#### 1.1 安装 Atom 插件

使 Atom 支持 eslint 规范检查。

```bash
# 安装 linter 插件
apm install linter
# 安装 linter-eslint 插件
apm install linter-eslint
```

#### 1.2 安装 npm 依赖

在项目根目录下执行。

```bash
# 使 eslint 支持 AirBnb 编码规范。
npm install --save-dev eslint-config-airbnb babel-eslint eslint-plugin-react
# 使 eslint 支持 ES7 编码规范。
npm install babel-eslint --save-dev
```

> 因为 ES7 现在还是草案，各大厂商也并未正式支持，现在只能依赖 babel 的解析。因此，此处我们还需要安装 `babel-eslint`，使 eslint 支持 ES7 的新特性。

#### 1.3 创建 `.eslintrc` 文件

指定使用 AirBnb 编码规范。在项目根目录下创建 `.eslintrc` 文件。

```bash
{
  # 使用 AirBnb 编码规范
  "extends": "eslint-config-airbnb",
  # 支持 ES7
  "parser": "babel-eslint",
  "rules": {
    # 允许在 JS 文件中使用 JSX
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    # 允许类的非静态方法不使用 `this`；
    "class-methods-use-this": 0,
    # 允许引用未在 package.json 中写入依赖的包
    "import/no-extraneous-dependencies": 0,
    # 允许引用指定的而路径不存在的包
    "import/no-unresolved": [2, { ignore: ['NavigatorNavigationBar'] }]
  },
}
```

### 2. 安装 editorconfig（可选）

主要为使 tab 键符合编码规范的同时不至于影响 Atom 中的其他项目。

#### 2.1 安装 Atom 插件

使 Atom 支持 editorconfig。

```bash
apm install editorconfig
```

#### 2.2 创建 `.editorconfig` 文件

配置缩进（使用双空格缩进）。在项目根目录下创建 `.editorconfig` 文件。

```
root = true

[*.js]
indent_style = space
indent_size = 2
```

## 提示

1. `.editorconfig` 不是实时生效的，你需要重启 Atom 后才能生效；
2. `.eslintrc` 也不是实时生效的，你需要在 Atom 中运行 `linter: lint` 命令或者重新打开待检测文件才能生效；
3. 在 Atom 中运行 `Linter Eslint: Fix File` 命令可以让 Atom 自动完成简单的格式化操作；
4. 以上实现的编码规范为我们团队自己定制，大家可以根据自己的需要自由定制。


## 参考

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [linter-eslint - Atom](https://atom.io/packages/linter-eslint)
- [eslint-config-airbnb - Github](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)
- [Atom EditorConfig - Github](https://github.com/sindresorhus/atom-editorconfig)
- [Setup ES6+Babel+JSX Linting with Atom](https://gist.github.com/darokel/90fe5c8ad8df5efcab6b)
- [babel-eslint - Github](https://github.com/babel/babel-eslint)
- [eslint 官网](http://eslint.org/)
