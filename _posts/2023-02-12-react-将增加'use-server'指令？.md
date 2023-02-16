---
title: React 将增加'use server'指令？
date: 2023-02-12
tags:
  - Webpack
  - React
  - RSC
hide: true
---

> 该功能尚在开发，变化较大，书写此 Blog 基于提交[fccf3a9fba](https://github.com/facebook/react/tree/fccf3a9fba5fd778c678657c556344b333111cfb)

在继 React Server Component（RSC）之后，React Core Team 又在该概念上新增了 'use server' 指令。在使用了 'use server' 指令的文件
中的函数，将会在服务端执行，其对客户端是透明的，同时客户端也是禁止执行的。因为这些函数将有可能访问服务端资源，以及调用 Node.js 的 API。该文则将分析
该功能的实现细节，了解其背后的原理，同时还是涉及 RSC 的一些知识。

### 案例

#### 客户端

`actions.js`

```js
"use server";

export const getName = () => "jack";
```

`Comp.jsx`

```jsx
"use client"; // 只有 client 组件才能交互
function Comp({ action, children }) {
  return (
    <div
      onClick={async () => {
        const res = await action();
        console.log(res);
      }}
    >
      {children}
    </div>
  );
}
```

`App.jsx`

ServerComponent, `fetch("http://localhost:3001")` 时会返回该组件的 Stream

```jsx
import { getName } from "actions.js";
import Comp from "Comp.jsx";
function App() {
  return <Comp action={getName}>add</Comp>;
}
```

`index.js`

```jsx
let data = ReactServerDOMReader.createFromFetch(
  fetch("http://localhost:3001"),
  {
    callServer(id, args) {
      const response = fetch("http://localhost:3001", {
        method: "POST",
        cors: "cors",
        headers: {
          "rsc-action": JSON.stringify({ filepath: id.id, name: id.name }),
        },
        body: JSON.stringify(args),
      });
      return ReactServerDOMReader.createFromFetch(response);
    },
  }
);

function Content() {
  return React.use(data);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Suspense fallback={<h1>Loading...</h1>}>
    <Content />
  </Suspense>
);
```

#### 服务端

```js
const handler = (req, res) => {
  const serverReference = JSON.parse(req.get("rsc-action"));
  const { filepath, name } = serverReference;
  const action = (await import(filepath))[name];
  const args = JSON.parse(req.body);
  const result = action.apply(null, args);

  res.setHeader("Access-Control-Allow-Origin", "*");
  const { pipe } = renderToPipeableStream(result, {});
  pipe(res);
};
```

可以看到，React 把前后端的通讯接口留给了开发者，或者说更上一层框架的开发者。具体流程如下图

![](/images/RSF.webp)

❓*React 是如何知道当 Button 触发 onClick 事时，需要 callServer 的*

### 'use server' 魔法

当我们在 `actions.js` 文件内使用 'use server' 指令后，该文件经由 Node.js 的处理，所导出的函数将会被挂载上一些属性

```js
// 函数被 Object.defineProperties 设置属性
{
  $$typeof: { value: SERVER_REFERENCE }, // SERVER_REFERENCE 是一个 Symbol
  $$filepath: { value: moduleId },
  $$name: { value: "*" },
  $$bound: { value: [] },
};
```

另一方面，在 ReactFlightServer 序列化 ReactComponent 的时候，会通过 `$$typeof.value` 判断值类型，当遇到 `SERVER_REFERENCE` 则会把当前节点的 Tag 标记为 **F**
（注意，该 **F** 可能有特殊意义，也可能没有，但这并不重要，其主要作用是标记当前节点的类型，是序列化 ReactComponent 后的标记）。在 ReactFlightClient 反序列化时，解析遇到 **F** ，
则会在客户端给该 eventHandler 挂上 `proxy`，当用户触发事件时，经由该 `proxy` 调用 `callServer` 函数。引发 React rerender（?），`callServer` 的返回值
又是 React 流，顾可以使用返回结果重新渲染 React。
