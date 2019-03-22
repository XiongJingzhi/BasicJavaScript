## Array

### 属性

  - Array.length
  - Array.prototype
  - Array.prototype[@@unscopables]
  
### 方法分类
  - 返回 修改了的原数组
  - 返回 新数组
  - 放回 iterator 对象

### 方法

  - Array.from 静态方法 从一个类似数组或可迭代对象中创建一个新的数组实例， 同时可以通过mapFn加工迭代子项
  ``` javascript
   function arrayFrom(arrayLike, mapFn, thisArg) {
     let arr = []
     thisArg = thisArg || this
     mapFn = mapFn || null

     for (let i = 0; i < arrayLike.length; ++i) {
       let item = arrayLike[i]
       if (mapFn) {
          item = mapFn.call(thisArg, item)
       }
       arr[i] = item
     }
     return arr
   }
  ```
  - Array.isArray 静态方法 用于确定传递的值是否是一个 Array
  ``` javascript
    function isArray(obj) {
      let reg = /\[object Array\]/
      let res = Object.prototype.toString.call(obj)
      return reg.test(res)
    }
  ```
  - Array.of 静态方法 创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型 与Array(num) 直接返回数量为num的空数组不同
  ``` javascript
    function arrayOf() {
      let res = []
      for (let i = 0; i < arguments.length; ++i) {
        res[i] = arguments[i]
      }
      return res
    }
  ```
  - Array.prototype.concat(valueN) 用于合并两个或多个（数组或值）, return new_array
  ``` javascript
    function contact(old_array) {
      let res = old_array
      for (let i = 1; i < arguments.length; ++i) {
        let newIndex = res.length
        if (isArray(arguments[i])) {
          for (let j = 0; j < arguments[i].length; ++j) {
            res[newIndex+j] = arguments[i][j]
          }
        } else {
          res[newIndex] = arguments[i]
        }
      }
      return res
    }
  ```
  - Array.prototype.copyWithin(target[, start[, end]]) return old_array 
  ``` javascript
    function push(array, item) {
      array[array.length] = item
      return array
    }
    function slice(array, start, end){
      let res = []
      end = end > array.length ? array.length : end
      for (let i = start; i < end; ++i) {
        push(res, array[i])
      }
      return res
    }
    function copyWithin(old_array, target, start, end) {
      if (target > old_array.length) return old_array
      let arr = slice(old_array, start, end)
      for (let i = 0; i < arr.length; ++i) {
        if (target + i > old_array.length - 1) break
        old_array[target+i] = arr[i]
      }
      return old_array
    }
  ```
  - Array.prototype.entries  没有参数，返回可迭代对象 return new iterator object
  ``` javascript
  function makeIterator(array){
    var nextIndex = 0
    return {
      next: function() {
         return nextIndex < array.length ?
          {value: [nextIndex, array[nextIndex++]], done: false} :
          {value: undefined, done: true}
      }
    }
  }
  ```
  - Array.prototype.values()
  ``` javascript
    function arrayValues(array) {
      var nextIndex = 0
      return {
        next: function() {
          return nextIndex < array.length ?
            {value: array[nextIndex++], done: false} :
            {value: undefined, done: true}
        }
      }
    }
  ```
  - Array.prototype.key()
  ``` javascript
    function arrayValues(array) {
      var nextIndex = 0
      return {
        next: function() {
          return nextIndex < array.length ?
            {value: nextIndex++, done: false} :
            {value: undefined, done: true}
        }
      }
    }
  ```
  - Array.prototype.every(callback[, thisArg]) return boolean
  ``` javascript
    function arrayEvery(array, callback, thisArg) {
      thisArg = thisArg || this
      let res = true
      for (let i = 0, length = array.length; i < length; i++) {
        if (!callback.call(thisArg, array[i])) {
          res = false
          break
        }
      }
      return res
    }
  ```
  - Array.prototype.fill(value[, start==0[, end==this.length]]), return old_array
  ``` javascript
    function arrayfill(array, value, start, end) {
      let length = array.length
      start = start >= 0 ? start : length + start
      end = end >= 0 ? end : length + end
      for (let i = start; i < end; i++ ) {
        array[i] = value
      }
      return array
    }
  ```
  - Array.prototype.filter(callback(element[, index[, array]])[, thisArg]), return new_array if none pass, return []
  ``` javascript
    function arrayFilter(array, callback, thisArg) {
      let res = []
      for (let i = 0, length = array.length; i < length; i++) {
        if (callback.call(thisArg, array[i])) {
          res.push(array[i])
        }
      }
      return res
    }
  ```