<script>
import  Navbar from './MyNavigationBar.vue';
import MyGroupEquipmentComponent from './MyGroupEquipmentComponent.vue';
// import Mydash from './MyDashboard.vue';
import { EventBus } from '@/main.js';
import * as RestAPI from '@/JS/RestAPI.js';
export default {
    data() {
        return {
            GetTempEquipmentID: 'PLT-003-03',
            GetTempEquipmentResult: {},
            myTempModalTrigger: '',

            //Style Config//
            MyEquipmentHeight: 0,
            MyEquipmentWidth: 0,
            MyEquipmentLeftPosition: 0,
            tempColor: '',
            equipmentIdLocal: ''
        }
    },

    props: ['equipmentId'],
    
    mounted() {
    // console.log(this.$props.equipmentId);
    },
    
    components:{
        Navbar,
        MyGroupEquipmentComponent,
        // Mydash
    },
   
    methods:{
        async fnLoad(){
            this.myTempModalTrigger = 'MyModal';

            this.MyEquipmentHeight = 250;
            this.MyEquipmentWidth = 250;
            this.MyEquipmentLeftPosition = 350;
            this.tempColor = 'yellow';
        },
        async GetEquipmentID(){
            this.GetTempEquipmentResult = await RestAPI.GetEquipmentID(this.GetTempEquipmentID);
            this.GetTempEquipmentResult = JSON.parse(this.GetTempEquipmentResult.data);
            Object.values(this.GetTempEquipmentResult).forEach(element =>{
                var o = {};
                o = this.GetTempEquipmentResult;
                if(element.Productivity_State == 'PRODUCTIVE'){
                    this.tempColor = 'green';
                }
                else if(element.Productivity_State == 'WARNING'){
                    this.tempColor = 'yellow'
                }
                else if(element.Productivity_State == 'CRITICAL'){
                    this.tempColor = 'red'
                }
                else if(element.Productivity_State == 'NON-PRODUCTIVE'){
                    this.tempColor = 'Black'
                }
                else if(element.Productivity_State == 'ONGOING-REPAIR'){
                    this.tempColor = 'orange'
                }
                else if(element.Productivity_State == 'SCRAPPED'){
                    this.tempColor = 'violet'
                }
                o['MyEquipmentColor'] = this.tempColor;
                o['MyEquipmentHeight'] = 100;
                o['MyEquipmentWidth'] = 100;
                o['MyEquipmentLeftPosition'] = 100;
                // console.log(this.tempColor)
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
        updateComponent() {
        // Use this.equipmentIdLocal to update the component
        console.log(this.equipmentIdLocal);
        }


    },

    created(){
        this.GetEquipmentID();
        this.fnLoad();
        this.equipmentIdLocal = this.equipmentId;
        EventBus.$on('equipment-id-changed', (equipmentId) => {
        this.equipmentIdLocal = equipmentId;
        // Call a method to update the component using the new equipmentId
        this.updateComponent();
        });
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
                    :MyGrpEquipHeight="MyEquipmentHeight"
                    :MyGrpEquipWidth="MyEquipmentWidth"
                    :MyGrpEquipLeftPosition="MyEquipmentLeftPosition"
                    :MyGrpEquipColor="tempColor"
                />
        </div>
    </div>
</template>
