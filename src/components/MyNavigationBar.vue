<template>
  <div>
    <div id="mySidenav" :style="{ '--bgcolorNav': bgColor }" class="ClassSideNavigationBar1">
      <div class="alignNavbarBtn">
        <button class="LogoutBtn" @click="logout">Logout</button>
      </div>
      <a href="/#/dashboard">Dashboard</a>
      <a href="/#/settings">Settings</a>
      <button class="LogoutBtn" @click="logout">Logout</button>
    </div>
    <div id="main1" :style="{ '--bgcolorNav': bgColor }" class="ClassNavbarcolor1">
      <span class="ClassNavbutton" @click="isOpen ? closeNav() : openNav()">
        <template v-if="isOpen">&#10005;</template>
        <template v-else>&#9776;</template>
      </span>
    </div>
    <Notification class="notification-position" />
  </div>
</template>

<script>
import Notification from './MyNotification.vue';

export default {
  data() {
    return {
      isOpen: false,
      bgColor: localStorage.getItem('NavbarColor') || 'Orange',
    };
  },
  components:{
    Notification
  },
  methods: {
    openNav() {
      this.isOpen = true;
      document.getElementById('mySidenav').style.width = '250px';
      document.getElementById('main1').style.marginLeft = '250px';
    },
    closeNav() {
      this.isOpen = false;
      document.getElementById('mySidenav').style.width = '0';
      document.getElementById('main1').style.marginLeft = '0';
    },
    navigateToAbout() {
      console.log(this.$route.path);
      if (this.$route.path !== '/login') {
        this.$router.push('/login');
      }
    },
    logout() {
      if (this.$router.currentRoute.path !== '/login') {
        this.$router.push('/');
      }
    },
  },
  watch: {
    bgColor: function(val) {
      document.documentElement.style.setProperty('--bgcolorNav', val);
    },
  },
};
</script>
