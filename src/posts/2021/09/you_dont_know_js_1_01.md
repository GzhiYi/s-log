---
title: 观后笔记-你不知道的JavasSript-上-01
description: 你不知道的Javascri上册的一些内容记录，仅仅是记录自己所不是很明确但确实是有启发的内容点
keywords: 你不知道的Javscript，you don't know javascript，笔记，记录，读书感
labels: [前端]
date: 2021-09-16 21:10:58
---

记录一些读书的小点，这些是在自己翻阅书本后觉得可能对自己有帮助的情况下所写下来的内容，并不适用于任何人理解和肯定。

### 自执行函数IIFE

```js
(function funName() {})()
```

具备将变量包裹起来的能力。另外可以当作函数调用并传递参数进去。

```js
const name = 'GzhiYi'
(function IIFE(global) {
  const name = 'Not Me'
  console.log(name) // Not me
  console.log(global.name) // GzhiYi
})
console.log(name) // GzhiYi
```

### with和try/catch都可以创建一个块作用域

用with关键词从对象中跟创建出的作用域仅在with声明中而非外部作用域中有效。

try/catch中的`catch`分句会创建一个块作用域，其中所声明的变量仅在catch内部有效。

```js
try {
  // trigger error!
} catch(error) {
  console.log(error) // error info
}
console.log(error) // ReferenceError: err not found
```

### 没定义的变量RHS查询一定错误吗？

例子：

```js
a = 2;
var a;
console.log(a) // 2

// 另外
console.log(b)
var b = 2
// 你可能认为会输出2或者ReferenceError，实际上输出undefined
```

**包括变量和函数在内的所有生命都会在任何代码被执行前被处理。**