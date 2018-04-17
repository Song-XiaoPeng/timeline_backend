import axios from 'axios'
import env from 'config/env'

export const STORAGE_TIME = 240;//分钟,storage过期时间
export const USER_INFO_KEY = 'userInfo';//分钟,storage过期时间
export const TOKEN_KEY = 'access-token';//分钟,storage过期时间

let util = {

};
util.title = function (title) {
    title = title ? title + ' - Home' : '@sone的时光机';
    window.document.title = title;
};

util.ajaxBaseUrl = env === "development" ? "http://timemachine.com/" : "http://sone.timeline.hellobirds.top/"
util.uploadImgUrl = util.ajaxBaseUrl + "common/uploadImg"

util.axiosInstance = axios.create({
    baseURL: util.ajaxBaseUrl,
    timeout: 30000,
    headers: {'access-token': fetchToken(),'X-Requested-With': 'XMLHttpRequest'}
  });
  
  // Add a request interceptor
  // util.axiosInstance.interceptors.request.use(function (config) {
  //   // Do something before request is sent
  //   config.headers['access-token'] = JSON.parse(localStorage.getItem('userInfo')) === null ? null : JSON.parse(localStorage.getItem('userInfo')).access_token;
  //   return config;
  // }, function (error) {
  //   // Do something with request error
  //   return Promise.reject(error);
  // });
  
  // Add a response interceptor
  util.axiosInstance.interceptors.response.use(function (response) {
    // Do something with response data
    if (response.data.code === 6001) {//登录失败
        // window.localStorage.removeItem('userInfo');
        delStorage('userInfo');
        window.location.href = 'http://' + window.location.host;
      }
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
export { util }

//设置Storage
export function setStorage(name, value, minuts = STORAGE_TIME) {
    if (sessionStorage.getItem(name) || !minuts) {
        let time = new Date().getTime();
        sessionStorage.setItem(name, JSON.stringify({value: value, time: time}));
    }
    else {
        let time = new Date().getTime() + minuts * 60 * 1000;
        localStorage.setItem(name, JSON.stringify({value: value, time: time}));
    }
}

//获取Storage
export function getStorage(name) {
    let rs = localStorage.getItem(name);
    if (rs) {
        let obj = JSON.parse(rs);
        obj.time = obj.time - new Date().getTime();
        if (obj.time < 0) {
            delStorage(name);
            return '';
        }
        return obj.value;
    }
    let rs_session = JSON.parse(sessionStorage.getItem(name));
    return rs_session ? rs_session.value : '';
}

//清除Storage
export function delStorage(name) {
    localStorage.removeItem(name);
    sessionStorage.removeItem(name);
}

export function fetchToken() {
    try {
        return getStorage(TOKEN_OBJ_ID);
    } catch (e) {
        return '';
    }
}