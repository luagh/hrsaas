import Layout from '@/layout'
// 路由规则
export default {
    path: '/salarys', //路由地址
    name: 'salarys',
    component: Layout,
    // 配置二级路的路由表
    children: [{

        path: '',
        component: () =>
            import ('@/views/salarys'),
        meta: {
            title: '工资'
        }
    }]
}