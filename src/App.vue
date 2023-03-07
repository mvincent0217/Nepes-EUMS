<template>
  <div id="app">
    <MyDashboard msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import MyDashboard from './components/MyDashboard.vue'

export default {
  name: 'App',
  components: {
    MyDashboard
  }
}
</script>
