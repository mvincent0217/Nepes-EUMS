<script>
/* eslint-disable */
import MyEquipmentComponent from './MyEquipmentComponent.vue'
export default {
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
        };
    },
    components: { 
        MyEquipmentComponent 
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
    },
    watch: {
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
                console.log(val);
            }
        },
        methods:{
        }
    },
    methods:{
        getPath(object, search) {
            //loop through the object
            for(var ChildEquipConfigkey in object){
                for(var i =0; i<= object[ChildEquipConfigkey].length; i++){
                    var tempEquipment = object[ChildEquipConfigkey][i];
                        if (tempEquipment.ChildrenEquipment === search) return [tempEquipment.Equipment_ID];
                            else if ((tempEquipment.ChildrenEquipment) || Array.isArray(object)) {
                            let children = Array.isArray(tempEquipment) ? tempEquipment : tempEquipment.ChildrenEquipment;
                            for (let child of tempEquipment.ChildrenEquipment) {
                                let result = getPath(child, search);
                                if (result) {
                                    if (tempEquipment.ChildrenEquipment)result.unshift(tempEquipment.Equipment_ID);
                                    return result;
                                }
                            }
                        }
                }
            }
        },
        GetEquipmentTree(){
            var temp = this.GetChildrenEquipment(this.MyEquipmentComponentChildrenEquipmentConfig,this.MyEquipmentComponentChildrenEquipment);
            var temp2 = this.getPath(temp, 'ChildrenEquipment')
            console.log(temp2);
        },
        GetChildrenEquipment(EquipmentConfig,ChildrenEquipment){
            //console.log(this.MyEquipmentComponentChildrenEquipmentConfig)
            //console.log(this.MyEquipmentComponentChildrenEquipment)
            
            for(var ChildEquipConfigkey in EquipmentConfig){
                var oEquipmentConfig = {};
                oEquipmentConfig = EquipmentConfig[ChildEquipConfigkey];
                //PLB-001, PLB-002
                //console.log('1st loop: ' + ChildEquipConfigkey);
                for(var ChildEquipKey in ChildrenEquipment){
                    //console.log(this.MyEquipmentComponentChildrenEquipment[ChildEquipKey]);
                    var oEquipment = {};
                    oEquipment = ChildrenEquipment[ChildEquipKey];
                    if(oEquipment.Equipment_Model == oEquipmentConfig.Child_Equipment_Model){
                        //console.log(oEquipment.Equipment_Model);
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
    updated(){
        //this.GetChildrenEquipment();
        this.GetEquipmentTree();
    },
    created(){        
    }
}
</script>
<template>
    <div>
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
            />
        </div>
        <br>
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
            />
        </div>
    </div>
</template>