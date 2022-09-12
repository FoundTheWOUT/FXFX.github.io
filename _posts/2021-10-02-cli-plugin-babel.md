---
title: 从 @vue/cli-plugin-babel 理解 babel 和其各种插件
date: 2021-10-02
update: 2021-08-10
tag:
  - vue
  - babel
image: /images/babel.png
---

​	在[`@vue/cli`](https://cli.vuejs.org/)生成的项目`vue2`项目中, 它会自动的帮助我们完成[`babel`](https://babeljs.io/)的配置. 而配置项则非常的简单, 就是使用了[`@vue/cli-plugin-babel`](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel)则一插件, 这个插件是官方的`@vue/cli`插件. 该插件主要是对`babel`配置的封装, 让用户有开箱即用的`vue`开发体验. 本文会从该插件开启讨论, 并最终深入到`babel`以及一些`babel`插件.

与本文相关的包

- [`@vue/babel-preset-app`](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app)
- [`@babel/plugin-transform-runtime`]

## 入口 - index.js

为`@vue/cli`插件机制的入口文件. 它会做以下事情

- 加载项目级别的`babel`配置
- 使用`@vue/cli`的 API 配置 Webpack. 在这里就是对 Webpack 的 module 进行配置, 并载入`babel-loader`.

而主要的`babel`配置, 这主要放在了`@vue/babel-preset-app`这个包中.

## babel-preset-app

该包根据多种不同的情况下会输出不同`babel`配置. 在`Vue2`且不做配置的情况下, 其将会输出这样的`babel`配置

```json
{
    "presets":[
        [
            "@babel/preset-env",
            {
             	...
            }
        ]
    ]
    "plugins":[
        "@babel/plugin-syntax-dynamic-import", //解析动态 import(), 在 preset-env(ES2020)中内建
        "@babel/plugin-proposal-decorators", //转换 class 和 object 的装饰器到 ES5
        "@babel/plugin-proposal-class-properties", //转换静态类属性以及用属性初始化器语法声明的属性, 在 preset-env(ES2022)中内建
        "@babel/plugin-transform-runtime"
    ]
}
```

这里重点说下`@babel/plugin-transform-runtime`

> Babel uses very small helpers for common functions such as `_extend`. By default this will be added to every file that requires it. This duplication is sometimes unnecessary, especially when your application is spread out over multiple files.
>
> This is where the `@babel/plugin-transform-runtime` plugin comes in: all of the helpers will reference the module `@babel/runtime` to avoid duplication across your compiled output. The runtime will be compiled into your build.
>
> Another purpose of this transformer is to create a sandboxed environment for your code. If you directly import [core-js](https://github.com/zloirock/core-js) or [@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill) and the built-ins it provides such as `Promise`, `Set` and `Map`, those will pollute the global scope. While this might be ok for an app or a command line tool, it becomes a problem if your code is a library which you intend to publish for others to use or if you can't exactly control the environment in which your code will run.
>
> The transformer will alias these built-ins to `core-js` so you can use them seamlessly without having to require the polyfill.
>
> See the [technical details](https://babeljs.io/docs/en/babel-plugin-transform-runtime#technical-details) section for more information on how this works and the types of transformations that occur.
>
> 摘自 *https://babeljs.io/docs/en/babel-plugin-transform-runtime*

上文说明, 使用该插件后, 所有的`helpers`将会从`@babel/runtime`引用(预示着我们需要安装`@babel/runtime`, 文档中也指出我们需要把`@babel/runtime`安装到依赖项而非开发依赖, 这是因为需要保证使用该库的项目能正确的得到`helpers`引用).

同时, 它还创建了一个沙盒环境, 防止了`core-js`和`@babel/polyfill`对全局作用域造成的污染.

