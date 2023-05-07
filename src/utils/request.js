import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8001'

const request = axios.create({
  timeout: 5000,
  baseURL: 'http://localhost:8001',
  method: 'POST'
})

// 请求拦截器
axios.interceptors.request.use({
  function(config) {
    // 登录之后会将 token 存储到 localStorage 里面
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.token = localStorage.getItem('token');
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
})


//响应拦截器
axios.interceptors.response.use({
  function(response) {
    return response.data.data
  }, function(error) {
    return Promise.reject(error);
  }
})

export default request