---
title: Golang 中的 fmt 是什么鬼
date: 2022-01-23
tag:
  - golang
image: /images/homePage_2.png
---

## `println` 与 `fmt.Println`

在 `Golang` 中，我们能用 `println` 打印信息，同样也可以使用 `fmt.Println` 打印信息，那这两者到底有什么不同呢？

在 `Stackoverflow` 的一个[回答](https://stackoverflow.com/a/14680373)中我们得知了答案。

> `println` is an built-in function (into the runtime) which may eventually be removed, while the fmt package is in the standard library, which will persist. See the spec on that topic.
>
> For language developers it is handy to have a `println` without dependencies, but the way to go is to use the `fmt` package or something similar (`log` for example).
>
> As you can see in the implementation the `print(ln)` functions are not designed to even remotely support a different output mode and are mainly a debug tool.

`println` 是 `Go` 运行时[内建](https://go.dev/ref/spec#Bootstrapping)的方法，但 `fmt` 这是 Go 团队实现的一个标准库输入输出库。在文档中也指出，这些内建的方法 Go 团队并不保证它们会一直呆在运行时里，极端而言，未来这些函数*可能*会被移除。因此，在生产环境中，我们应该依赖于更稳定，且更强大的 `fmt` 在处理（格式化）各种 I/O。当然，如果只是临时使用，或者是 `debug` 需求，我们也可以放心的使用 `println`。

## 强大的[`fmt`](https://pkg.go.dev/fmt#Println)

上一章节中提到，`fmt` 更为的强大。我们可以把它先拆分成两部分来看

### 1. Output

主要（常用）的方法:

- Print, Printf, Println
- Sprint, Sprintf, Sprintln

`Print`方法输出到默认的`io.Writer`，一般是`console`

`Sprint`方法输出到运算符，或者返回值

```go
package main

import (
	"fmt"
	"io"
	"os"
)

func main() {
	const name, age = "Kim", 22
	s := fmt.Sprint(name, " is ", age, " years old.\n")

}
```

对于各种函数，一般而言都有三种不同的实现，分别是`默认（无尾缀）`，`格式化（尾缀为f）`，`行打印(尾缀为ln)`。`默认` 和 `行打印` 都比较好理解。
`格式化`打印这是根据输入的特殊符号(specifier)，打印出特定的信息。

```go
package main

import (
	"fmt"
)

func main() {
	const name, age = "Kim", 22
	fmt.Printf("%s is %d years old.\n", name, age)

	// It is conventional not to worry about any
	// error returned by Printf.

}
```

#### 特殊符号

| 符号 | 说明                                                       |
| ---- | ---------------------------------------------------------- |
| %v   | 默认值, 打印结构体时，加上`+`，如`%+v`，可打印结构体字段名 |
| %#v  | 默认值                                                     |
| %T   | 类型                                                       |
| %%   | 百分号                                                     |

[更多符号](https://pkg.go.dev/fmt#Printf)

### 2. Input

主要方法：

- Scan, Scanf, Scanln
- Sscan, Sscanf, Sscanln

### 一些特殊的方法

以大 `F` 开头的方法，比如 `Fprint` 是指可以自行指定函数 `io.Writer` 或者 `io.Reader` 的方法。
