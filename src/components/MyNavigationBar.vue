<script>
  export default {
    data() {
      return {
        isOpen: false
      }
    },
    methods: {
      openNav() {
        this.isOpen = true;
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main1").style.marginLeft = "250px";
      },
      closeNav() {
        this.isOpen = false;
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main1").style.marginLeft = "0";
      },
      navigateToAbout() {
        console.log(this.$route.path);
        if (this.$route.path !== '/login') {
          this.$router.push("/login");
        }
      },
    },
  };
  </script>

<template>
    <div>
      <div id="mySidenav" class="ClassSideNavigationBar1">
        <div class="alignNavbarBtn">
          <button class="LogoutBtn" @click="navigateToAbout">Logout</button>
        </div>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </div>
      <div id="main1" class="ClassNavbarcolor1">
        <span class="ClassNavbutton" @click="isOpen ? closeNav() : openNav()">
          <template v-if="isOpen">&#10005;</template>
          <template v-else>&#9776;</template>
        </span>
      </div>
    </div>
  </template>
  
  
  