import { defineStore } from 'pinia'

export const uInfo = defineStore('uInfo', {
  state: () => ({
    usernameL: '',//登录成功后的用户名,
    sex: '男',
  }),
  //持久化配置
  persist: {
    //开启局部缓存
    enabled: true,
    strategies: [
      {
        key: 'uInfo',
        storage: localStorage,
        paths:['token','usernameL','sex']
      }
    ]
  }
},)