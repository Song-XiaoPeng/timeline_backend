import axios from 'axios'
import env from 'config/env'

let util = {

};
util.title = function (title) {
    title = title ? title + ' - Home' : '@sone的时光机';
    window.document.title = title;
};

util.ajaxBaseUrl = env === "development" ? "http://timemachine.com/" : "http://sone.timeline.hellobirds.top/"

util.axiosInstance = axios.create({
    baseURL: util.ajaxBaseUrl,
    timeout: 30000,
    // headers: {'access_token': 'accesstoken'}
  });
  
  // Add a request interceptor
  util.axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers['access-token'] = JSON.parse(localStorage.getItem('userInfo')) === null ? null : JSON.parse(localStorage.getItem('userInfo')).access_token;
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  
  // Add a response interceptor
  util.axiosInstance.interceptors.response.use(function (response) {
    // Do something with response data
    if (response.data.code === 6001) {//登录失败
        window.localStorage.removeItem('userInfo');
        window.location.href = 'http://' + window.location.host;
      }
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
export default util;