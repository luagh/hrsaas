import Layout from '@/layout'
// 路由规则
export default {
    path: '/attendances', //路由地址
    name: 'attendances',
    component: Layout,
    // 配置二级路的路由表
    children: [{

        path: '',
        component: () =>
            import ('@/views/attendances'),
        meta: {
            title: '考勤'
        }
    }]
}