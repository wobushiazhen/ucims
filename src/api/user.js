import request from "../utils/request.js"

export function getUser(){
  return request({
    url:"/user",
    method:'GET',
  })
}

