import request from "../utils/request.js";
 
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

export function currentUser(data){
  return request({
    url:"/currentUser",
    method:"POST",
    data
  })
}

export function updataCurrentUser(data){
  return request({
    url:"/updataCurrentUser",
    method:"POST",
    data
  })
}


export function updatePerson(data){
  return request({
    url:"/updatePerson",
    method:'POST',
    data,
  })
}
