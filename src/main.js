import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';

Vue.use(VueRouter);
Vue.use(iView);
// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

// router.beforeEach((to, from, next) => {
//     iView.LoadingBar.start();
//     Util.title(to.meta.title);
//     next();
// });

// router.afterEach((to, from, next) => {
//     iView.LoadingBar.finish();
//     window.scrollTo(0, 0);
// });

router.beforeEach((to, from, next) => {
    // alert(localStorage.getItem('userInfo'))
    // console.log(from)// /
    // console.log(to)///login
    // if (localStorage.getItem('userInfo') === null && to.path !== '/' && to.path !== '/resetPassword') {
    // //   if (to.query.account_number !== undefined && to.query.password !== undefined) {
    // //     next({ path: '/login' , query: { account_number: to.query.account_number, password: to.query.password }});
    // //   } else {
    //     next({ path: '/login' });
    // //   }
    // }
    if(localStorage.getItem('userInfo') === null && to.path !== '/login'){
        next({ path: '/login' })
    }
    
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
  });
  
  router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
  });
  

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
