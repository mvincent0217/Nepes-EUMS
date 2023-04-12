<script>
import * as RestAPI from '@/JS/RestAPI.js';
export default {
  data() {
    return {
      showModal: false,
      activeUsers: []
    };
  },
  methods: {
    async callGetAllActiveSessions() {
      this.userID = localStorage.getItem('userID');
      this.GetAllActiveSessionsResult = await RestAPI.GetAllActiveSessions();
      const parsedData = JSON.parse(this.GetAllActiveSessionsResult.data);
      // Check if parsedData is empty
        // Iterate over parsedData object
        const users = [];
        for (const key in parsedData) {
          const sessionID = parsedData[key].Session_ID;
          const index = sessionID.indexOf('_');
          const substring = index === -1 ? sessionID : sessionID.substring(index + 1);
          users.push({
            userID: parsedData[key].User_ID,
            sessionID: substring
          });
        }
        this.activeUsers = users;
    },
  },
  created() {
    this.callGetAllActiveSessions();
  },
};
</script>

<template>
  <div>
    <button @click="showModal = true">View Active Sessions</button>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span @click="showModal = false" class="close">&times;</span>
        <ul>
          <li v-for="(user, index) in activeUsers" :key="index">
            {{ user.userID }}, is using {{ user.sessionID }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  position: fixed;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  position: relative;
  width: 400px;
  bottom: 300px;
  left: 450px;

}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
}
</style>