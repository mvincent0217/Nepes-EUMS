<script>
import  Navbar from './MyNavigationBar.vue';
import CardStatus from './MyCardStatus.vue';
import MyGroupEquipmentComponent from './MyGroupEquipmentComponent.vue';
import MyTable from './MyTable.vue';
import * as RestAPI from '@/JS/RestAPI.js';
export default {
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
            GetTempEquipmentResult: Object,
            myTempModalTrigger: '',
            GetProductivityStateResult: '',
        
            ButtonValue: '',
            tempBool: false,

            //Style Config//
            MyEquipmentHeight: Number,
            MyEquipmentWidth: Number,
            MyEquipmentLeftPosition: Number,
            MyEquipmentColor: String,
            tempColor: String,

          
        }
    },
    components:{
        Navbar,
        CardStatus,
        MyTable,
        MyGroupEquipmentComponent,
    },
    methods:{
        async fnLoad(){
            this.myTempModalTrigger = 'MyModal';

            this.MyEquipmentHeight = 150;
            this.MyEquipmentWidth = 150;
            this.MyEquipmentLeftPosition = 350;
            this.MyEquipmentColor = 'yellow';
        },
        async GetEquipmentID(){
            this.GetTempEquipmentResult = await RestAPI.GetEquipmentID(this.GetTempEquipmentID);
            this.GetTempEquipmentResult = JSON.parse(this.GetTempEquipmentResult.data);
            // this.GetTempChildEquipResult = JSON.parse(this.GetTempEquipmentResult.Equipment_ID.data);
            console.log(this.GetTempEquipmentResult);
            // console.log(this.GetTempChildEquipResult);
            Object.values(this.GetTempEquipmentResult).forEach(element =>{
                console.log(this.GetTempEquipmentResult)
                var o = {};
                o = this.GetTempEquipmentResult;
                if(element.Classification=='PRODUCTIVE'){
                    this.tempColor = 'green';
                }else if(element.Classification=='WARNING'){
                    this.tempColor = 'yellow'
                }
                else if(element.Classification=='CRITICAL'){
                    this.tempColor = 'red'
                }else if(element.Classification=='NON-PRODUCTIVE'){
                    this.tempColor = 'Black'
                }else if(element.Classification=='ONGOING-REPAIR'){
                    this.tempColor = 'orange'
                }else if(element.Classification=='SCRAPPED'){
                    this.tempColor = 'violet'
                }
                o['MyEquipmentColor'] = this.tempColor;
                o['MyEquipmentHeight'] = 100;
                o['MyEquipmentWidth'] = 100;
                o['MyEquipmentLeftPosition'] = 100;
                console.log(this.color)
            })
            // for()
            // {
            //     var o = {};
            //     o = this.GetEquipmentsResult[i];
            //     o['MyEquipmentHeight'] = 150;
            //     if(Productivity_State=='PRODUCTIVE'){
            //         color = 'green'
            //     }
            //     o['MyEquipmentColor'] = color;
            // }
        },
        async GetAllEquipment(){
            this.GetEquipmentsResult = await RestAPI.GetAllEquipments();
            this.GetEquipmentsResult = JSON.parse(this.GetEquipmentsResult.data);

            Object.values(this.GetEquipmentsResult).forEach(element => {
                console.log(element)
           
              if (element.Productivity_State == "PRODUCTIVE")
              {
                this.CountProductive += 1
              }

              else if (element.Productivity_State == "WARNING")
              {
                this.CountWarning += 1
              }

              else if (element.Productivity_State == "CRITICAL")
              {
                this.CountCritical += 1
              }

              else if (element.Productivity_State == "NON-PRODUCTIVE")
              {
                this.CountNonProductive += 1
              }
              else if (element.Productivity_State == "SPARE")
              {
                this.CountSpare += 1
              }
              else if (element.Productivity_State == "ONGOING-REPAIR")
              {
                this.CountOngoingRepair += 1
              }
              else if (element.Productivity_State == "SCRAPPED")
              {
                this.CountScrapped += 1
              }
                
            });

        },
        async GetProductivityStates(){
            this.GetProductivityStateResult = await RestAPI.GetProductivityStates();
            this.GetProductivityStateResult = JSON.parse(this.GetProductivityStateResult.data);
        },
        handleCardStatusButtonClick(cardTitle) {
            // console.log(`${cardTitle}`);
            this.ButtonValue = cardTitle
            // console.log(this.ButtonValue)
        },
        handleEquipmentIdSelected(equipmentId) {
            this.GetTempEquipmentID = equipmentId
            console.log(this.GetTempEquipmentID)
            alert(this.GetTempEquipmentID)
      
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
            <Navbar/>
            <br>
            <!--Status Cards-->
            <div id="parent">
                <div v-for="(state, index) in GetProductivityStateResult" :key="index" class="child">
                    
                    <CardStatus
                    :CardTitle="state"
                    :CardNumber="CountProductive"
                    :bgcolorCard="'Green'"
                    v-if="state === 'PRODUCTIVE' ? true : false"
                    :CountProductive="CountProductive"
                    :buttonFunction="handleCardStatusButtonClick"
                    />

                    <CardStatus
                    :CardTitle="state"
                    :CardNumber="CountWarning"
                    :bgcolorCard="'Yellow'"
                    v-if="state === 'WARNING' ? true : false"
                    :CountWarning="CountWarning"
                    :buttonFunction="handleCardStatusButtonClick"
                    />

                    <CardStatus
                    :CardTitle="state"
                    :CardNumber="CountCritical"
                    :bgcolorCard="'Red'"
                    v-if="state === 'CRITICAL' ? true : false"
                    :CountCritical="CountCritical"
                    :buttonFunction="handleCardStatusButtonClick"
                    />

                    <CardStatus
                    :CardTitle="state"
                    :CardNumber="CountNonProductive"
                    :bgcolorCard="'Black'"
                    v-if="state === 'NON-PRODUCTIVE' ? true : false"
                    :CountNonProductive="CountNonProductive"
                    :buttonFunction="handleCardStatusButtonClick"
                    />

                    <CardStatus
                    :CardTitle="state"
                    :CardNumber="CountSpare"
                    :bgcolorCard="'Blue'"
                    v-if="state === 'SPARE' ? true : false"
                    :CountSpare="CountSpare"
                    :buttonFunction="handleCardStatusButtonClick"
                    />

                    <CardStatus
                    :CardTitle="state"
                    :CardNumber="CountOngoingRepair"
                    :bgcolorCard="'orange'"
                    v-if="state === 'ONGOING-REPAIR' ? true : false"
                    :CountOngoingRepair="CountOngoingRepair"
                    :buttonFunction="handleCardStatusButtonClick"
                    />

                    <CardStatus
                    :CardTitle="state"
                    :CardNumber="CountScrapped"
                    :bgcolorCard="'purple'"
                    v-if="state === 'SCRAPPED' ? true : false"
                    :CountScrapped="CountScrapped"
                    :buttonFunction="handleCardStatusButtonClick"
                    />
            </div>
            </div>
            <!--Status Cards-->
            
            <!-- My Table -->
            <div>
                <br><br><br>
                <MyTable :equipmentData="GetEquipmentsResult" :ButtonValue="this.ButtonValue"  @equipmentIdSelected="handleEquipmentIdSelected"/>
            </div>
            <!-- My Table -->
           
            <br>
                 <MyGroupEquipmentComponent 
                    v-on="$listeners"
                    :EquipmentResult="this.GetTempEquipmentResult"
                    :MyModalTrigger="this.myTempModalTrigger"
                    :Equipment_ID="this.GetTempEquipmentResult.Equipment_ID"
                    :MES_State="this.GetTempEquipmentResult.MES_State"
                    :EUMS_State="this.GetTempEquipmentResult.EUMS_State" 
                    :Productivity_State="this.GetTempEquipmentResult.Productivity_State"
                    :Equipment_Model="this.GetTempEquipmentResult.Equipment_Model"
                    :PartType="this.GetTempEquipmentResult.Part_Type"
                    :Classification="this.GetTempEquipmentResult.Classification"
                    :ChildrenEquipment="this.GetTempEquipmentResult.ChildrenEquipment"
                    :ChildrenEquipmentConfig="this.GetTempEquipmentResult.ChildEquipmentConfig"
                    :EquipmentUsage="this.GetTempEquipmentResult.EquipmentUsage"

                    :MyGrpEquipHeight="this.MyEquipmentHeight"
                    :MyGrpEquipWidth="this.MyEquipmentWidth"
                    :MyGrpEquipLeftPosition="this.MyEquipmentLeftPosition"
                    :MyGrpEquipColor="this.MyEquipmentColor"
                />
        </div>
    </div>
</template>
