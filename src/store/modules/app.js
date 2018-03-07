const app = {
    state: { 
        breadcrumb: '',
        activityName: ''
     },
    mutations: { 
        changeBreadcrumb(state,payload) {
            state.breadcrumb = payload.name
        },
        changeActivityName(state,payload) {
            state.activityName = payload.name
            console.log(state.activityName)
        }
     },
    actions: { 
        changeBreadcrumb(context,payload) {
            context.commit('changeBreadcrumb',payload)
        },
        changeActivityName(context,payload) {
            context.commit('changeActivityName',payload)
        },
     },
    getters: { 
        
     }
  }

  export default app