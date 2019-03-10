import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const UserModel={
  // 设置属性
  state: {
    user:sessionStorage.getItem('userData') 
    ? JSON.parse(sessionStorage.getItem('userData'))
    :null,
    count:1,
    isLogin: sessionStorage.getItem('isLogin')
    ?JSON.parse(sessionStorage.getItem('isLogin'))
    :false,
    loginname:'',
    id:'',
    avatar_url:'',
    accesstoken:sessionStorage.getItem('accesstoken') 
    ? sessionStorage.getItem('accesstoken')
    :null
  },

  // 获取属性的状态
  getters: {//state的计算属性
    //获取登录状态
    isLogin: state => state.isLogin,
    count:state=>state.count,
    user:state=>state.user,
    accesstoken:state=>state.accesstoken
  },

  // 设置属性状态
  mutations: {
    //保存登录状态
    into(state){
      state.count+=1
    },
    userStatus(state) {
      state.isLogin = true
    },
    userSave(state,payload){
      state.user=payload
    }
  },

  // 应用mutations
  actions: {
    //获取登录状态
    increment (context) {
      context.commit('userStatus')
    },
    userSave(context){
      context.commit('userSave')
    }
  }
}
export default new Vuex.Store({
  modules: {
   UserModel
  },
});