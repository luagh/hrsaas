//引入utils里的token方法
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
// 状态
const state = {
        token: getToken() //设置token.为共亭状态初始化vuex的时候就先从缓存中读取
    }
    // 修改状态
const mutations = {
        setToken(state, token) {
            state.token = token
            setToken(token) // vuex和 缓存数据的同步
        },
        // 删除缓存
        removeToken(state) {
            state.token = null, // 删除vuex的token
                removeToken() // 先清除 vuex  再清除缓存 vuex和 缓存数据的同步
        }
    }
    // 执行异步
const actions = {
    async login(context, data) {
        const result = await login(data)
            // axios默认给数据加了一层data

        // 表示登录接口调用成功 也就是意味着你的用户名和密码是正确的
        // 现在有用户token
        // actions 修改state 必须通过mutations
        context.commit('setToken', result)

    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}