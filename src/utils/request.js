import axios from 'axios'

const service = axios.create()
service.interceptors.request.use() //请求
service.interceptors.response.use() //响应
export default service