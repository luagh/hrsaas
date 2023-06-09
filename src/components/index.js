import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'
import Print from 'vue-print-nb'
export default {
    install(Vue) {
        Vue.component('PageTools', PageTools) // 注册工具栏组件
        Vue.component('UploadExcel', UploadExcel) // 注册导入excel组件
        Vue.component('ImageUpload', ImageUpload) // 注册导入上传组件
        Vue.use(Print);//注册打印
    }
}