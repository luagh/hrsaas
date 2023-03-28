import Layout from '@/layout'
// 路由规则
export default {
    path: '/setting', //路由地址
    name: 'setting',
    component: Layout,
    // 配置二级路的路由表
    children: [{

        path: '',
        component: () =>
            import ('@/views/setting'),
        meta: {
            title: '公司设置',
            icon: 'setting'
        }
    }]
}