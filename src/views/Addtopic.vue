<template>
  <div class="Add">
    <AddTopic/>
  </div>
</template>

<script>
// @ is an alias to /src
import AddTopic from '@/components/AddTopic.vue'

export default {
  name: 'Add',
  components: {
    AddTopic
  }
}
</script>

