import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/layout.vue'
import newDetail from '@/views/component/newDetail.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 全局页面静态路由
export const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/manager',
    children: [
      {
        path: "home",
        name: "home",
        meta: {
          label: "首页",
          require: true,
          icon: 'House'
        },
        component: () => import('@/views/home/index.vue')
      },
      {
        path: "configuration",
        name: 'configuration',
        meta: {
          label: "配置",
          require: true,
          icon: 'SetUp'
        },
        component: () => import('@/views/configuration/index.vue')
      },
      {
        path: "manager",
        name: "manager",
        redirect: "/manager/memberShip",
        meta: {
          label: "管理",
          require: true,
          icon: 'Tools'
        },
        children: [
          {
            path: "memberShip",
            name: "memberShip",
            meta: {
              label: "成员管理",
              require: true,
              icon: 'Stamp'
            },
            component: () => import('@/views/manager/memberShip/index.vue')
          },
          {
            path: "department",
            name: "department",
            meta: {
              label: "部门管理",
              require: true,
              icon: 'OfficeBuilding'
            },
            component: () => import('@/views/manager/department/index.vue')
          },
          {
            path: "activityManagement",
            name: "activityManagement",
            meta: {
              label: "活动管理",
              require: true,
              icon: 'AddLocation'
            },
            children: [
              {
                path: 'list',
                name: 'list',
                meta: {
                  label: '活动列表',
                  require: true,
                  icon: "AddLocation"
                },
                component: () => import('@/views/manager/activityManagement/list.vue')
              },
              {
                path: "commit",
                name: "commit",
                meta: {
                  label: "提交活动",
                  require: true,
                  icon: "AddLocation"
                },
                component: () => import('@/views/manager/activityManagement/commit.vue')
              }
            ],

          },
          
          {
            path: "news",
            name: "news",
            mate: { label: "社团新闻", required: true },
            children:[
              {
                path:"edit",
                name:"edit",
                component:()=>import('@/views/manager/news/edit.vue')
              },
              {
                path:"list1",
                name:"list1",
                component: () => import('@/views/manager/news/index.vue')
              }
            ],
            
          },

          {
            path: "newManagement",
            name: "newManagement",
            mate: { label: "招新管理", required: true },
            component: () => import('@/views/manager/newManagement/index.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/404',
    name: '404page',
    hiddent: true,
    component: () => import('@/views/404page/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    hiddent: true,
    component: Login
  },
  {
    path: '/newsDetail:nid',
    name: 'newsDetail',
    hiddent: true,
    component: newDetail,
    props:true
  },

  // 路由 首页- /home 成员管理- /memberShip 部门管理- /department 活动管理- ///activityManagement  社团新闻- /news 招新管理- /newManagement  配置- /configuration
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})


// if (!router.hasRoute()) {
//     router.addRoute({
//         path: window.location.pathname,
//         name: 'TempRoute',
//         component: Layout
//     })
// }
router.beforeEach((to, from, next) => {
  const toPath = to.path;
  NProgress.start();
  const token = localStorage.getItem('token')
  if (toPath === '/login') {
    return next()
  }
  if (!token) {
    return next('/login')
  } 
  else {
    // 如果在pinia中有动态路由数据，然后对接口返回来的路由数据
    // 比如 routeList  
    // routeList.forEach(item=>{
    //   router.addRoute('home',{
    //     path:item.url,
    //     meta:{ name:item.name,icon:item.icon },
    //     name:item.url,
    //     component:()=>import(`@/views/${item.url}`)
    //   })
    // })
    next()
  }
  //路由权限校验
})

router.afterEach(() => {
  NProgress.done();
})


export default router
