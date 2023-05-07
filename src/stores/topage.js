import { defineStore } from "pinia";

export const useTopageStore=defineStore('topage',{
  state:()=>({
    activeRoute:'/home'
  }),
  persist: {
    //开启局部缓存
    enabled: true,
    strategies: [
      {
        key: 'topage',
        storage: localStorage,
        paths:['activeRoute']
      }
    ]
  },
  actions:{
    setActiveRoute(activeRoute){
      this.activeRoute=activeRoute
    }
  }
}) 