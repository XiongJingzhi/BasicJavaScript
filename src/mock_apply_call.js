// apply call 用来改变函数this指向
var foo = {
  name: 'xx',
  age: 14
}

function bar(aa, bb) {
  console.log(this.name)
  console.log(aa)
  console.log(bb)
}

bar.call(foo)

Function.prototype.mycall = function(obj) {
  obj.fn = this
  var arg = []
  for (let index = 1; index < arguments.length; index++) {
    arg.push(arguments[index])
  }
  obj.fn(...arg)
  delete obj.fn
}

Function.prototype.myapply = function(obj) {
  obj.fn = this
  var arg = []
  for (let index = 1; index < arguments.length; index++) {
    arg.push(arguments[index])
  }
  obj.fn(...arg)
  delete obj.fn
}

bar.myapply(foo, 1, 2)
bar.mycall(foo, 1, 2)
console.log('git hook test')
