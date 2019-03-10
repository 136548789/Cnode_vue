<template>
  <div class="userIndex">
    <div class="userman">
      <div class="img">
        <img :src="user_maindata.data.avatar_url" alt="" height="40px" width="40px">
      </div>
      <div class="name">用户名:{{user_maindata.data.loginname}}</div>
      <div class="github">github:{{user_maindata.data.loginname}}</div>
      <div class="score">积分:{{user_maindata.data.score}}</div>
    </div>
    <div class="recenttopic">
      <div>最近主题</div>
      <div class="cell topic" v-for="(topic,index) in user_maindata.data.recent_topics">
        <div>
          <a :href="'/topic/'+topic.id">
            <img :src="topic.author.avatar_url" alt="" width="30px" height="30px"/>
            <div class="title">{{topic.title}}</div>
          </a>
        </div>
      </div>
    </div>
    <div class="recentreply">
      <div>最近回复</div>
      <div class="cell reply" v-for="(reply,index) in user_maindata.data.recent_replies">
         <div>
          <a :href="'/topic/'+reply.id">
            <img :src="reply.author.avatar_url" alt="" width="30px" height="30px"/>
            <div class="title">{{reply.title}}</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'userIndex',
  data(){
    return{
      user_maindata:""
    }
  },
  methods:{
    get_usermaindata(){
      let username=this.$route.params.uname;
      this.axios.get("https://cnodejs.org/api/v1/user/"+username)
      .then(body=>{
        this.user_maindata=body.data;
        console.log(this.user_maindata);
      })
    }
  },
  created(){
    this.get_usermaindata();
  }
}
</script>
<style scoped>
.cell
{
    border-top: 1px solid #e1e1e1;
    position: relative;
    padding: 10px 0 10px 10px;
    font-size: 14px;
}
.cell .title
{  
  display: inline;
  margin-left: 10px;
}
.cell>img
{  
  display: inline;
  float: left;
}
.pull_left
{
  float: left;
}
.pull_right
{
  float:right;
}
</style>


