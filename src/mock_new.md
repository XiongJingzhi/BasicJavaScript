## new 操作符

作用：构造函数，生成对象，并把this指向这个对象。

``` javascript
// es5
function Aa(a, b) {
  this.a = a
  this.b = b
  var name = 'Aa'
  Aa.prototype.say = function() {
    console.log('say', name, this.a, this.b)
  }
}
var a = new Aa(1, 's')

a.say()

// mock implementation
function objectFactory() {
  var obj = Object.create(null)
  // 把like-array第一个shift出来
  var Constructor = [].shift.call(arguments)
  obj.__proto__ = Constructor.prototype
  var ret = Constructor.apply(obj, arguments)
  return typeof ret === 'object' ? (ret || obj) : obj
}

// 构造函数
function Otaku(name, age) {
  this.name = name
  this.age = age

  this.habit = 'Games'
}

Otaku.prototype.strength = 60

Otaku.prototype.sayYourName = function() {
  console.log('I am ' + this.name)
}

var person = objectFactory(Otaku, 'Kevin', '18')
console.log('person', person)

// es6
class Bb {
  #name = 'world'
  static initPool() {
    return 1111
  }
  constructor(a, b) {
    this.a = a
    this.b = b
  }
  say() {
    console.log('say', this.#name, this.a, this.b, Bb.initPool())
  }
  getName() {
    return this.#name
  }
}

var b = new Bb(1, 's')
b.say()
console.log(b.getName())
```