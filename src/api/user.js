import fetch from "@server/index"

/**
 * @method 登录
 * @param {Object} body - 参数对象
 * @param {String} body.username - 用户名
 * @param {String} body.password - 密码
 */
export const Login = body => fetch('/api/login', 'POST', { body })
