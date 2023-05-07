import request from "../utils/request";

export function getNews(uid) {
  return request({
    url: "/getNews?uid=" + uid,
    method: "GET",
  })
}

export function getNewsDetail(data) {
  return request({
    url: "/getNewsDetail",
    method: "POST",
    data
  })
}

export function addNews(data) {
  return request({
    url: "/addNews",
    method: "POST",
    data
  })
}


export function updateNews(data) {
  return request({
    url: "/updateNews",
    method: 'POST',
    data
  })
}

export function delNews(nid) {
  return request({
    url: "/delNews?nid=" + nid,
    method: "GET",
  })
}

export function searchNews(data) {
  return request({
    url: "/searchNews?value=" + data,
    method: 'GET',
  })
}