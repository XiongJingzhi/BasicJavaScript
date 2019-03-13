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

String 的意义并非“字符串”，而是字符串的 UCS-2（已被UTF16合并） 编码,

UTF16编码分两种： U+000~U+FFFF: 2 Byte存储(BMP);  U+10000~U+10FFFF: 4 Byte存储（SMP);

它是一组16位的无符号整数值的“元素”, 也就意味着，它采用2 Byte存储, 其最大长度为2^53 - 1

### Number

Number类型表示我们通常意义上的“数字”。

表示64 位二进制格式的值（-(2^63 -1) 到 2^63 -1）的有理数。值共有（2^64-2^53+3)种，NaN，占用了 9007199254740990， Infinity，无穷大， -Infinity，负无穷大

有效的整数范围是-0x1fffffffffffff至0x1fffffffffffff(-2^53~2^53(不包含边界))

浮点运算 正确的比较方法是使用JavaScript提供的最小精度值：Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON

### Symbol

符号类型值，一切非字符串的对象key的集合

Symbol  dynamically produces an anonymous, unique value. 声明时提供匿名唯一的值，但是可以具有字符串类型的描述，

所以即使描述相同，Symbol也不相等 Symbol("my symbol") === Symbol("my symbol") // return false

Well-known symbols， 类数组对象的[Symbol.iterator]属性， [Symbol.search] for string objects

### Object

对象的定义是“属性的集合”。属性分为数据属性和访问器属性，二者都是key-value结构，key可以是字符串或者 Symbol类型。

JavaScript 中的“类”仅仅是运行时对象的一个私有属性constructor或原型链指向，而JavaScript中是无法自定义类型的。

JavaScript 中的几个基本类型，在Object中都相近的内置对象

  - Number
  - String
  - Boolean
  - Symbol

比如new Number(3)和3， 它们一个是 Number 类型， 一个是对象类型。

同时Number、String和Boolean，三个构造器是两用的，当跟 new 搭配时，它们产生对象，当直接调用时，它们表示强制类型转换。

Symbol 函数比较特殊，直接用 new 调用它会抛出错误，但它仍然是 Symbol 对象的构造器。

基本类型并不具有对象的性质，为了让基本类型也具有对象的特征，就出现了包装类型, 也就是Number、String、Boolean、Symbol等

 - 装箱就是  自动将包装器类型转换为基本数据类型
 - 拆箱就是  自动将包装器类型转换为基本数据类型

我们日常代码可以把对象的方法在基本类型上使用，比如：

``` javascript
console.log('abc'.charAt(0)) // return a
```

在 Symbol 原型上添加了hello方法，在任何 Symbol 类型变量都可以调用。

``` javascript
Symbol.prototype.hello = () => console.log('hello')
var a = Symbol('a')
a.hello() // hello, 有效
console.log(typeof a) // symbol， 并非对象
```

出现这种现象的原因， . 点运算符operator自动把基本类型 进行了自动装箱autoboxing。

### 类型转换

禁止使用==进行比较， 这属于设计失误

|  | Null | Undefined | Boolean(true) | Boolean(false) | Number | String | Symbol | Object |
| ------ | :------: | :------: | :------: | :------: | :------: | :------: | :------: | :------: |
| Boolean | false | fasle | true | false | 0/NaN: false | "": false | true | true|
| Number | 0 | NaN | 1 | 0 | - | [StringToNumber](#StringToNumber) | TypeError | [拆箱转换](#拆箱转换)
| String | "null" | "undefined" | "true" | "false" | [NumbertoString](#NumbertoString) | - | TypeError | [拆箱转换](#拆箱转换)
| Object | TypeError | TypeError | [装箱转换](#装箱转换) | [装箱转换](#装箱转换) | [装箱转换](#装箱转换) | [装箱转换](#装箱转换) | [装箱转换](#装箱转换) | -

#### StringToNumber
``` javascript
/* 隐式转换即是调用了Number转换 */
+'11'    // return 11
+'0b11'  // return 3
+'0o11'  // return 9
+'0x11'  // return 17 
+'fasd'  // return NaN
+'1e+2'   // return 100
+'-1e-2' //return -0.01
/* 上式全部等价与 Number(value) */
```
多数情况下，Number 是比 parseInt 和 parseFloat 更好的选择。

#### StringToNumber

数字到字符串的转换是完全符合你直觉的十进制表示.

当Number绝对值较大或者较小时，字符串表示则是使用科学计数法表示的, chrome上Sring(number)，大概是1e+21使用科学计数法

#### 装箱转换

每一种基本类型Number、String、Boolean、Symbol在对象中都有对应的类，所谓装箱转换，正是把基本类型转换为对应的对象，它是类型转换中一种相当重要的种类。

call本身会产生装箱操作，所以需要配合 typeof 来区分基本类型还是对象类型。
``` javascript
var a = Symbol('a')
console.log(Object.prototype.toString.call(a)) // "[object Symbol]"
typeof a // "symbol"
/**
 * judge a value of type
 * 
 * @param {any}
 * @returns {string} if it's primate type, return lower case, else upper case
 * @example
 *
 */
function typeJudge(value) {
  const originJudge = typeof value
  if (originJudge !== 'object') {
    return originJudge
  } else {
    let typeKey = Object.prototype.toString.call(value)
    return /^(\[object )([a-zA-Z]+)\]$/.exec(typeKey)[2]
  }
}
```

#### 拆箱转换

在JavaScript标准中，规定了 ToPrimitive 函数，它是对象类型到基本类型的转换, Unboxing

对象到 String 和 Number 的转换都遵循“先拆箱再转换”的规则

``` javascript
var a = {a: 1}
// a.__proto__ 指向 Object.prototype, 有toString，与valueOf方法
a + 1 // 先调用valueOf， 再调用toString， 最后由String
```
