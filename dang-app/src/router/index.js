import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/views/layout/index'

Vue.use(Router)

export default new Router({
  routes: [
    {path:'/login',
     name:"登录",
     component: () => import('@/views/login')
  }
    ,
    {
      path: '/',
      name: '首页',
      redirect:'/users/list',
      component: layout,
      children:[
        {
          path: '/news',
          name: '新闻列表',
          component: () => import('@/views/news/list')
        },
        {
          path: '/news/add',
          name: '新闻添加',
          component: () => import('@/views/news/add')
        },
        {
          path: '/news/update',
          name: '新闻修改',
          component: () => import('@/views/news/add')
        },
        {
          path: '/category',
          name: '新闻分类',
          component: () => import('@/views/news/category')
        },
        {
          path: '/img',
          name: '轮播图管理',
          component: () => import('@/views/imgs/imgs')
        },
        {
          path: '/users/list',
          name: '用户列表',
          component: () => import('@/views/user/userList')
        },
        {
          path: '/users/add',
          name: '用户添加',
          component: () => import('@/views/user/userAdd')
        },
        {
          path: '/discuss/list',
          name: '评议列表',
          component: () => import('@/views/discuss/list')
        },
        {
          path: '/interact/list',
          name: '留言管理',
          component: () => import('@/views/interact/interact')
        },
        {
          path: '/discuss/changeSummary',
          name: '审核总结',
          component: () => import('@/views/discuss/changeSummary')
        }
    ]
    },

  ]
})
