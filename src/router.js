const routers = [
    {
        path: '/',
        redirect: '/index',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
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
          component:  (resolve) => require(['./views/timeline/index.vue'], resolve)
        },
        {
          path: 'detail',
          name: 'detail',
          meta: {
            title: 'detail'
          },
          component: (resolve) => require(['./views/timeline/detail.vue'], resolve)
        }
      ]
    }
];
export default routers;
