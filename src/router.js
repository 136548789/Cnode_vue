import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import index from './views/index.vue'
import signin from './views/Login.vue'
import Sidebar from './views/Sidebar.vue'
import topic from './views/Topic.vue'
import user from './views/Usermain.vue'
import addtopic from './views/Addtopic.vue'
Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      components:{default:Home},
      meta:{
        isLogin:true
      }
    },
    {
      path: '/',
      name: 'index',
      components: {panel:index,sidebar:Sidebar}
    },
    {
      path:'/signin',
      name:'signin',
      components:{panel:signin,sidebar:Sidebar},
      meta:{
        isLogin:false
      }
    },
    {
      path:'/topic/:tid',
      name:'topic',
      components:{panel:topic,sidebar:Sidebar}
    },
    {
      path:'/user/:uname',
      name:'user',
      components:{panel:user,sidebar:Sidebar},
      meta:{
        isLogin:false
      }
    },
    {
      path:'/addtopic',
      name:'addtopic',
      components:{panel:addtopic,sidebar:Sidebar},
      meta:{
        isLogin:false
      }
    }
  ]
})
