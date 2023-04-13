<script>
import Swal from 'sweetalert2'
import * as RestAPI from '@/JS/RestAPI.js';
export default {
  data() {
    return {
      showModal: false,
      activeUsers: [],
      TempuserID: '',
      TempEquipmentID: '',
    };
  },
  methods: {
    async callGetAllActiveSessions() {
      this.GetAllActiveSessionsResult = await RestAPI.GetAllActiveSessions();
      const parsedData = JSON.parse(this.GetAllActiveSessionsResult.data);
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

    async Toast() {
  // If activeUsers array is empty, show loading and call API to get active sessions
  if (this.activeUsers.length === 0) {
    this.$refs.loading.showLoading(); // Show loading
    await this.callGetAllActiveSessions(); // Call API to get active sessions
    this.$refs.loading.hideLoading(); // Hide loading
  }

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  let tableHtml = '';

  if (this.activeUsers.length > 0) {
    tableHtml = `
      <div style="width:100%">
        <table style="width:100%; table-layout:fixed;">
          <thead>
            <tr>
            </tr>
          </thead>
          <tbody>
    `

    for (const user of this.activeUsers) {
      tableHtml += `
        <tr>
          <td style="font-size: 14px; width:50%">${user.userID} is using ${user.sessionID}</td>
        </tr>
      `
    }
    
    tableHtml += `
          </tbody>
        </table>
      </div>
    `
  } else {
    // Show message when no active users found
    tableHtml = '<div>No active sessions found</div>';
  }

  Toast.fire({
    title: 'Active Users',
    html: tableHtml,
    customClass: {
      table: 'table-class',
      container: 'container-class'
    }
  })
},
  },
  created() {
    this.callGetAllActiveSessions();
  },
};
</script>

<template>
  <div>
    <button class="NotificationBtn" @click="Toast">View Active Sessions</button>
  </div>
</template>