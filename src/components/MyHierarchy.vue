<script>
/* eslint-disable */
import  Navbar from './MyNavigationBar.vue';
import MyGroupEquipmentComponent from './MyGroupEquipmentComponent.vue';
import Loading from './MyLoading.vue';
import * as RestAPI from '@/JS/RestAPI.js';
import { States } from '@/JS/Constants.js';
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
            this.BoolLoad = true
        },
        async AddStyles(object){
            if(object.Productivity_State == States._Productive ){
                    object["MyEquipmentColor"] = 'green';
                }
                else if(object.Productivity_State == States._Warning){
                    object["MyEquipmentColor"] = 'yellow';
                }
                else if(object.Productivity_State == States._Critical){
                    object["MyEquipmentColor"] = 'orange';
                }
                else if(object.Productivity_State == States._Non_Productive ){
                    object["MyEquipmentColor"] = 'red';
                }
                else if(object.Productivity_State == States._Spare ){
                    object["MyEquipmentColor"] = 'brown';
                }
                else if(object.Productivity_State == States._Ongoing_Repair){
                    object["MyEquipmentColor"] = 'blue';
                }
                else if(object.Productivity_State == States._Scrapped){
                    object["MyEquipmentColor"] = 'violet';
                }
                object["MyEquipmentHeight"] = 200;
                object["MyEquipmentWidth"] = 200;
                object["MyEquipmentLeftPosition"] = 300;
                object["MyModalTrigger"] = this.myTempModalTrigger;
        },
        async ReSummarizeEquipmentObject(object) {
            //loop through the object and get each child equipment
            this.arrAllEquipments.push(object);
            await this.AddStyles(object);
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
                await this.ReSummarizeEquipmentObject(object.ChildrenEquipment[key]);
            }
                return object;
        },



    },

    created(){
        this.GetEquipmentID();
        this.fnLoad();
        console.log(this.arrAllEquipments)
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
                    :MyGrpEquipHeight="iChildEquip.MyEquipmentHeight"
                    :MyGrpEquipWidth="iChildEquip.MyEquipmentWidth"
                    :MyGrpEquipLeftPosition="iChildEquip.MyEquipmentLeftPosition"
                    :MyGrpEquipColor="iChildEquip.MyEquipmentColor"
                    :MyModalTrigger="iChildEquip.MyModalTrigger"
                    :ParentEquip_ID="iChildEquip.ParentEquipmentID"
                />
        </div>
    </div>
</template>
