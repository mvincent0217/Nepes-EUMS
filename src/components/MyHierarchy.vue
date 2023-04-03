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
            arrAllEquipments: [],
            arrHierarchy: [],
            BoolLoad: false,
            level: 0,
            MyEquipmentHeight: 0,
            MyEquipmentWidth: 0,
            MyEquipmentLeftPosition: 0,
            tempColor: '',
        }
    },
    
    components:{
        Navbar,
        MyGroupEquipmentComponent,
        Loading,
    },
   
    methods:{
        async GetEquipmentID(){
            const equipmentId = localStorage.getItem('equipmentId');
            this.GetTempEquipmentID = equipmentId;
            this.GetTempEquipmentResult = await RestAPI.GetEquipmentID(this.GetTempEquipmentID);
            this.GetTempEquipmentResult = JSON.parse(this.GetTempEquipmentResult.data);
            var object = await this.ReSummarizeEquipmentObject(this.GetTempEquipmentResult)
            var obj = await this.ReSummarizeEquipmentChildObject();
            var tempobj = await this.buildHierarchy(this.arrAllEquipments)
            console.log(tempobj)
            this.BoolLoad = true

            // Get the sessionId value from the localStorage
            const sessionId = localStorage.getItem('sessionId');
            // Generate a new sessionId value
            const newSessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            // Store the new sessionId value in the localStorage
            localStorage.setItem('sessionId', newSessionId);
            // Check if the sessionId value has changed
            if (sessionId !== newSessionId) {
            alert('This equipment is already open in another browser.');
            }
        },
        async ReSummarizeEquipmentChildObject(){
            var level = 0;
            if(this.arrAllEquipments.length > 0)
            {
                for (var i = 0;  i < this.arrAllEquipments.length; i++)
                {
                    var oTemp = {};
                    oTemp = this.arrAllEquipments[i]; 
                    if(oTemp.ChildEquipmentConfig != null)
                    {
                        var oTempConfig = {};
                        oTempConfig = oTemp.ChildEquipmentConfig;
                        var iConfigCount = 0;
                        iConfigCount = Object.keys(oTempConfig).length;
                        var oTempChildrens = {};
                        oTempChildrens = oTemp.ChildrenEquipment;
                        for(var key in oTempConfig){
                            var iChildCount = 0; 
                            var oTempEquipmentConfig = oTempConfig[key];
                            var iTempEquipmentCount = oTempEquipmentConfig.Child_Equipment_Count;
                            for(var child in oTempChildrens)
                            {
                                var oTempChildEquipment = oTempChildrens[child];
                                var sTempEquipmentModel = oTempChildEquipment.Equipment_Model;
                                if(sTempEquipmentModel == key)
                                {
                                    iChildCount++;
                                }
                            }
                            if(iChildCount != iTempEquipmentCount)
                            {
                                var iEmptyCnt = 0;
                                iEmptyCnt = iTempEquipmentCount - iChildCount;
                                for(var iEmpty = 0; iEmpty < iEmptyCnt; iEmpty++){
                                    var PlaceholderEquipment = {};
                                    PlaceholderEquipment['Equipment_ID'] = 'EMPTY'; 
                                    PlaceholderEquipment['ParentEquipmentID'] = oTemp.Equipment_ID;
                                    PlaceholderEquipment['level'] = level + 1; 
                                    PlaceholderEquipment['ChildEquipmentConfig'] = {};
                                    oTempChildrens[key+'_EMPTY_'+iEmpty] = PlaceholderEquipment;
                                    this.arrAllEquipments.push(PlaceholderEquipment);
                                    this.AddStyles(PlaceholderEquipment)
                                    level = level + 1;
                                }
                            }
                            level = 0;
                        }
                    }
                }
            }
        },
        async AddStyles(object){
            if(object.Productivity_State == States._Productive ){
                    object["MyEquipmentColor"] = '2px solid green';
                }
                else if(object.Productivity_State == States._Warning){
                    object["MyEquipmentColor"] = '2px solid yellow';
                }
                else if(object.Productivity_State == States._Critical){
                    object["MyEquipmentColor"] = '2px solid orange';
                }
                else if(object.Productivity_State == States._Non_Productive ){
                    object["MyEquipmentColor"] = '2px solid red';
                }
                else if(object.Productivity_State == States._Spare ){
                    object["MyEquipmentColor"] = '2px solid brown';
                }
                else if(object.Productivity_State == States._Ongoing_Repair){
                    object["MyEquipmentColor"] = '2px solid blue';
                }
                else if(object.Productivity_State == States._Scrapped){
                    object["MyEquipmentColor"] = '2px solid violet';
                }else{
                    object["MyEquipmentColor"] = '2px dashed black';
                }
                object["MyEquipmentHeight"] = 200;
                object["MyEquipmentWidth"] = 200;
                object["MyEquipmentLeftPosition"] = 300;
                object["MyModalTrigger"] = 'MyModal';
        },
        async ReSummarizeEquipmentObject(object) {
            //Push to Array
            this.arrAllEquipments.push(object);
            //Add Style Properties
            await this.AddStyles(object);
            //loop through the object and get each child equipment
            for (var Childkey in object.ChildrenEquipment) {
                var iChildCount = 0;
                //Count the number of child of the next node
                iChildCount = Object.keys(object.ChildrenEquipment[Childkey].ChildrenEquipment)
                    .length;
                //Add child count as attribute to the parent
                object.ChildrenEquipment[Childkey]["ChildCount"] = iChildCount;
                //Add the parent equipment id to the current child equipment
                object.ChildrenEquipment[Childkey]["ParentEquipmentID"] = object.Equipment_ID;
                object.ChildrenEquipment[Childkey]["Level"] = this.level;                
                //Check if the next children has count
                //If 0 then it is the last child for that node
                this.level++;
                var bLastEquipment = false;
                if (iChildCount === 0) {
                    bLastEquipment = true;
                }
                object.ChildrenEquipment[Childkey]["LastEquipment"] = bLastEquipment;
                //call itself to check the next children equipment
                await this.ReSummarizeEquipmentObject(object.ChildrenEquipment[Childkey]);
            }
                return object;
        },
        async buildHierarchy(object){
            var roots = [], children = {};
            //find the top level nodes and hash the children based on parent
            for(var i = 0, len = object.length; i < len; i++){
                var tEquipment = object[i],
                    p = object[i].ParentEquipmentID,
                    target = !p ? roots : (children[p] || (children[p] = []));
                    target.push({ value: tEquipment});
            }
            // function to recursively build the tree
            var findChildren = function(parent){
                if(children[parent.value.Equipment_ID]){
                    parent.children = children[parent.value.Equipment_ID];
                    for(var i = 0, len = parent.children.length; i < len; i++){
                        findChildren(parent.children[i]);
                    }
                }
            };
            // enumerate through to handle the case where there are multiple roots
            for(var i = 0, len = roots.length; i < len; i++){
                findChildren(roots[i]);
            }
            return roots
        },
            
        
    },
    created(){
        this.GetEquipmentID();
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
                    :MyGrpEquipBorderStyle="iChildEquip.MyEquipmentBorderStyle"
                    :MyModalTrigger="iChildEquip.MyModalTrigger"
                    :ParentEquip_ID="iChildEquip.ParentEquipmentID"
                />
        </div>
    </div>
</template>
