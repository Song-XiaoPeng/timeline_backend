const routers = [
    {
        path: '/',
        redirect: '/login',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      meta: {
          title: '登录'
      },
      component: (resolve) => require(['@src/views/user/login.vue'], resolve)
    },
    {
      path: '/resetPassword',
      name: 'resetPassword',
      meta: {
          title: '登录'
      },
      component: (resolve) => require(['@src/views/user/resetPassword.vue'], resolve)
    },
    {
      path: '/index',
      name: 'index',
      meta: {
        title: 'index'
      },
      component:  (resolve) => require(['./views/Layout/index.vue'], resolve),
      children: [
        {
          path: 'sone',
          name: 'sone',
          meta: {
            title: 'sone'
          },
          component:  (resolve) => require(['./views/sone.vue'], resolve)
        },
        {
          path: 'timeline',
          name: 'timeline',
          meta: {
            title: 'timeline'
          },
          component:  (resolve) => require(['./views/timeline/index.vue'], resolve),
          children: [
            
          ]
        },
        {
          path: 'setTimeline',
          name: 'setTimeline',
          meta: {
            title: 'setTimeline'
          },
          component:  (resolve) => require(['./views/timeline/detail.vue'], resolve)
        },
        {
          path: 'setProfile',
          name: 'setProfile',
          meta: {
            title: 'setProfile'
          },
          component:  (resolve) => require(['./views/user/setProfile.vue'], resolve)
        },
        {
          path: 'modifyPassword',
          name: 'modifyPassword',
          meta: {
            title: 'modifyPassword'
          },
          component:  (resolve) => require(['./views/user/modifyPassword.vue'], resolve)
        }
      ]
    }
];
export default routers;
