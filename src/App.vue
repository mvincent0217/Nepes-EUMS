<template>
  <div id="app">
     <!-- <MyDashboard/> -->
     <router-view><MyLoginPage/></router-view>
  </div>
</template>

<script>
import MyLoginPage from './components/MyLoginPage.vue'
// import MyDashboard from './components/MyDashboard.vue'
import "./Styles/MainCSS.css"
import "./Styles/Style.css";
export default {
  name: 'App',
  components: {
    MyLoginPage,
    // MyDashboard
  }
}
</script>
