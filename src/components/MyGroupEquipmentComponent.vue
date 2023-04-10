<script>
/* eslint-disable */
import MyEquipmentComponent from './MyEquipmentComponent.vue'
// import Loading from './MyLoading.vue';
export default {
    name: 'MyGroupEquipmentComponent',
    data() {
        return {
        }
    },
    components: { 
        MyEquipmentComponent,
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
        EquipmentLevel: Number,

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
        <div>
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
                :EquipmentLevel="EquipmentLevel"
            />
        </div>
    </div>
</template>