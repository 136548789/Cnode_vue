<template>
  <div class="Sidebar">
    <div class="header">{{this.islogin?'个人信息':'请先登陆'}}</div>
    <div class="inner">
      <a :href="'/user/'+userdata.loginname">
        <img :src="userdata.avatar_url" alt="" width="48px" height="48px">
      </a>
      <a :href="'/user/'+userdata.loginname">{{userdata.loginname}}</a>
      <button v-show="islogin" type="button" class="btn btn-default" @click="addtopic">发帖</button>
    </div>
  </div>
</template>
<script>
export default {
  name:'Sidebar',
  data(){
    return{
      userdata:"",
      defalut:{loginname:"",avatar_url:""}
    }
  },
  methods:{
    getuserdata(){
      if(this.islogin){
        this.userdata=this.$store.getters.user;
      }
      else{
        this.userdata=this.defalut
      } 
    },
    addtopic(){
      this.$router.push('/addtopic');
    }
  },
  created(){
    this.getuserdata();
  },
  computed:{
    islogin(){
      return this.$store.getters.isLogin;
    }
  }
}
</script>
<style scoped>
.Sidebar{
  background-color: #f6f6f6;;
}
</style>

