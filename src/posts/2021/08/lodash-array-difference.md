---
title: lodash数组中difference方法
description: lodash中difference、differenceBy、differenceWith方法的使用以及分析
keywords: lodash，difference，differenceBy，differenceWith，数组，源码分析,每天一个lodash函数
labels: [lodash]
date: 2021-08-06 18:21:57
---

## Difference

创建一个具有唯一array值的数组，每个值不包含在其他给定的数组中。（注：即创建一个新数组，这个数组中的值，为第一个数字（array 参数）排除了给定数组中的值。）该方法使用SameValueZero做相等比较。结果值的顺序是由第一个数组中的顺序确定。

```javascript
_.difference([3, 2, 1], [4, 2])
// [3, 1]
```
### 理解

对这个用法，可以理解为抽出属于第一个参数而不属于第二个参数的值。

其中有一个SamealueZero的匹配规则，大致的规则如下：
例如比较x、y
1. 如果x与y不同，返回false
2. 如果x为数值，则
  - 如果x是NaN，y也是NaN，返回true
  - 如果x是-0，y是+0，返回true


### 源码

```javascript
var difference = baseRest(function(array, values) {
  return isArrayLikeObject(array)
    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
    : [];
});
```

这函数调用的起飞阿，我分析lodash函数的代码，还得刨到底。

#### baseRest

```javascript
 /**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}
```