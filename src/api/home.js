import request from "../utils/request";

export function getHomeData(uid) {
  return request({
    url: "/getHomeData?uid=" + uid,
    method: "GET",
  })
}