<script>
import Navbar from './MyNavigationBar.vue';
import CardStatus from './MyCardStatus.vue';
import MyTable from './MyTable.vue';
import * as RestAPI from '@/JS/RestAPI.js';
import Loading from './MyLoading.vue';
import { EventBus } from '@/main.js';
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
        // async GetEquipmentID(){
        //     this.GetTempEquipmentResult = await RestAPI.GetEquipmentID(this.GetTempEquipmentID);
        //     this.GetTempEquipmentResult = JSON.parse(this.GetTempEquipmentResult.data);
        //     console.log(this.GetTempEquipmentResult);
        //     Object.values(this.GetTempEquipmentResult).forEach(element =>{
        //         console.log(this.GetTempEquipmentResult)
        //         var o = {};
        //         o = this.GetTempEquipmentResult;
        //         if(element.Classification == 'PRODUCTIVE')
        //         {this.tempColor = 'green';}
        //         else if(element.Classification == 'WARNING')
        //         {this.tempColor = 'yellow'}
        //         else if(element.Classification == 'CRITICAL')
        //         {this.tempColor = 'red'}
        //         else if(element.Classification == 'NON-PRODUCTIVE')
        //         {this.tempColor = 'Black'}
        //         else if(element.Classification == 'ONGOING-REPAIR')
        //         {this.tempColor = 'orange'}
        //         else if(element.Classification == 'SCRAPPED')
        //         {this.tempColor = 'violet'}
        //         o['MyEquipmentColor'] = this.tempColor;
        //         o['MyEquipmentHeight'] = 70;
        //         o['MyEquipmentWidth'] = 100;
        //         o['MyEquipmentLeftPosition'] = 100;
        //         console.log(this.color)
        //     })
        //     // for()
        //     // {
        //     //     var o = {};
        //     //     o = this.GetEquipmentsResult[i];
        //     //     o['MyEquipmentHeight'] = 150;
        //     //     if(Productivity_State=='PRODUCTIVE'){
        //     //         color = 'green'
        //     //     }
        //     //     o['MyEquipmentColor'] = color;
        //     // }
        // },
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
        EventBus.$emit('equipment-id-changed', equipmentId);
        this.$router.push('/hierarchy');
    },


    },
    mounted(){
        this.GetProductivityStates();
    },
    created(){
        this.GetAllEquipment();
        this.GetEquipmentID();
        this.fnLoad();
      
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
