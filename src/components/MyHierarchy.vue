<script>
/* eslint-disable */
import  Navbar from './MyNavigationBar.vue';
import MyGroupEquipmentComponent from './MyGroupEquipmentComponent.vue';
import Loading from './MyLoading.vue';
import * as RestAPI from '@/JS/RestAPI.js';
export default {
    data() {
        return {
            GetTempEquipmentID: '',
            GetTempEquipmentResult: {},
            myTempModalTrigger: '',
            arrAllEquipments: [],
            BoolLoad: false,

            //Style Config//
            MyEquipmentHeight: 0,
            MyEquipmentWidth: 0,
            MyEquipmentLeftPosition: 0,
            tempColor: '',
           
        }
    },

 
    mounted() {

    },
    
    components:{
        Navbar,
        MyGroupEquipmentComponent,
        Loading,
    },
   
    methods:{
        async fnLoad(){
            this.myTempModalTrigger = 'MyModal';
        },
        async GetEquipmentID(){
            const equipmentId = localStorage.getItem('equipmentId');
            this.GetTempEquipmentID = equipmentId;
            this.GetTempEquipmentResult = await RestAPI.GetEquipmentID(this.GetTempEquipmentID);
            this.GetTempEquipmentResult = JSON.parse(this.GetTempEquipmentResult.data);
            var object = await this.ReSummarizeEquipmentObject(this.GetTempEquipmentResult)
                var o = {};
                o = this.GetTempEquipmentResult;
                if(this.GetTempEquipmentResult.Productivity_State == 'PRODUCTIVE'){
                    this.tempColor = '#90EE90';
                }
                else if(this.GetTempEquipmentResult.Productivity_State == 'WARNING'){
                    this.tempColor = 'yellow'
                }
                else if(this.GetTempEquipmentResult.Productivity_State == 'CRITICAL'){
                    this.tempColor = 'red'
                }
                else if(this.GetTempEquipmentResult.Productivity_State == 'NON-PRODUCTIVE'){
                    this.tempColor = 'Black'
                }
                else if(this.GetTempEquipmentResult.Productivity_State == 'ONGOING-REPAIR'){
                    this.tempColor = 'orange'
                }
                else if(this.GetTempEquipmentResult.Productivity_State == 'SCRAPPED'){
                    this.tempColor = 'violet'
                }
                o['MyEquipmentColor'] = this.tempColor;
                o['MyEquipmentHeight'] = 100;
                o['MyEquipmentWidth'] = 100;
                o['MyEquipmentLeftPosition'] = 100;
        },
        async ReSummarizeEquipmentObject(object) {
            //loop through the object and get each child equipment
            this.arrAllEquipments.push(object);
            for (var key in object.ChildrenEquipment) {
                var iChildCount = 0;
                //Count the number of child of the next node
                iChildCount = Object.keys(object.ChildrenEquipment[key].ChildrenEquipment)
                    .length;
                //Add child count as attribute to the parent
                object.ChildrenEquipment[key]["ChildCount"] = iChildCount;
                //Add the parent equipment id to the current child equipment
                object.ChildrenEquipment[key]["ParentEquipmentID"] = object.Equipment_ID; 
                //Check if the next children has count
                //If 0 then it is the last child for that node
                var bLastEquipment = false;
                if (iChildCount === 0) {
                    bLastEquipment = true;
                }
                object.ChildrenEquipment[key]["LastEquipment"] = bLastEquipment;
                //call itself to check the next children equipment

                this.ReSummarizeEquipmentObject(object.ChildrenEquipment[key]);
            }
                return object;
        },



    },

    created(){
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
            <br>
            <a href="/dashboard#/dashboard">Back</a>
            <!--    :MyGrpEquipHeight="GetTempEquipmentResult.MyEquipmentHeight"
                    :MyGrpEquipWidth="GetTempEquipmentResult.MyEquipmentWidth"
                    :MyGrpEquipLeftPosition="GetTempEquipmentResult.MyEquipmentLeftPosition"
                    :MyGrpEquipColor="GetTempEquipmentResult.MyEquipmentColor"
                    :MyModalId="myTempModalTrigger" -->
                    <div v-if="!BoolLoad">
                        <Loading />
                    </div>
                 <MyGroupEquipmentComponent v-on="$listeners"
                 v-for="(iChildEquip, index) in arrAllEquipments" :key="index"
                    :Equipment_ID="iChildEquip.Equipment_ID"
                    :MES_State="iChildEquip.MES_State"
                    :EUMS_State="iChildEquip.EUMS_State" 
                    :Productivity_State="iChildEquip.Productivity_State"
                    :Equipment_Model="iChildEquip.Equipment_Model"
                    :PartType="iChildEquip.Part_Type"
                    :Classification="iChildEquip.Classification"
                    :ChildrenEquipment="iChildEquip.ChildrenEquipment"
                    :ChildrenEquipmentConfig="iChildEquip.ChildEquipmentConfig"
                    :EquipmentUsage="iChildEquip.EquipmentUsage"
                    
                />
        </div>
    </div>
</template>
