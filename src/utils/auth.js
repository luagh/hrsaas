import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ihrm-token' // 设定一个独一无二的key
const timekey = 'hrsaas-timestamp-key' //设置一个独一无二的key

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}
// 获取时间戳
export function getTimeStamp() {
    return Cookies.get(timekey)
}

// 设置时间戳
export function setTimeStamp() {
    Cookies.set(timekey, Date.now())
}