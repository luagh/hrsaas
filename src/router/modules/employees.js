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
            import('@/views/employees'),
        meta: {
            title: '员工管理',
            icon: 'people'
        }
    },
    {
        path: 'detail/:id', // query传参 动态路由传参
        component: () => import('@/views/employees/detail'),
        hidden: true, // 不在左侧菜单显示
        meta: {
            title: '员工详情' // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
        }
    }
    ]
}