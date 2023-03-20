import router from '@/router' //权限拦截在路由跳转导航守卫
import store from '@/store'
import nprogress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

const whiteList = ['/login', '/404']; // 定义白名单
// 路由的前置守卫
router.beforeEach(async(to, from, next) => {
        nprogress.start()
        if (store.getters.token) {
            if (to.path === '/login') {
                next('/') //跳到主页
            } else {
                //只有放过的时候才去获取用户资料
                //是每次都获取吗
                //如果当前vuex中有用户的资料的id表示已经有资料了不需要获取了如果没有id才需要获取
                if (!store.getters.userId) {
                    await store.dispatch('user/getUserInfo')
                }
                next()
            }
        } else {
            if (whiteList.indexOf(to.path) > -1) {
                next()
            } else {
                next('/login')
            }

        }
        nprogress.done()
    })
    // 后置守卫
router.afterEach(function() {
    nprogress.done()
})