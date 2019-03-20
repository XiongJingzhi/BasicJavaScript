## Array

### 属性

  - Array.length
  - Array.prototype
  - Array.prototype[@@unscopables]

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
  - Array.prototype.concat(valueN) 用于合并两个或多个（数组或值）, 函数式
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
  - Array.prototype.copyWithin(target, start, end) 复制数组的一部分到同一数组中的另一个位置, 并返回它, 修改了原数组
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