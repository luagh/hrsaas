import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css 全局样式
import Component from '@/components'
import App from './App'
import store from './store'
import router from './router'
import * as directives from '@/directives'
import * as filters from '@/filters' // 引入工具类
import CheckPermission from '@/mixin/checkPermission'
import '@/icons' // icon
import '@/permission' // permission control

// 注册自定义指令
// 遍历所有的导出的指令对象 完成自定义全局注册
Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key])
})
Object.keys(filters).forEach(key => {
    // 注册过滤器
    Vue.filter(key, filters[key])
})
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.mixin(CheckPermission)
Vue.config.productionTip = false
Vue.use(Component)
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
