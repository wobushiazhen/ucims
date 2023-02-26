import request from "../utils/request.js";
 
export function login(){
  return request({
    url:'/login',
    method:"GET"
  })
}

export function getToken(data){
  return request({
    url:"/login",
    method:"POST",
    data
  })
}

export function registerTo(data){
  return request({
    url:"/register",
    method:'POST',
    data
  })
}

