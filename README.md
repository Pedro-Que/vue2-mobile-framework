# vue2-mobile-framework

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

```
vue2-mobile-framework/
├─ babel.config.js ........Babel插件的配置
├─ jsconfig.json ..........指定根目录和JavaScript服务提供的功能选项
├─ LICENSE ................使用 AFL-3.0 开源许可协议
├─ package.json ...........项目的配置
├─ README.md ..............项目的描述
├─ vue.config.js ..........webpack的配置
└─ src/ ...................项目根目录
   ├─ App.vue .............主文件
   ├─ config.less .........全局less文件
   ├─ main.js .............入口文件
   ├─ vant.js .............vant-ui的引用文件
   ├─ api/ ................项目使用api的存放目录
   │  └─ user.js ..........用户相关的api文件
   ├─ assets/ .............公共静态资源文件
   │  └─ logo.png .........项目logo图片
   ├─ components/ .........公共组件
   │  └─ Loading.vue ......loading组件
   ├─ directives/ .........公共指令
   │  ├─ Copy.js ..........复制指令
   │  └─ Size.js ..........绑定class，全局没有该class则生成
   ├─ i18n/ ...............多语言相关文件
   │  ├─ en.js ............英文相关的配置
   │  ├─ index.js .........多语言配置文件
   │  ├─ zh.js ............中文相关的配置
   │  ├─ en/ ..............英文相关的语言信息目录
   │  └─ zh/ ..............中文相关的语言信息目录
   ├─ router/ .............路由文件
   │  └─ index.js .........路由配置文件
   ├─ server/ .............服务文件
   │  └─ index.js .........服务配置文件
   ├─ store/ ..............Vue.js 应用程序开发的状态管理模式
   │  ├─ index.js .........状态管理模式配置文件
   │  └─ modules/ .........多模块存放目录
   ├─ utils/ ..............工具目录
   └─ views/ ..............页面目录
```
