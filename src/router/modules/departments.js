import Layout from '@/layout'
// 路由规则
export default {
    path: '/departments', //路由地址
    name: 'departments',
    component: Layout,
    // 配置二级路的路由表
    children: [{

        path: '',
        component: () =>
            import ('@/views/departments'),
        meta: {
            title: '组织架构',
            icon: 'tree'
        }
    }]
}