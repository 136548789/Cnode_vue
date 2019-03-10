<template>
  <div id="app">
    <Top/>
    <div class="panel col-sm-8"><router-view name="panel"></router-view></div>
     <div class="side col-sm-2"><router-view name="sidebar"></router-view></div>
  </div>
</template>

<script>
import Top from '@/components/Top.vue'
export default {
  name:'app',
  components: {
    Top
  }
}
</script>
<style>
.panel
{
  margin:30px 30px 30px 30px;
  background-color: white;
}
.side
{
  margin:30px 30px 30px 0px;
  background-color: white;
}
</style>

