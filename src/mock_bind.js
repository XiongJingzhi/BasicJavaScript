Function.prototype.mybind = function(obj) {
  if (typeof this !== 'function') {
    throw new Error('Function.prototype.bind - what is trying to be bound is not callable')
  }
  var self = this
  var arg = [...arguments].slice(1)
  var fBound = function() {
    var args = [...arguments, ...arg]
    return self.apply(this instanceof fBound ? this : obj, args)
  }
  var fNOP = function() {}
  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()
  return fBound
}

var module = {
  x: 42,
  getX: function(a, b, c) {
    console.log(typeof a, typeof b)
    this.c = c
    return this.x + a + b
  }
}

var unboundGetX = module.getX
unboundGetX.prototype.say = function() {
  console.log(this.c)
}
var boundGetX = unboundGetX.mybind(module, 2)

var a = new boundGetX(1, 2, 3, 4)
// console.log(boundGetX(6))
console.log(a)
a.say()
