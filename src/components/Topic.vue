<template>
  <div class="topic">
    <div class="header">
      <div class="title">
        <span>{{topic_data.data.tab}}</span>
        {{topic_data.data.title}}
        <a :href="'/user/'+topic_data.data.author.loginname">作者：{{topic_data.data.author.loginname}}</a>
      </div>
    </div>
    <div class="markdown">
      <mavon-editor v-html="topic_data.data.content" :subfield="false" :toolbarsFlag="false" :boxShadow="false" class="content">
      </mavon-editor>
    </div>
    <div class="reply" v-for="ureply of topic_data.data.replies">
      <div class="cell reply_item">
        <div class="reply_user">
          <a class="user_head_sculpture pull_left" :href="'/user/'+ureply.author.loginname">
            <img :src="ureply.author.avatar_url" height="30px" width="30px">
          </a>
        </div>
        <div class="user_info">
          <a :href="'/user/'+ureply.author.loginname">{{ureply.author.loginname}}</a>
          <div class="replybuttom pull_right">
            <button class="glyphicon glyphicon-pencil" v-show="islogin" @click="getReplyid(ureply.author.loginname)">
              </button>
          </div>
        </div>
        <div class="reply_content">
          <mavon-editor v-html="ureply.content" :subfield="false" :toolbarsFlag="false" :boxShadow="false" class="content" :defaultOpen="defaultData"/>
        </div>
      </div>
    </div>
    <div class="addReply" v-show="islogin">
      <mavon-editor id="replytext" v-model="addReplyContent" :subfield="false"/>
      <div>
        <button type="button" class="btn btn-default" @click="addReply">回复</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'topic',
  data(){
    return{
      topic_data:"",
      defaultData: "edit",
      addReplyContent:'',
      replyAtId:'',
    }
  },
  methods:{
    getContent(){
      let topic_id=this.$route.params.tid;
      this.axios.get("https://cnodejs.org/api/v1/topic/"+topic_id+"?mdrender=flase")
      .then(body=>{
        this.topic_data=body.data;
      });
    },
    addReply(){
      let topic_id=this.$route.params.tid;
      if(this.islogin){
        console.log(this.$store.getters.accesstoken);
        this.axios
        .post("https://cnodejs.org/api/v1/topic/"+topic_id+"/replies", {
          accesstoken: this.$store.getters.accesstoken,
          content: this.addReplyContent
        })
        .then((response)=>{
           if (response.data.success) {
             alert("回复成功");
             location.reload();
           }
           else(alert("false"));
                // 成功发送回复后，
                // 将内容添加到评论列表中
        }
        );
      }   
    },
    accesstoken(){
      return this.$store.getters.accesstoken
    },
    getReplyid(replyname){
      this.addReplyContent="@"+replyname;
      document.querySelector("#replytext").scrollIntoView(true);
    }
  },
  created(){
    this.getContent();this.accesstoken();
    
  },
  computed:{
    islogin(){
      return this.$store.getters.isLogin
    },
  }
}
</script>
<style>
#replytext{
  min-height:300px;
}
.pull_right{
  float:right;
}
.addReply{
  border-top: 1px solid #e1e1e1;
}
.header{
  padding: 10px 10px 10px 10px;
  background: #f6f6f6;
}
.topic{
  margin: 0 -15px 0 -15px;
}
.markdown{
  margin:0 10px;
  border-bottom: 1px solid #e1e1e1;
}
.cell{
    border-top: 1px solid #e1e1e1;
    position: relative;
    padding: 10px 0 10px 10px;
    font-size: 14px;
}
.markdown-text {
  width: 100%;
  border-radius: 0 0 4px 4px;
  padding: 5px 8px;
  margin-bottom: 10px;
  background-color: white;
  word-wrap: break-word;
}
.reply_user{
  display: inline;
}
.user_info{
  display: inline;
  margin-left: 10px;
}


</style>
