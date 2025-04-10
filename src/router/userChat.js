// 用户消息路由
export default [
    {
      path: '/detailChat',
      name: 'DetailChat',
      component: () => import('../components/chatCommments/detailChat'),
    },
]