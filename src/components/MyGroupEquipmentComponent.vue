<script>
/* eslint-disable */
import MyEquipmentComponent from './MyEquipmentComponent.vue'
import MyChildrenEquipmentComponent from './MyChildrenEquipmentComponent.vue'
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

            skills: [
                {
                name: 'Frozen Yogurt',
                required: 1,
                vMode1: ''
                },
                {
                name: 'Ice cream sandwich',
                required: 3,
                vMode1: ''
                },
                {
                name: 'Eclair',
                required: 1,
                vMode1: ''
                }
            ],
        }
    },
    components: { 
        MyEquipmentComponent,
        MyChildrenEquipmentComponent,
        // Loading
    },
    props:{
        EquipmentResult: Object,
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
                console.log(val)
            }
        },
        MyGrpEquipColor: {
            deep: true,
            handler(val) {
                this.MyEquipmentComponentColor = val;
                console.log(val)
            }
        },
    },
    methods:{
        async GetChildEquipment(){
            const childEquipmentPropertyValues = await Object.values(this.EquipmentResult.ChildrenEquipment);
            this.arrChildEquipments = childEquipmentPropertyValues;
            this.TempBool = true;
        },
        ReSummarizeEquipmentObject(object) {
            //loop through the object and get each child equipment
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
        GetChildrenEquipment(EquipmentConfig,ChildrenEquipment){
            //console.log(this.MyEquipmentComponentChildrenEquipmentConfig)
            //console.log(this.MyEquipmentComponentChildrenEquipment)
            
            for(var ChildEquipConfigkey in EquipmentConfig){
                var oEquipmentConfig = {};
                oEquipmentConfig = EquipmentConfig[ChildEquipConfigkey];
                for(var ChildEquipKey in ChildrenEquipment){
                    var oEquipment = {};
                    oEquipment = ChildrenEquipment[ChildEquipKey];
                    if(oEquipment.Equipment_Model == oEquipmentConfig.Child_Equipment_Model){
                        if(null == this.oChildEquipments[ChildEquipConfigkey]){
                            var arTemp = [];
                            arTemp.push(oEquipment);
                            this.oChildEquipments[ChildEquipConfigkey] = arTemp;
                        }
                        else
                        {
                            var arTemp = [];
                            arTemp = this.oChildEquipments[ChildEquipConfigkey];
                            arTemp.push(oEquipment);
                        }
                    }
                } 
            }
            return this.oChildEquipments;
        },
    },
    mounted(){
    },
    updated(){
        // this.GetChildrenEquipment();
        // this.ReSummarizeEquipmentObject(this.EquipmentResult);
        // console.log(temp)
        // console.log(this.oChildEquipComponent)
        // const sample = Object.values(this.EquipmentResult.ChildrenEquipment)
        // console.log(sample)
        // var oTemp = {};
        // for(var x = 0; x < sample.length; x++){
        //     console.log(x)
        //     oTemp = sample[x].Equipment_ID;
        //     this.arrTest.push(oTemp);
        // }
        // console.log(this.arrTest)        
    },
    created(){        
        // this.EquipmentResult
        //For calling the function, use async await if it pass through.
        // var object = this.ReSummarizeEquipmentObject()
        // const myTimeout = setInterval(this.GetChildEquipment, 5000);
        // this.GetChildEquipment

    }
}
</script>
<template>
    <div>
        <!-- <div v-if="!TempBool">
        <Loading />
        </div> -->
        <div>
            <MyEquipmentComponent
                :MyModalTrigger="this.MyEquipmentComponentModalID"
                :Equipment_ID="this.MyEquipmentComponentEquipmentID"
                :MES_State="this.MyEquipmentComponentMES_State"
                :EUMS_State="this.MyEquipmentComponentEUMS_State" 
                :Productivity_State="this.MyEquipmentComponentProductivity_State"
                :Equipment_Model="this.MyEquipmentComponentEquipment_Model"
                :PartType="this.MyEquipmentComponentPart_Type"
                :Classification="this.MyEquipmentComponentClassification"
                :ChildrenEquipment="this.MyEquipmentComponentChildrenEquipment"
                :ChildrenEquipmentConfig="this.MyEquipmentComponentChildrenEquipmentConfig"
                :EquipmentUsage="this.MyEquipmentComponentChildrenEquipmentUsage"

                :MyEquipHeight="this.MyGrpEquipHeight"
                :MyEquipWidth="this.MyGrpEquipWidth"
                :MyEquipLeftPosition="this.MyGrpEquipLeftPosition"
                :MyEquipColor="this.MyGrpEquipColor"
            />
        </div>
        <br>
        <div>
            <!-- :MyEquipHeight="this.MyGrpEquipHeight"
                :MyEquipWidth="this.MyGrpEquipWidth"
                :MyEquipLeftPosition="this.MyGrpEquipLeftPosition"
                :MyEquipColor="this.MyGrpEquipColor"
                :MyModalTrigger="this.MyEquipmentComponentModalID" -->
            <MyEquipmentComponent
                v-for="(iChildEquip, index) in arrChildEquipments.length" :key="iChildEquip[index]"

                :Equipment_ID="arrChildEquipments[index].Equipment_ID"
                :MES_State="arrChildEquipments[index].MES_State"
                :EUMS_State="arrChildEquipments[index].EUMS_State" 
                :Productivity_State="arrChildEquipments[index].Productivity_State"
                :Equipment_Model="arrChildEquipments[index].Equipment_Model"
                :PartType="arrChildEquipments[index].Part_Type"
                :Classification="arrChildEquipments[index].Classification"
                :ChildrenEquipment="arrChildEquipments[index].ChildrenEquipment"
                :ChildrenEquipmentConfig="arrChildEquipments[index].ChildrenEquipmentConfig"
                :EquipmentUsage="arrChildEquipments[index].ChildrenEquipmentUsage"

                
            />
        </div>
    </div>
</template>