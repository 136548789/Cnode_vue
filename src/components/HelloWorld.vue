<template>
  <div class="hello">
    <div v-for="list of top_list.data">
          <a>list.id</a>
         <a class="user_head_sculpture pull_left" :title="list.author.loginname" :href="'/user/'+list.author.loginname">
            <img :src="list.author.avatar_url" alt=""><!--绑定url变量时不能用，src=“{{url数据}}” 要用v-bind进行数据绑定-->
          </a>
          <span class="reply_count pull_left">
              <span class="count_of_reply" title="回复数">{{list.reply_count}}</span>
              <span>/</span>
              <span class="count_of_hit" title="点击数">{{list.visit_count}}</span>
          </span>
          <a class="last_time pull_right">
            <img src="" alt="">
            <span></span>
          </a>
          <div class="topic_title_wrapper">
            <span :class="list.tab">{{list.tab}}</span>
            <a class="topic_title" :href="'/topic/'+list.id" :title="list.title">{{list.title}}</a>
          </div>
</div>
  </div>
</template>

<script>
export default {
  name: 'panel',
  data()
  {
    return {
      top_list:"",//文章
      page:1,//页码
      userloginname:"",//用户名
      userinfor:""//用户信息
    }
  },
  methods:
  {
    getlist()
    {
      this.axios.get("https://cnodejs.org/api/v1/topics",{params:{page:this.page}}).then(body=>
      {
        this.top_list=body.data;
      });
    },
    getuser()
    {
      this.axios.get("",{params:{username:this.userloginname}}).then(body=>
      {
        this.userinfor=body.data;
      });
    }
  },
  created()
  {
    this.getlist();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

