import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/Layout.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Layout
    },
    {
      path:'/404',
      name:'404page',
      component:import('@/views/404page/index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component:Login
    }
  ]
})

router.beforeEach((to,from,next)=>{
  const toPath=to.path;
  const token=localStorage.getItem('token')
  if(toPath==='/login'){
    return next()
  }
  if(!token){
    return next('/login')
  }else{
    next()
  }
  //路由权限校验
})

export default router
