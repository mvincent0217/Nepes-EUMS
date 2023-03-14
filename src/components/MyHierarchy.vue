<script>
import  Navbar from './MyNavigationBar.vue';
import MyGroupEquipmentComponent from './MyGroupEquipmentComponent.vue';
import MyEquipmentComponent from './MyEquipmentComponent.vue';
// import Mydash from './MyDashboard.vue';
import * as RestAPI from '@/JS/RestAPI.js';
export default {
    data() {
        return {
            GetTempEquipmentID: 'PLT-003-03',
            GetTempEquipmentResult: {},
            myTempModalTrigger: '',
        }
    },

    props: ['equipmentId'],
    
    components:{
        Navbar,
        MyGroupEquipmentComponent,
        MyEquipmentComponent
        // Mydash
    },
   
    methods:{
        async fnLoad(){
            this.myTempModalTrigger = 'MyModal';
        },
        async GetEquipmentID(){
            this.GetTempEquipmentResult = await RestAPI.GetEquipmentID(this.GetTempEquipmentID);
            this.GetTempEquipmentResult = JSON.parse(this.GetTempEquipmentResult.data);
            // console.log(this.GetTempEquipmentResult)
        },


    },
    mounted(){
        this.fnLoad();
  
    },
    created(){
       
        this.GetEquipmentID();
        console.log(this.equipmentId);
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
                 <MyGroupEquipmentComponent v-on="$listeners"
                    :EquipmentResult="this.GetTempEquipmentResult"
                    :MyModalId="this.myTempModalTrigger"
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
                /><MyEquipmentComponent/>
        </div>
    </div>
</template>
