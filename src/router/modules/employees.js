import Layout from '@/layout'
// 路由规则
export default {
    path: '/employees', //路由地址
    name: 'employees',
    component: Layout,
    // 配置二级路的路由表
    children: [{

        path: '',
        component: () =>
            import ('@/views/employees'),
        meta: {
            title: '员工管理'
        }
    }]
}