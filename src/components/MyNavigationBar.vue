<script>
import Notification from './MyNotification.vue';
import * as RestAPI from '@/JS/RestAPI.js';
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
        localStorage.setItem('isAuthenticated', 'false');
        this.DeleteSession();
        this.$router.push('/');
      }
    },
    async DeleteSession() {
      this.userID = localStorage.getItem('userID');
      this.DeleteSessionResult = await RestAPI.DeleteSession(this.userID);
      console.log('Session deleted.'); // Placeholder for the actual logic to delete the session
    }
  },
  watch: {
    bgColor: function(val) {
      document.documentElement.style.setProperty('--bgcolorNav', val);
    },
  },
};
</script>

<template>
  <div>
    <div id="mySidenav" :style="{ '--bgcolorNav': bgColor }" class="ClassSideNavigationBar1">
      <div class="alignNavbarBtn">
        <button class="LogoutBtn" @click="logout">Logout</button>
      </div>
      <a href="/#/dashboard" @click="DeleteSession">Dashboard</a>
      <a href="/#/settings" @click="DeleteSession">Settings</a>
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