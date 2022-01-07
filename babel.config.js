let config = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}

if (process.env.VUE_APP_DEMAND) {
  config.plugins = [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}

module.exports = config
