// 前端路由数据
import { defineStore } from "pinia";
import { routes } from '@/router/index.js'

export const useRoutesStore=defineStore('routes',{
  state:()=>({
    routes
  }),
  getters:{
    getHashRoutes(){
      return routes.filter((item)=>{
        return !item.hiddent
      })
    }
  }
})