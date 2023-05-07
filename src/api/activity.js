import request from "../utils/request";

export function getActivity(uid) {
  return request({
    url: "/getActivity?uid=" + uid,
    method: "GET",
  })
}

export function addActivity(data) {
  return request({
    url: "/addActivity",
    method: "POST",
    data
  })
}


export function updateActivity(data) {
  return request({
    url: "/updateActivity",
    method: 'POST',
    data
  })
}

export function delActivity(aid) {
  return request({
    url: "/delActivity?aid=" + aid,
    method: "GET",
  })
}

export function searchActivity(data) {
  console.log(data);
  return request({
    url: "/searchActivity?value=" + data,
    method: 'GET',
  })
}