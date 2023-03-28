import Layout from '@/layout'
// 路由规则
export default {
    path: '/permission', //路由地址
    name: 'permission',
    component: Layout,
    // 配置二级路的路由表
    children: [{

        path: '',
        component: () =>
            import ('@/views/permission'),
        meta: {
            title: '权限管理',
            icon: 'lock'
        }
    }]
}