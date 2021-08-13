---
title: css揭秘的小笔记
description: css揭秘的小笔记
keywords: css，ccs揭秘
labels: [css]
date: 2021-08-13 08:21:52
---

### 想清楚哪些是改动多，哪些是改动少的

```css
.btn {
  font-size: 20px;
  line-height: 30px;
}
```

当某些值相互依赖时，应该把它们的相互关系用代码表述出来，以便于维护。

```css
.btn {
  font-size: 20px;
  line-height: 1.5; // 行高是字号的1.5倍
}
```

### 代码量少 < 代码易维护

```css
border-width: 10px 10px 10px 0;

// better

border-width: 10px;
border-left: 0;
```