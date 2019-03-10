<template>
<nav class="TopNavbar navbar-top">
  <div class="container">
    <div class="navbar-header">
      <a class="nav-img navbar-brand" href="/">
      <img class="logo" src="@/assets/cnodejs.svg" alt="brand" height="28px" width="130px">
      </a>
    </div>
    <div class="navbar-search navbar-left">
      <input type="search" id="search" value="" @keydown.enter="dosearch" v-model="searchText">
    </div>
    <ul class="nav navbar-nav navbar-right">
        <li><a href="/">首页</a></li>
        <li><a href="/my/message" v-show="islogin">未读消息</a></li>       
        <li><a href="/getstart">新手入门</a></li>
        <li><a href="/api">API</a></li>       
        <li><a href="/home">关于</a></li>
        <li><a href="/setting" v-show="islogin">设置</a></li>
        <li><a href="/" v-show="islogin" @click="quit">退出</a></li>
        <li><a href="/signup"  v-show="!islogin">注册</a></li>
        <li><a href="/signin" v-show="!islogin">登录</a></li>  
      </ul>
  </div>
</nav>
</template>
<style type="text/css">
.navbar-brand{
  margin:-7px;
}
.TopNavbar{
  height:50px;
  background: #444444
}
.navbar-search>input{
  background:url(../assets/search.png) no-repeat;
  background-color: white;
  background-position:2px 2px;
  padding-left:20px;
  outline:none;
  border:none;
  border-radius: 20px;
  height:26px;
  width:233px;
}
.navbar-search{
  padding: 12.5px;
}
.container{
  margin:0 auto;
  min-width: 960px;
  max-width: 1400px;
  height: 50px;
}
.container ul li a{
  color:white;
}
.container ul li a:hover{
  color:black;
}
</style>
<script>
import {mapState} from 'vuex'
export default {
  name:'TopNavbar',
  data() {
    return {
      searchText:"",
    }
  },
  methods: {
    dosearch(){
      console.log("state="+this.$store.state.isLogin)
      console.log("get="+this.$store.getters.isLogin)
      if(this.searchText!="")
      {
        window.location.href='https://www.baidu.com/s?wd='+this.searchText
      }
      else
      {
        alert("请输入搜索内容")
      }
    },
    quit(){
      sessionStorage.clear();
    }
  },
  computed:{
    islogin(){
      return this.$store.getters.isLogin
    }
  }
}
</script>

