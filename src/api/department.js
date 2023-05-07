import request from "../utils/request";

export function getDepartment(){
  return request({
    url:"/getDepartment",
    method:"GET",
    // data
  })
}
export function addDepartment(data){
  return request({
    url:"/addDepartment",
    method:"POST",
    data
  })
}

// 
// export function delDepartment(mid){
//   return request({
//     url:"/delMember?mid="+mid,
//     method:"GET",
//   })
// }

export function updateDepartment(data){
  return request({
    url:"/updateDepartment",
    method:'POST',
    data
  })
}

export function searchDepartment(data){
  console.log(data);
  return request({
    url:"/searchDepartment?value="+data,
    method:'GET',
  })
}