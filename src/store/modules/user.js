export default {
    state: {
        userInfo: []
    },
    mutations:{
        changeUserInfo(state,payload){
            state.userInfo = payload
            console.log(state.userInfo)
            console.log('user store')
        }
    },
    actions: {
        changeUserInfo(context,payload){
            context.commit('changeUserInfo',payload)
        }
    }
}