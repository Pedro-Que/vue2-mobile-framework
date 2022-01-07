import { Toast } from 'vant'

/**
 * 点击复制
 */
export default {
  bind(el, { value }) {
    el.$value = value
    el.handler = () => {
      // 值为空的时候，给出提示。
      if (!el.$value) return Toast('无复制内容')
      // 动态创建 input 标签
      const input = document.createElement("input")
      // 将该 input 设为 readonly 防止 iOS 下自动唤起键盘
      input.setAttribute("readonly", true)
      // 将要 copy 的值赋给 input 标签的 value 属性
      input.setAttribute("value", el.$value)
      // 将 input 插入到 body 中
      document.body.appendChild(input)
      // 选中值并复制
      input.select()
      input.setSelectionRange(0, input.value.length)
      const result = document.execCommand("copy")
      if (result) {
        Toast.success('复制成功')
      } else {
        Toast.fail('复制失败')
      }
      document.body.removeChild(input)
    }
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener('click', el.handler)
  },
  // 当传进来的值更新的时候触发
  componentUpdated(el, { value }) {
    el.$value = value
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind(el) {
    el.removeEventListener('click', el.handler)
  },
}
