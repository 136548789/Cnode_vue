<template>
  <div class="Sidebar">
    <div class="Userinnner" v-if="!isLogin">
      <div>notcanlook</div>
    </div>
    <div class="Userinnner" v-if="isLogin">
      <div>canyoulook?</div>
      {{userdata.loginname}}
      {{userdata.avatar_url}}
      {{userdata.id}}
    </div>
  </div>
</template>
<script>
export default {
  name:'Sidebae',
  data(){
    return{
      userdata:'aaa'
    }
  },
  methods:{
    getUserdata(){
      this.isLogin?
      this.userdata=this.$store.getters.user
      :this.userdata=null
    }
  },
  mounted(){
    this.getUserdata();
  },
  computed:{
    isLogin(){
      return this.$store.getters.isLogin
    },
    // user(){
    //   return this.$store.getters.user
    // }
  }
}
</script>