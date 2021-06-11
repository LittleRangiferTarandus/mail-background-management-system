import axios from 'axios';
export function request(config){
  
  const instance = axios.create({
    baseURL : "http://www.ysqorz.top:8888/api/private/v1/",
    timeout : 5000,
  })
//请求拦截
  instance.interceptors.request.use(
    config => {
      //console.log(window.sessionStorage.getItem('token'));
      config.headers.Authorization = window.sessionStorage.getItem('token')
      //这里为请求头加入属性Authorization，值为token，对应后端请求数据的要求
      //console.log(config)
      return config
    },err => {
      console.log(err);
    })
//响应拦截
  instance.interceptors.response.use(res => {
      //console.log(res);
      return res
    },err => {
      console.log(err);
    })
  return instance(config)
}