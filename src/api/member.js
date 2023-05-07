import request from "../utils/request";

export function getMember(data){
  return request({
    url:"/getMember",
    method:"POST",
    data
  })
}
export function addMember(data){
  return request({
    url:"/addMember",
    method:"POST",
    data
  })
}


export function delMember(mid){
  return request({
    url:"/delMember?mid="+mid,
    method:"GET",
  })
}

export function updateMember(data){
  return request({
    url:"/updateMember",
    method:'POST',
    data
  })
}

export function searchMember(data){
  console.log(data);
  return request({
    url:"/searchMember?value="+data,
    method:'GET',
  })
}