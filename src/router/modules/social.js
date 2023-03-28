import Layout from '@/layout'
// 路由规则
export default {
    path: '/social', //路由地址
    name: 'social',
    component: Layout,
    // 配置二级路的路由表
    children: [{

        path: '',
        component: () =>
            import ('@/views/social'),
        meta: {
            title: '社保'
        }
    }]
}