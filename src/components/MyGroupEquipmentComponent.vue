<script>
/* eslint-disable */
import MyEquipmentComponent from './MyEquipmentComponent.vue'
// import Loading from './MyLoading.vue';
export default {
    name: 'MyGroupEquipmentComponent',
    data() {
        return {
            MyEquipmentComponentEquipmentID: '',
            MyEquipmentComponentMES_State: '',
            MyEquipmentComponentEUMS_State: '',
            MyEquipmentComponentEquipment_Model: '',
            MyEquipmentComponentProductivity_State: '',
            MyEquipmentComponentPart_Type: '',
            MyEquipmentComponentClassification: '',
            MyEquipmentComponentChildrenEquipment: {},
            MyEquipmentComponentChildrenEquipmentConfig: {},
            MyEquipmentComponentChildrenEquipmentUsage: {},
            MyEquipmentComponentModalID: '',
            MyEquipmentParentEquipment_ID: '',
            oTempChildEquipments: {},
            oChildEquipments: {},
            oChildEquipComponent: {},
            arrChildEquipments: [],
            TempBool: false,
            arrTest: [],
        }
    },
    components: { 
        MyEquipmentComponent,
        // Loading
    },
    props:{
        Equipment_ID: String,
        MES_State: String,
        EUMS_State: String,
        Equipment_Model: String,
        Productivity_State: String,
        PartType: String,
        Classification: String,
        ChildrenEquipment: Object,
        ChildrenEquipmentConfig: Object,
        EquipmentUsage: Object,
        MyModalTrigger: String,
        ParentEquip_ID: String,

        MyGrpEquipHeight: Number,
        MyGrpEquipWidth: Number,
        MyGrpEquipLeftPosition: Number,
        MyGrpEquipColor: String,
    },
    watch: {
    },
    methods:{
    },
    mounted(){
    },
    updated(){    
    },
    created(){     
    }
}
</script>
<template>
    <div>
        <!-- <div v-if="!TempBool">
        <Loading />
        </div> -->
        <div>
            <!-- :MyEquipHeight="this.MyGrpEquipHeight"
                :MyEquipWidth="this.MyGrpEquipWidth"
                :MyEquipLeftPosition="this.MyGrpEquipLeftPosition"
                :MyEquipColor="this.MyGrpEquipColor"
                :MyModalTrigger="this.MyEquipmentComponentModalID" -->
            <MyEquipmentComponent 
                v-on="$listeners"
                :Equipment_ID="Equipment_ID"
                :MES_State="MES_State"
                :EUMS_State="EUMS_State" 
                :Productivity_State="Productivity_State"
                :Equipment_Model="Equipment_Model"
                :PartType="PartType"
                :Classification="Classification"
                :ChildrenEquipment="ChildrenEquipment"
                :ChildrenEquipmentConfig="ChildrenEquipmentConfig"
                :EquipmentUsage="EquipmentUsage"
                :MyEquipHeight="MyGrpEquipHeight"
                :MyEquipWidth="MyGrpEquipWidth"
                :MyEquipLeftPosition="MyGrpEquipLeftPosition"
                :MyEquipColor="MyGrpEquipColor"
                :MyModalId="MyModalTrigger"
                :ParentEquipment_ID="ParentEquip_ID"
            />
        </div>
    </div>
</template>