import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
import { getTimeStamp } from '@/utils/auth'
const TimeOut = 3600 // 定义超时时间

const service = axios.create({
        baseURL: process.env.VUE_APP_BASE_API, // 设置axios请求的基础的基础地址
        timeout: 5000 // 定义5秒超时
    })
    //请求拦截器
service.interceptors.request.use(config => {
    // 只有在有token的情况下 才有必要去检查时间戳是否超时
    if (store.getters.token) {
        //检查时间戳是否超时
        if (IsCheckTimeOut()) {
            // 如果它为true表示 过期了
            // token没用了 因为超时了
            store.dispatch('user/logout') // 登出操作
            router.push('/login') // 跳到登录
            return Promise.reject(new Error('token超时了'))
        }

        config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
        // axios默认加了一层data
        const { success, message, data } = response.data
            //   要根据success的成功与否决定下面的操作
        if (success) {
            return data
        } else {
            // 业务已经错误了 还能进then ? 不能 ！ 应该进catch
            Message.error(message) // 提示错误消息
            return Promise.reject(new Error(message))
        }
    }, error => {
        // 当等于10002的时候表示token超时了
        if (error.response && error.response.data && error.response.data.code === 10002) {
            store.dispatch('user/logout')
            router.push('/login')
        } else {
            Message.error(error.message) // 提示错误信息
        }


        return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
    })
    //是否超时
function IsCheckTimeOut() {
    var currentTime = Date.now() // 当前时间戳
    var timestamp = getTimeStamp() // 缓存时间戳
    return (currentTime - timestamp) / 1000 > TimeOut
}
export default service