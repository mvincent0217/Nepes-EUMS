<template>
    <div>
      <table-component :equipmentData="equipmentData" :productivityState="'PRODUCTIVE'" />
    </div>
  </template>
  
  <script>
  import TableComponent from './MyTable.vue';
  
  export default {
    components: {
      TableComponent,
    },
    data() {
      return {
        equipmentData: [
          {
            Equipment_ID: 1,
            MES_State: 'OFF',
            EUMS_State: 'ON',
            Productivity_State: 'PRODUCTIVE',
          },
          {
            Equipment_ID: 2,
            MES_State: 'OFF',
            EUMS_State: 'OFF',
            Productivity_State: 'NON-PRODUCTIVE',
          },
          {
            Equipment_ID: 3,
            MES_State: 'ON',
            EUMS_State: 'ON',
            Productivity_State: 'PRODUCTIVE',
          },
        ],
      };
    },
  };
  </script>
  