## 限流

原理： 如果你持续触发事件，每隔一段时间，只执行一次事件。

``` javascript
// v1 时间戳, 第一次会立刻执行，第二次事件wait后执行，停止触发后不会再执行
function throttle(func, wait) {
  let context, args
  let previous = 0
  return function() {
    // 第二次进入是，如果 previous 为上次的now时间，需要一直超过时间，才能触发
    const now = +new Date()
    context = this
    args = arguments
    if (now - previous > wait) {
      func.apply(context, args)
      previous = now
    }
  }
}

// v2 使用定时器， 第一次经过wait时间后才会执行，第二次wait后执行，停止触发后还会执行一次
function throttle(func, wait) {
  let timeout
  return function() {
    const context = this
    const args = arguments
    if (!timeout) {
      timeout = setTimeout(function() {
        timeout = null
        func.apply(context, args)
      }, wait)
    }
  }
}

// v3 鼠标移入能立刻执行，停止触发的时候还能再执行一次
function throttle(func, wait) {
  let timeout, context, args
  let previous

  const later = function() {
    previous = +new Date()
    timeout = null
    func.apply(context, args)
  }

  var throttled = function() {
    // 每次进入，先检测剩余时间
    const now = +new Date()
    const remaining = wait - (now - previous)
    const context = this
    const args = arguments
    // 如果没有剩余的时间了或者你改了系统时间
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(context, args)
    } else if (!timeout) {
      timeout = setTimeout(later, remaining)
    }
  }
  return throttled
}

// 第四版
// leading：false 表示禁用第一次执行
// trailing: false 表示禁用停止触发的回调

function throttle(func, wait, options) {
  var timeout, context, args
  var previous = 0
  if (!options) options = {}

  var later = function() {
    previous = options.leading === false ? 0 : new Date().getTime()
    timeout = null
    func.apply(context, args)
    if (!timeout) context = args = null
  }

  var throttled = function() {
    var now = new Date().getTime()
    if (!previous && options.leading === false) previous = now
    var remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
  }

  throttled.cancel = function() {
    clearTimeout(timeout)
    previous = 0
    timeout = null
  }

  return throttled
}
```