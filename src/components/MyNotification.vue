<script>
import * as RestAPI from '@/JS/RestAPI.js';
export default {
    data() {
        return {
          UserID:  localStorage.getItem('userID'),
          EquipmentID: localStorage.getItem('equipmentId')
        }
    },
    methods:{
      async callGetAllActiveSessions() {
        this.userID = localStorage.getItem('userID');
        this.GetAllActiveSessionsResult = await RestAPI.GetAllActiveSessions();
        const parsedData = JSON.parse(this.GetAllActiveSessionsResult.data);
        // console.log(parsedData);
        // Check if parsedData is empty
        if (Object.keys(parsedData).length === 0) {
            console.log("No Active Session");
        } else {
            console.log("Active Users");
            // Iterate over parsedData object
            for (const key in parsedData) {
                    console.log("User_ID: " + parsedData[key].User_ID);

                    const sessionID = parsedData[key].Session_ID;
                    const index = sessionID.indexOf('_');
                    const substring = index === -1 ? sessionID : sessionID.substring(index + 1);
                    console.log(substring);
            }
        }
    },
    },
    created(){

      this.callGetAllActiveSessions()
    }
}
</script>
<template>
    <div class="notification">
  <div class="notification-header">
    <button class="notifBtn">🔔</button>
     <span class="badge">3</span>
    <span class="arrow"></span>
  </div>
  <div class="notification-dropdown">
    <ul>
      <li>{{ UserID }} is editing {{ EquipmentID }}</li>
    </ul>
  </div>
</div>
</template>