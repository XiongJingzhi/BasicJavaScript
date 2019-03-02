// factory 工厂模式
function createPerson(name) {
  var o = new Object()
  o.name = name
  o.getName = function() {
    console.log(this.name)
  }

  return o
}
var factoryObject = createPerson('xxx')
factoryObject.getName()
// 缺点：对象继承，因为所有的实例都指向一个原型

// 构造函数模式
function Person(name) {
  this.name = name
  this.getName = function() {
    console.log(this.name)
  }
}

var person1 = new Person('kevin')
person1.getName()

//
