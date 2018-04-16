import { util } from '@src/libs/util'

let request = util.axiosInstance
let ajax = {}


ajax.login = function(obj){
  request.post('time_line/doLoginBackend',obj.data)
  .then(function(res){
      if(res.data.code === 0){
        obj.success(res.data.data)
      }else{
        obj.error(res.data.msg)
      }
  })
  .catch(function(error){
    console.log(error)
  })
}

ajax.getTimelineList = function(obj){
  request.get('time_line/getTimeLineList',{
    params: obj.data
  })
  .then(function(res){
      if(res.data.code === 0){
        obj.success(res.data.data)
      }else{
        obj.error(res.data.msg)
      }
  })
  .catch(function(error){
    console.log(error)
  })
}

ajax.getTimelineDetail = function(obj){
  request.get('time_line/getTimeLineDetail',{
    params: obj.data
  })
  .then(function(res){
      if(res.data.code === 0){
        obj.success(res.data.data)
      }else{
        obj.error(res.data.msg)
      }
  })
  .catch(function(error){
    console.log(error)
  })
}

ajax.setTimeLine = function(obj){
  request.post('time_line/setTimeLine',obj.data)
  .then(function(res){
      if(res.data.code === 0){
        obj.success(res.data.data)
      }else{
        obj.error(res.data.msg)
      }
  })
  .catch(function(error){
    console.log(error)
  })
}

ajax.delTimeLine = function(obj){
  request.post('time_line/delTimeLine',obj.data)
  .then(function(res){
      if(res.data.code === 0){
        obj.success(res.data.data)
      }else{
        obj.error(res.data.msg)
      }
  })
  .catch(function(error){
    console.log(error)
  })
}

ajax.getAvatorLists = function(obj){
  request.get('time_line/getAvatorLists',{
    params: obj.data
  })
  .then(function(res){
      if(res.data.code === 0){
        obj.success(res.data.data)
      }else{
        obj.error(res.data.msg)
      }
  })
  .catch(function(error){
    console.log(error)
  })
}

ajax.getProfile = function(obj){
  request.get('time_line/getProfile',{
    params: obj.data
  })
  .then(function(res){
      if(res.data.code === 0){
        obj.success(res.data.data)
      }else{
        obj.error(res.data.msg)
      }
  })
  .catch(function(error){
    console.log(error)
  })
}

ajax.setProfile = function(obj){
  request.post('time_line/setProfile',obj.data)
  .then(function(res){
      if(res.data.code === 0){
        obj.success(res.data.data)
      }else{
        obj.error(res.data.msg)
      }
  })
  .catch(function(error){
    console.log(error)
  })
}

ajax.resetPassword = function(obj){
  request.post('time_line/resetPassword',obj.data)
  .then(function(res){
      if(res.data.code === 0){
        obj.success(res.data.data)
      }else{
        obj.error(res.data.msg)
      }
  })
  .catch(function(error){
    console.log(error)
  })
}
export default ajax
