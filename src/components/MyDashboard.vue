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
      GetTempEquipmentID: 'PLT-003-03',
      GetTempEquipmentResult: {},
      myTempModalTrigger: '',
      GetProductivityStateResult: '',
      ButtonValue: '',
    };
  },
  methods: {
    async fnLoad() {
      this.myTempModalTrigger = 'MyModal';
    },
    async GetEquipmentID() {
      this.GetTempEquipmentResult = await RestAPI.GetEquipmentID(
        this.GetTempEquipmentID
      );
      this.GetTempEquipmentResult = JSON.parse(
        this.GetTempEquipmentResult.data
      );
      console.log(this.GetTempEquipmentResult);
    },
    async GetAllEquipment() {
      this.GetEquipmentsResult = await RestAPI.GetAllEquipments();
      this.GetEquipmentsResult = JSON.parse(this.GetEquipmentsResult.data);
      Object.values(this.GetEquipmentsResult).forEach((element) => {
              if (element.Productivity_State == 'PRODUCTIVE') {
              this.CountProductive += 1;
              } else if (element.Productivity_State == 'WARNING') {
              this.CountWarning += 1;
              } else if (element.Productivity_State == 'CRITICAL') {
              this.CountCritical += 1;
              } else if (element.Productivity_State == 'NON-PRODUCTIVE') {
              this.CountNonProductive += 1;
              } else if (element.Productivity_State == "SPARE")
              {this.CountSpare += 1}
              else if (element.Productivity_State == "ONGOING-REPAIR")
              {this.CountOngoingRepair += 1}
              else if (element.Productivity_State == "SCRAPPED")
              {this.CountScrapped += 1} });
        },
        async GetProductivityStates(){
            this.GetProductivityStateResult = await RestAPI.GetProductivityStates();
            this.GetProductivityStateResult = JSON.parse(this.GetProductivityStateResult.data);
        },
        handleCardStatusButtonClick(cardTitle) {
            // console.log(`${cardTitle}`);
            this.ButtonValue = `${cardTitle}`
            // console.log(this.ButtonValue)
        },
        handleEquipmentIdSelected(equipmentId) {
        this.GetTempEquipmentID = equipmentId;
        this.$emit('equipmentIdSelected', this.GetTempEquipmentID);
        alert(this.GetTempEquipmentID)
        // this.$router.push('/hierarchy');
        },

    },
    mounted(){
        this.fnLoad();
        this.GetProductivityStates();
    },
    created(){
        this.GetAllEquipment();
      
    }
}
</script>


<template>
    <div>
      <div>
        <Navbar />
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
