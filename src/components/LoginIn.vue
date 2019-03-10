<template>
<div class="col-lg-6">
    <div class="input-group">
      <input type="text" class="form-control" placeholder="输入登陆码" @keydown.enter="loginIn" ref="code">
      <span class="input-group-btn">
        <button class="btn btn-default" type="button" @click="loginIn">登陆</button>
      </span>
    </div>
    <div>{{count}}</div>
    <div>{{islogin}}</div>
</div>
</template>
<script>
export default {
  name:"loginin",
  data(){
    return{
      logincode:"",
    }
  },
  methods:{
    loginIn(){
      const code = this.$refs.code.value.trim();
      this.$store.commit('into');
      //this.$store.dispatch("increment");
      if(code.length!=0){
        this.axios.post("https://cnodejs.org/api/v1/accesstoken",{
          accesstoken :code
          })
          .then((Response)=>{
            alert("登陆成功");
            sessionStorage.setItem('userData',JSON.stringify(Response.data));
            sessionStorage.setItem('isLogin',true);
            sessionStorage.setItem('accesstoken',code);
            this.$store.dispatch("increment");

          //Vuex在用户刷新的时候userLogin会回到默认值false，所以我们需要用到HTML5储存
          //我们设置一个名为Flag，值为isLogin的字段，作用是如果Flag有值且为isLogin的时候，证明用户已经登录了。
            //localStorage.setItem("Flag", "isLogin");
            this.$router.back('/');
          },
          ()=>{
            alert("登陆失败,请重试");
          }
          );
      }
      else{
        alert("登陆码不能为空！")
      }
    }
  },
  computed:{
    count(){
      return this.$store.getters.count
    },
    islogin(){
      return this.$store.getters.isLogin
    }
    
  }
}
</script>

