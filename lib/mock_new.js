"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldGet(receiver, privateMap) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } var descriptor = privateMap.get(receiver); if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// es5
function Aa(a, b) {
  this.a = a;
  this.b = b;
  var name = 'Aa';

  Aa.prototype.say = function () {
    console.log('say', name, this.a, this.b);
  };
}

var a = new Aa(1, 's');
a.say(); // mock implementation

function objectFactory() {
  var obj = Object.create({}); // 把like-array第一个shift出来

  var Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  var ret = Constructor.apply(obj, arguments);
  return _typeof(ret) === 'object' ? ret : obj;
} // 构造函数


function Otaku(name, age) {
  this.name = name;
  this.age = age;
  this.habit = 'Games';
}

Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
  console.log('I am ' + this.name);
};

var person = objectFactory(Otaku, 'Kevin', '18');
console.log('person', person); // es6

var Bb =
/*#__PURE__*/
function () {
  _createClass(Bb, null, [{
    key: "initPool",
    value: function initPool() {
      return 1111;
    }
  }]);

  function Bb(a, b) {
    _classCallCheck(this, Bb);

    _name.set(this, {
      writable: true,
      value: 'world'
    });

    this.a = a;
    this.b = b;
  }

  _createClass(Bb, [{
    key: "say",
    value: function say() {
      console.log('say', _classPrivateFieldGet(this, _name), this.a, this.b, Bb.initPool());
    }
  }, {
    key: "getName",
    value: function getName() {
      return _classPrivateFieldGet(this, _name);
    }
  }]);

  return Bb;
}();

var _name = new WeakMap();

var b = new Bb(1, 's');
b.say();
console.log(b.getName());