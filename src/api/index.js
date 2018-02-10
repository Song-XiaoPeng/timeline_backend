import axios from 'axios'

let ajax = {}

ajax.getTimelineList = function(obj){
  axios.get('http://sone.timeline.hellobirds.top/time_line/getTimeLineList',{
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
  axios.get('http://sone.timeline.hellobirds.top/time_line/getTimeLineDetail',{
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

export default ajax
