/**
 * 修改页面title
 * @param {String} title
 */
export const setTitle = title => {
  title = (title ? title + ' - ' : '') + '梦兮工作室'
  window.document.title = title
}

/**
 * @method 获取指定目录下所有的文件返回一个对象
 * @param {Array} files 指定目录下所有文件的对象
 */
export const getModule = files => {
  if (!files) return
  return files.keys().reduce((modules, modulePath) => {
    // 获取名字
    const name = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1').split('/')[0]
    // 获取配置
    const value = files(modulePath)
    modules[name] = value.default || value
    return modules
  }, {})
}
