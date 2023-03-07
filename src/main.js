import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import MyLoginPage from './components/MyLoginPage.vue';
import MyDashboard from './components/MyDashboard.vue';
Vue.use(VueRouter);


const router = new VueRouter({
  routes: [
    { path: '/dashboard', component: MyDashboard },
    { path: '/login', component: MyLoginPage },
  ]
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
