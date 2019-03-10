<template>
  <div>
    <div class="header no-padding row">
        <a @click.prevent="changeTab('all')"href="/">全部</a>
        <a @click.prevent="changeTab('good')"href="/">精华</a>
        <a @click.prevent="changeTab('share')"href="/">分享</a>
        <a @click.prevent="changeTab('ask')"href="/">问答</a>
        <a @click.prevent="changeTab('job')"href="/">招聘</a>
        <a @click.prevent="changeTab('dev')"href="/">客户端测试</a>
    </div>
    <div class="inner no-padding row">
      <div class="top_list">
        <div class="cell" v-for="list of toplist.data">
          <a></a>
          <a class="user_head_sculpture pull_left" :title="list.author.loginname" :href="'/user/'+list.author.loginname">
            <img :src="list.author.avatar_url" alt="" height="30px" width="30px"><!--绑定url变量时不能用，src=“{{url数据}}” 要用v-bind进行数据绑定-->
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
      <div class="page-bar">
        <ul>
          <li v-if="cur>1"><a v-on:click="cur--,pageClick()">上一页</a></li>
          <li v-if="cur==1"><a class="banclick">上一页</a></li>
          <li v-for="index in indexs"  v-bind:class="{ 'active': cur == index}">
              <a v-on:click="btnClick(index)">{{ index }}</a>
          </li>
          <li v-if="cur!=all"><a v-on:click="cur++,pageClick()">下一页</a></li>
          <li v-if="cur == all"><a class="banclick">下一页</a></li>
          <li><a>共<i>{{all}}</i>页</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped class="type/css">
.header a
{
  padding:0 0 15px 15px;
  display: inline-block;
  background-color: greenyellow;
  font-size: 1em;
  color:black;
  text-decoration:none;
}
.header a:hover
{
  color:dimgray;
  background: blue;
}
.header
{
  padding: 10px 10px 10px 10px;
  background: #f6f6f6;
}
.cell
{
    border-top: 1px solid #e1e1e1;
    position: relative;
    padding: 10px 0 10px 10px;
    font-size: 14px;
}
.cell>a
{  
  display: inline-block;
}
.cell>span
{  
  display: inline-block;
}
.pull_left
{
  float: left;
}
.pull_right
{
  float:right;
}
.row
{
  padding: 0 0 -15px -15px;
}
.page-bar{
    margin:40px;
}
ul,li{
    margin: 0px;
    padding: 0px;
}
li{
    list-style: none
}
.page-bar li:first-child>a {
   margin-left: 0px
}
.page-bar a{
    border: 1px solid #ddd;
    text-decoration: none;
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #337ab7;
    cursor: pointer
}
.page-bar a:hover{
    background-color: #eee;
}
.page-bar a.banclick{
    cursor:not-allowed;
}
.page-bar .active a{
    color: #fff;
    cursor: default;
    background-color: #337ab7;
    border-color: #337ab7;
}
.page-bar i{
    font-style:normal;
    color: #d44950;
    margin: 0px 4px;
    font-size: 12px;
}
</style>
<script>
export default {
  name:'panel',
  data()
  {
    return {
      top_list:"",//文章
      page:1,//页码
      userloginname:"",//用户名
      userinfor:"",//用户信息
      all: 200, //总页数
      cur: 1//当前页码
    }
  },
  watch: {
        cur: function(oldValue , newValue){
            console.log(arguments);
        }
    },
  methods:
  {
    changeTab(selectedTab){ 
      this.axios.get("https://cnodejs.org/api/v1/topics/",{
        params:{
          tab:selectedTab,
          page:this.page
          }})
          .then(body=>{
           this.top_list=body.data;
           });
    },
    getuser(){
      this.axios.get("",{params:{username:this.userloginname}}).then(body=>
      {
        this.userinfor=body.data;
      });
    },
    btnClick: function(data){//页码点击事件
            if(data != this.cur){
                this.cur = data 
                this.pageClick();
            }
        },
    pageClick: function(){
        console.log('现在在'+this.cur+'页');
        this.axios.get("https://cnodejs.org/api/v1/topics",{
        params:{
          page:this.cur
          }})
          .then(body=>{
           this.top_list=body.data;
           });
    }
  },
  mounted(){
    this.axios.get("https://cnodejs.org/api/v1/topics",{
        params:{
          page:this.page
          }})
          .then(body=>{
           this.top_list=body.data;
           });
  },
  computed:{
    toplist(){
      return this.top_list
    },
    indexs: function(){
          var left = 1;
          var right = this.all;
          var ar = [];
          if(this.all>= 5){
            if(this.cur > 3 && this.cur < this.all-2){
                    left = this.cur - 2
                    right = this.cur + 2
            }else{
                if(this.cur<=3){
                    left = 1
                    right = 5
                }else{
                    right = this.all
                    left = this.all -4
                }
            }
         }
        while (left <= right){
            ar.push(left)
            left ++
        }
        return ar
    }
  }
}
</script>
