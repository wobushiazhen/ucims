import { defineStore } from 'pinia'

export const uInfo = defineStore('uInfo', {
  state: () => ({
    usernameL: '',//登录成功后的用户名,
    sex: '男',
    role:null,
    currentUser:{},
    avatarImg:"https://ts4.cn.mm.bing.net/th?id=OIP-C.JpExcS-YgMJN3bDnQBuJ-gHaHZ&w=250&h=249&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
  }),
  //持久化配置
  persist: {
    //开启局部缓存
    enabled: true,
    strategies: [
      {
        key: 'uInfo',
        storage: localStorage,
        paths:['token','usernameL','sex','role','currentUser','avatarImg']
      }
    ]
  },
  actions:{
    setAvatarImg(avatarImg){
      this.avatarImg=avatarImg
    }
  }
},)