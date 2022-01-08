import { getModule } from '@utils/index'

const en = getModule(require.context('./en', true, /\.js$/)) || {}

export default {
  name: 'EN',
  ...en
}
