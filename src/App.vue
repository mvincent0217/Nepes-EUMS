<template>
  <div id="app">
     <MyDashboard/>
     <!-- <MyLoginPage/> -->
  </div>
</template>

<script>
// import MyLoginPage from './components/MyLoginPage.vue'
import MyDashboard from './components/MyDashboard.vue'
import "./Styles/MainCSS.css"
import "./Styles/style.css";
export default {
  name: 'App',
  components: {
    // MyLoginPage,
    MyDashboard
  }
}
</script>
