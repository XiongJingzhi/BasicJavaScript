触发事件，一定在wait之后执行，如果wait内又触发，则以下一次事件时间为准

``` javascript
// 防抖函数 v0.1， 效果 wait内 不再触发，才触发时间，不然重新计时
function debounce(func, wait) {
  let timeout
  return function() {
    clearTimeout(timeout)
    timeout = setTimeout(func, wait)
  }
}
```
``` javascript
// v0.2 this指针
function debounce(func, wait) {
  let timeout
  return function() {
    clearTimeout(timeout)
    timeout = setTimeout(func.bind(this), wait)
  }
}
```
``` javascript
// v0.3 绑定事件参数
function debounce(func, wait) {
  let timeout
  return function() {
    clearTimeout(timeout)
    timeout = setTimeout(func.bind(this, ...arguments), wait)
  }
}
```
``` javascript
// v0.4 立刻执行函数，效果如果立即启动，则wait以后，才能第二次触发
function debounce(func, wait, immediate) {
  // 通过闭包，把timeout缓存
  let timeout
  return function() {
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      // wait内已经触发了，不再执行
      if (!timeout) {
        func.apply(this, arguments)
      }
      // 设置超时时间, 超时则清掉timeout
      timeout = setTimeout(function() {
        timeout = null
      }, wait)
    } else {
      timeout = setTimeout(func.bind(this, ...arguments), wait)
    }
  }
}
```
``` javascript
// v0.5 带返回值
function debounce(func, wait, immediate) {
  let timeout, result
  return function() {
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      // wait内已经触发了，不再执行
      if (!timeout) {
        result = func.apply(this, arguments)
      }
      // 设置超时时间, 超时则清掉timeout
      timeout = setTimeout(function() {
        timeout = null
      }, wait)
    } else {
      timeout = setTimeout(func.bind(this, ...arguments), wait)
    }
    return result
  }
}
```
``` javascript
// v0.6 取消触发
function debounce(func, wait, immediate) {
  let timeout, result
  var debounced = function() {
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      // wait内已经触发了，不再执行
      if (!timeout) {
        result = func.apply(this, arguments)
      }
      // 设置超时时间, 超时则清掉timeout
      timeout = setTimeout(function() {
        timeout = null
      }, wait)
    } else {
      timeout = setTimeout(func.bind(this, ...arguments), wait)
    }
    return result
  }
  debounced.cancel = function() {
    clearTimeout(timeout)
    timeout = null
  }
  return debounced
}
```