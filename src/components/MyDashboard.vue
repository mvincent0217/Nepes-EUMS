<script>
import Navbar from './MyNavigationBar.vue';
import CardStatus from './MyCardStatus.vue';
import MyTable from './MyTable.vue';
import * as RestAPI from '@/JS/RestAPI.js';
import Loading from './MyLoading.vue';
export default {
  components: {
    Navbar,
    CardStatus,
    MyTable,
    Loading
  },
  data() {
    return {
      //-------- Productivity Status
      CountProductive: 0,
      CountWarning: 0,
      CountCritical: 0,
      CountNonProductive: 0,
      CountSpare: 0,
      CountOngoingRepair: 0,
      CountScrapped: 0,
      //-------- Productivity Status

      EquipmentStatus: '',
      GetEquipmentsResult: Object,

            // Click specific Equipment ID
            GetTempEquipmentID: '',
            GetTempEquipmentResult: Object,
            myTempModalTrigger: '',
            GetProductivityStateResult: '',
        
            ButtonValue: '',
            tempBool: false,
        }
    },
    methods:{
        async fnLoad(){
            this.myTempModalTrigger = 'MyModal';
        },
        async GetAllEquipment(){
            this.GetEquipmentsResult = await RestAPI.GetAllEquipments();
            this.GetEquipmentsResult = JSON.parse(this.GetEquipmentsResult.data);

            Object.values(this.GetEquipmentsResult).forEach(element => {
                // console.log(element)
           
              if (element.Productivity_State == "PRODUCTIVE")
              {this.CountProductive += 1 }
              else if (element.Productivity_State == "WARNING")
              {this.CountWarning += 1}
              else if (element.Productivity_State == "CRITICAL")
              {this.CountCritical += 1}
              else if (element.Productivity_State == "NON-PRODUCTIVE")
              {this.CountNonProductive += 1}
              else if (element.Productivity_State == "SPARE")
              {this.CountSpare += 1}
              else if (element.Productivity_State == "ONGOING-REPAIR")
              {this.CountOngoingRepair += 1}
              else if (element.Productivity_State == "SCRAPPED")
              {this.CountScrapped += 1} 
            });
        },
        async GetProductivityStates(){
            this.GetProductivityStateResult = await RestAPI.GetProductivityStates();
            this.GetProductivityStateResult = JSON.parse(this.GetProductivityStateResult.data);
        },
        handleCardStatusButtonClick(cardTitle) {
            this.ButtonValue = `${cardTitle}`
        },
        handleEquipmentIdSelected(equipmentId) {
         localStorage.setItem('equipmentId', equipmentId);
         this.AddSession();
         this.$router.push('/hierarchy');
        },

        async AddSession() {
        this.userID = localStorage.getItem('userID');
        localStorage.setItem('sessionID', (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '_' + localStorage.getItem('equipmentId')));
        this.sessionID = localStorage.getItem('sessionID');
        const currentDate = new Date();
        const expiryDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
        this.AddSessionResult = await RestAPI.AddSession(this.userID, this.sessionID, expiryDate);
        console.log(this.AddSessionResult);
    }



    },
    mounted(){
        this.GetProductivityStates();
    },
    created(){
        this.GetAllEquipment();
        this.fnLoad();
      
    }
}
</script>


<template>
    <div>
      <div>
        <Navbar/>
        <br>
        <CardStatus
          :productivityStateResult="GetProductivityStateResult"
          :CountProductive="CountProductive"
          :CountWarning="CountWarning"
          :CountCritical="CountCritical"
          :CountNonProductive="CountNonProductive"
          :CountSpare="CountSpare"
          :CountOngoingRepair="CountOngoingRepair"
          :CountScrapped="CountScrapped"
          :buttonFunction="handleCardStatusButtonClick"
        />
        <div v-if="!GetProductivityStateResult">
        <Loading />
        </div>
        <div>
          <br><br><br>
          <MyTable
            :equipmentData="GetEquipmentsResult"
            :ButtonValue="this.ButtonValue"
            @equipmentIdSelected="handleEquipmentIdSelected"
          />
        </div>
        <br>
      </div>
    </div>
  </template>
