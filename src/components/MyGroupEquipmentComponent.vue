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

        MyGrpEquipHeight: Number,
        MyGrpEquipWidth: Number,
        MyGrpEquipLeftPosition: Number,
        MyGrpEquipColor: String,
    },
    watch: {
        EquipmentResult: {
            deep: true,
            handler(val) {
                this.MyEquipmentComponentEquipmentResult = val;
                this.GetChildEquipment();
            }
        },
        Equipment_ID: {
            deep: true,
            handler(val) {
                this.MyEquipmentComponentEquipmentID = val;
            }
        },
        MES_State: {
            deep: true,
            handler(val) {
                this.MyEquipmentComponentMES_State = val;
            }
        },
        EUMS_State: {
            deep: true,
            handler(val) {
                this.MyEquipmentComponentEUMS_State = val;
            }
        },
        Equipment_Model: {
            deep: true,
            handler(val) {
                this.MyEquipmentComponentEquipment_Model = val;
            }
        },
        Productivity_State: {
            deep: true,
            handler(val) {
                this.MyEquipmentComponentProductivity_State = val;
            }
        },
        PartType: {
            deep: true,
            handler(val) {
                this.MyEquipmentComponentPart_Type = val;
            }
        },
        Classification: {
            deep: true,
            handler(val) {
                this.MyEquipmentComponentClassification = val;
            }
        },
        ChildrenEquipment: {
            deep: true,
            handler(val) {
                this.MyEquipmentComponentChildrenEquipment = val;
            }
        },
        ChildrenEquipmentConfig: {
            deep: true,
            handler(val) {
                this.MyEquipmentComponentChildrenEquipmentConfig = val;
            }
        },
        EquipmentUsage: {
            deep: true,
            handler(val) {
                this.MyEquipmentComponentChildrenEquipmentUsage = val;
            }
        },
        MyModalTrigger: {
            deep: true,
            handler(val) {
                this.MyEquipmentComponentModalID = val;
            }
        },

        MyGrpEquipHeight: {
            deep: true,
            handler(val) {
                this.MyEquipmentComponentHeight = val;
            }
        },
        MyGrpEquipWidth: {
            deep: true,
            handler(val) {
                this.MyEquipmentComponentWidth = val;
            }
        },
        MyGrpEquipLeftPosition: {
            deep: true,
            handler(val) {
                this.MyEquipmentComponentLeftPosition = val;
            }
        },
        MyGrpEquipColor: {
            deep: true,
            handler(val) {
                this.MyEquipmentComponentColor = val;
            }
        },
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
                :Equipment_ID="Equipment_ID"
                :MES_State="MES_State"
                :EUMS_State="EUMS_State" 
                :Productivity_State="Productivity_State"
                :Equipment_Model="Equipment_Model"
                :PartType="Part_Type"
                :Classification="Classification"
                :ChildrenEquipment="ChildrenEquipment"
                :ChildrenEquipmentConfig="ChildrenEquipmentConfig"
                :EquipmentUsage="ChildrenEquipmentUsage"
            />
        </div>
    </div>
</template>