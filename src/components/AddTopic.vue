<template>
  <div class="addtopic">
    <div class="publish-wrap">
    <back-bar :title="'新建文章'"
              class="back-bar"></back-bar>
    <div class="publish">
      <div class="new-title">
        <h2>文章标题</h2>
        <input class="title"
               type="text"
               name="title"
               placeholder="请输入标题，不少于5个字符"
               ref="title"><br/>
      </div>
      <div class="new-tab">
        <h2>文章类型</h2>
        <select name="tab"
                ref="tab"
                class="tab">
          <option value="share">分享</option>
          <option value="ask">问答</option>
          <option value="job">招聘</option>
          <option value="dev">测试</option>
        </select>
      </div>
      <div class="content">
        <mavon-editor id="replytext" v-model="editorContent"
                      ref="content"
                      style="height: 100%"
                      :toolbars="toolbars"
                      :default_open="'edit'"
                      :subfield="false"></mavon-editor>
      </div>
      <button @click="publishArticle"
              class="publish">发布
      </button>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  name:'addtopic',
  data(){
    return{
      editorContent:''
    }
  },
  methods:{
    publishArticle(){
      this.axios.post('https://cnodejs.org/api/v1/topics', {
            accesstoken: this.$store.getters.accesstoken,
            title: this.$refs.title.value,
            tab: this.$refs.tab.value,
            content: this.editorContent
      })
      .then(
            (Response) => {
              this.$router.push('/');
              let topic_id=Response.data.topic_id;
              this.$router.push("/topic/"+topic_id);
            },
            () => {
              alert("发送失败");
            }
          );
          
    }
  }
}
</script>
<style scoped>
#replytext{
  min-height:400px;
} 
</style>