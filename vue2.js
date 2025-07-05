const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
  },
}

let v = obj.a;
// Object.defineProperty劫持对象的属性,转换为相应的get和set,
// 当读取或写入对象的属性时,会触发相应的get和set方法
// 然而,vue2中,劫持的是对象的属性,而不是对象本身
// 所以,当插入或者删除对象的属性时,不会触发相应的get和set方法
function _isObject(val) {
  return typeof val === 'object' && val !== null
}

function observe(obj) {
  for (let k in obj) {
    let v = obj[k];
    if (_isObject(v)) { // 如果v是对象,则递归劫持
      observe(v)
    }
    Object.defineProperty(obj, k, {
      get(val) {
        console.log('读取', k, v)
        return v
      },
      set(val) {
        console.log('更新', k, val)
        v = val
      },
    })
  }
}

observe(obj)

obj.a;
obj.a = 10;
obj.c.d;
obj.f = 4;