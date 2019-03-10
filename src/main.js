import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '_bootstrap@3.4.1@bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from '@/store/store.js'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.prototype.$ajax = axios//使用该命令后 将axios改为vue原型属性 vue-axios效果未知 https://blog.csdn.net/tdjqqq/article/details/80690241
Vue.use(VueAxios,axios)
Vue.use(mavonEditor)
//因为是cnpm安装 要带上版本号
Vue.config.productionTip = false
router.beforeEach((to,from,next)=>{
  // if(to.path=='/setting'){
  //  if(!store.getters.isLogin){
  //   next();
  //  }
  //  else{
  //   alert("请先登陆!");
  //   next('/');
  //  }
  // }
  // else{
  //  next();
  // }
  switch(to.path){
    case '/setting':
    (store.getters.isLogin)
    ?next():next('/');
    break;
    case '/signup':
    (!store.getters.isLogin)
    ?next():next('/');
   
    break;
    case '/signin':
    (!store.getters.isLogin)
    ?next():next('/');
    break;
    default:
    next();
    } 
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
