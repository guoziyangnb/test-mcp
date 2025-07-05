const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
  },
}

function _isObject(val) {
  return typeof val === 'object' && val !== null
}

function reactive(obj) {
  const proxy = new Proxy(obj, {
    get(target, key) {
      console.log('读取', key)
      if (_isObject(target[key])) {
        return reactive(target[key])
      }
      return target[key]
    },
    set(target, key, value) {
      if (target[key] === value) return // 如果新值和旧值相同,则不更新
      console.log('更新', key, value)
      target[key] = value
    },
  })
  return proxy
}

const proxy = reactive(obj)

proxy.a;
proxy.a = 10;
proxy.c.d;
proxy.f = 30;