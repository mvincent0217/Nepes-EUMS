<script>
import  Navbar from './MyNavigationBar.vue';
import CardStatus from './MyCardStatus.vue';
import * as RestAPI from '@/JS/RestAPI.js';
import MyGroupEquipmentComponent from './MyGroupEquipmentComponent.vue';
export default {
    data() {
        return {            
            CountProductivityState: '',
            EquipmentStatus: '',
            GetEquipmentsResult: '',

            // Click specific Equipment ID
            GetTempEquipmentID: 'PLT-003-03',
            GetTempEquipmentResult: '',
            myTempModalTrigger: '',
            GetProductivityStateResult: '',
            // text: ''
        }
    },
    components:{
        Navbar,
        CardStatus,
        MyGroupEquipmentComponent,
    },
    methods:{
        async fnLoad(){
            this.myTempModalTrigger = 'MyModal';
           
        },
        async GetEquipmentID(){
            this.GetTempEquipmentResult = await RestAPI.GetEquipmentID(this.GetTempEquipmentID);
            this.GetTempEquipmentResult = JSON.parse(this.GetTempEquipmentResult.data);
        },
        async GetAllEquipment(){
            this.GetEquipmentsResult = await RestAPI.GetAllEquipments();
            this.GetEquipmentsResult = JSON.parse(this.GetEquipmentsResult.data);
            Object.values(this.GetEquipmentsResult).forEach(element => {
                console.log(element);
                
            });
        },
        async GetProductivityStates(){
            this.GetProductivityStateResult = await RestAPI.GetProductivityStates();
            this.GetProductivityStateResult = JSON.parse(this.GetProductivityStateResult.data);
        },

    },
    mounted(){
        this.fnLoad();
        this.GetProductivityStates();
    },
    created(){
        this.GetAllEquipment();
        this.GetEquipmentID();
    },

}
</script>


<template>
    <div>
        <div>
            <Navbar/>
            <br>            
            <div id="parent">
               
                <table class="child" v-for="(ProductiveState,index) in GetProductivityStateResult" :key="index" >
                    <div class="child">
                        <CardStatus :CardTitle="ProductiveState"/>
                    </div>
                </table>
            </div>
            <br>
                <MyGroupEquipmentComponent v-on="$listeners"
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
                />
        </div>
    </div>
</template>