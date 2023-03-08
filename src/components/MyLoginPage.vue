<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import * as RestAPI from '@/JS/RestAPI.js';

Vue.use(VueRouter)

export default {
  data() {
    return {
      userID: '',
      password: '',
      AuthenticateUserResult: '',
      IncorrectPass:''
    }
  },
  methods: {
    // login() {
    //   if (this.$router.currentRoute.path !== '/dashboard') {
    //     this.$router.push('/dashboard');
    //   }
    // },
    async AuthenticateUser() {
  this.AuthenticateUserResult = await RestAPI.AuthenticateUser(this.userID, this.password);
  this.AuthenticateUserResult = JSON.parse(this.AuthenticateUserResult.data);
  // console.log(this.AuthenticateUserResult);
  if (this.AuthenticateUserResult && this.AuthenticateUserResult.UserRights) {
    for (let i = 0; i < this.AuthenticateUserResult.UserRights.length; i++) {
      const userRight = this.AuthenticateUserResult.UserRights[i];
      // console.log(userRight);
      if (userRight && this.$router.currentRoute.path !== '/dashboard') {
        this.$router.push('/dashboard');
        break;
      }
    }
  } else {
    this.IncorrectPass = 'Incorrect password'
  }
}

}
}
</script>


<template>
  <div>
    <br><br><br><br>
  <div class="login-card">
    <div class="card-header">
      <img class="nepeslogo" src="../../public/images/nepeshayyim logo.png">
      <br><br>
      <a class="formfont">Welcome! Please Login</a>
    </div>
    <form>
      <div class="form-group">
        <label for="userID">User ID:</label>
        <input v-model="userID" name="userID" id="userID" type="text">
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input v-model="password" name="password" id="password" type="password">
      </div>
      <a class="IncorrectPassText">{{ this.IncorrectPass}}</a>
        <br><br>
      <div class="form-group">
        <button class="loginBtn" type="submit" @keydown.enter="AuthenticateUser" @click.prevent="AuthenticateUser">Login</button>
      </div>
    </form>
  </div>
</div>
</template>

