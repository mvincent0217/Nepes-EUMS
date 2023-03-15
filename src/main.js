import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
export const EventBus = new Vue();
import MyLoginPage from './components/MyLoginPage.vue';
import MyDashboard from './components/MyDashboard.vue';
import MyHierarchy from './components/MyHierarchy.vue';
import Settings from './components/MySettings.vue';
Vue.use(VueRouter);


const router = new VueRouter({
  routes: [
    { path: '/dashboard', component: MyDashboard},
    { path: '/', component: MyLoginPage },
    { path: '/hierarchy', component: MyHierarchy,},
    { path: '/settings', component: Settings,},
  ]
});


new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
