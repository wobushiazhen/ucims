import request from "../utils/request";

export function updateWord(data) {
  return request({
    url: "/updateWord",
    method: "POST",
    data
  })
}