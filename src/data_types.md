## 6种原始类型、和对象类型

  - Undefined
  - Null
  - Boolean
  - String
  - Number
  - Symbol
  - Object

### Undefined & Null

undefined语义上： 未定义(声明未赋值)

有的规范用void 0代替undefined，比如underscore, 原因：undefined 并不是保留词（reserved word）

在低版本IE，能被重写。es5在局部作用域中，原因：undefined还是可以被重写。

void 会return undefined，同时不能被重写的（cannot be overidden）

```
let a
```

null语义上： 定义了但是为空

null作为关键字reserved word，不可改变值

+ null 隐式转化为0， 而 + undefined 会转换为 NaN

用处： 1、作为函数的参数，表示该函数的参数不是对象。 2、作为对象原型链的终点。

```
const b = null
```
### Boolean

即 True 和 False

### String

JavaScript的字符串类型用于表示文本数据

String 的意义并非“字符串”，而是字符串的 UCS-2（已被UTF16合并） 编码, UTF16编码分两种： U+000~U+FFFF：2 Byte存储（BMP）； U+10000~U+10FFFF： 4 Byte存储（SMP)；

它是一组16位的无符号整数值的“元素”, 也就意味着，它采用2 Byte存储，

最大长度为2^53 - 1

### Number

Number类型表示我们通常意义上的“数字”。

表示64 位二进制格式的值（-(2^63 -1) 到 2^63 -1）的有理数。