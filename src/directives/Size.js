/**
 * @type {String}
 * @global 工具style标签的ID
 */
const id = 'global'
/**
 * @type {String}
 * @global 默认单位
 */
const unix = 'rem'
/**
 * @type {Number}
 * @global 基准值
 */
const baseSize = 25
/**
 * @type {Number}
 * @global 计算后的rem保留几位小数
 */
const decimal = 2

/**
 * @global 匹配规则
 * @type {Object}
 * @key 自定义缩写css属性全称为class名前缀
 * @value css属性全称
 */
const rules = {
  tx: 'font-size',
  lh: 'line-height',
  pd: 'padding',
  'pd-x': ['padding-left', 'padding-right'],
  'pd-y': ['padding-top', 'padding-bottom'],
  'pd-t': 'padding-top',
  'pd-l': 'padding-left',
  'pd-b': 'padding-bottom',
  'pd-r': 'padding-right',
  mg: 'margin',
  'mg-x': ['margin-left', 'margin-right'],
  'mg-y': ['margin-top', 'margin-bottom'],
  'mg-t': 'margin-top',
  'mg-l': 'margin-left',
  'mg-b': 'margin-bottom',
  'mg-r': 'margin-right'
}

// 存放已生成的class，减少每次获取消耗的性能
window.cssTxt = ''

/**
 * @method 判断class名是否存在
 * @param {String} className - class名称
 * @returns {Boolean}
 */
function checkDuplicate(className) {
  return window.cssTxt?.indexOf(className) === -1
}

/**
 * @method 添加class到style标签
 * @param {String} cssText - class样式
 */
function addCss(cssText) {
  // 获取id为utils-css的dom
  const cssObj = document.getElementById(id)
  if (cssObj) {
    cssObj.innerHTML = cssText
  } else {
    // 创建一个style元素
    const style = document.createElement('style')
    // 获取head元素
    const head = document.head || document.getElementsByTagName('head')[0]
    // 设置style的type，否则在ie中不起作用
    style.type = 'text/css'
    // 设置style元素的id
    style.id = id
    style.innerHTML = cssText
    // 把创建的style元素插入到head中
    head.appendChild(style)
  }
}

/**
 * @method 判断是否为某个类型
 * @param {any} value - 参数
 * @param {String} type - 类型
 * @returns {Boolean}
 */
function isType(value, type) {
  return Object.prototype.toString.call(value) === `[object ${type}]`
}

/**
 * @method 生成css样式
 * @param {String} name - class名称
 * @param {String|Array} property - css属性名称
 * @param {String|Number} value - 属性值
 * @returns {String}
 */
function createCss(name, property, value) {
  let txt = `.${name}{`
  if (isType(value, 'String')) value = Number(value.replace(/[^\d]+/g, ''))
  if (unix == 'rem') {
    // 计算出rem值
    value = value / baseSize
    // 获取保留的小数位倍数
    const d = Math.pow(10, decimal)
    // 不进行四舍五入
    value = Math.floor(value * d) / d
    // 转成字符串类型，防止出现精度丢失问题
    value = value.toFixed(decimal)
  }
  if (isType(property, 'String')) {
    txt += `${property}:${value}${unix};`
  } else if (isType(property, 'Array')) {
    for (let index = 0, len = property.length; index < len; index++) {
      const element = property[index]
      txt += `${element}:${value}${unix};`
    }
  }
  txt += '}'
  return txt
}

/**
 * @method 生成
 * @param {String} prefix - 前缀
 * @param {String|Number} value - 值
 * @returns {{ className: string, cssText: string}}
 */
function create(prefix, value) {
  if (isType(value, 'Number')) value = value.toString()
  const className = `${prefix}-${value.replace(/[^\d]+/g, '')}`
  let cssText = ''
  if (checkDuplicate(className)) {
    cssText = createCss(className, rules[prefix], value)
  }
  return { className, cssText }
}

/**
 * @directive 绑定class，全局没有该class则生成
 */
const Size = {
  bind(el, { value, arg }) {
    // class变量数组
    let classNameList = []
    // class变量数组长度
    let classNameLength = 0
    // 生成的样式字符串
    let cssText = ''
    if (isType(value, 'String') || isType(value, 'Number')) {
      if (rules?.[arg]) {
        const res = create(arg, value)
        classNameLength = classNameList.push(res.className)
        cssText = res.cssText
      }
    } else if (isType(value, 'Object')) {
      if (value.name && value.val && rules?.[value.name]) {
        const res = create(value.name, value.val)
        classNameLength = classNameList.push(res.className)
        cssText = res.cssText
      } else {
        const keys = Object.keys(value)
        for (let index = 0, len = keys.length; index < len; index++) {
          let key = keys[index]
          if (rules?.[key]) {
            const res = create(key, value[key])
            classNameLength = classNameList.push(res.className)
            cssText += res.cssText
          }
        }
      }
    } else if (isType(value, 'Array')) {
      for (let i = 0, len = value.length; i < len; i++) {
        const element = value[i]
        if (element.name && element.val && rules?.[element.name]) {
          const res = create(element.name, element.val)
          classNameLength = classNameList.push(res.className)
          cssText += res.cssText
        } else {
          const keys = Object.keys(element)
          for (let j = 0, len = keys.length; j < len; j++) {
            let key = keys[j]
            if (rules?.[key]) {
              const res = create(key, element[key])
              classNameLength = classNameList.push(res.className)
              cssText += res.cssText
            }
          }
        }
      }
    }
    if (classNameLength) {
      for (let index = 0; index < classNameLength; index++) {
        el.classList.add(classNameList[index])
      }
    }
    if (cssText) {
      window.cssTxt += cssText
      addCss(window.cssTxt)
    }
  }
}

export default Size
