import Layout from '@/layout'
// 路由规则
export default {
    path: '/approvals', //路由地址
    name: 'approvals',
    component: Layout,
    // 配置二级路的路由表
    children: [{

        path: '',
        component: () =>
            import ('@/views/approvals'),
        meta: {
            title: '审批'
        }
    }]
}