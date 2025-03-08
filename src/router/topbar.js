// topbar跳转路由
// import { createMemoryHistory, createRouter } from 'vue-router'

export default [
    {
      path: '/follow',
      name: 'follow',
      component: () => import('../components/topBar/Follow'),
    },
    //同城
    {
        path: '/cityWide', component: () => import('../components/topBar/CityWide')
    },
    //美食路由 
    {
     path: '/fineFood', component: () => import('../components/topBar/FineFood')
    }

  ];

