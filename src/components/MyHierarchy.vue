<script>
/* eslint-disable */
import Swal from 'sweetalert2'
import  Navbar from './MyNavigationBar.vue';
import MyGroupEquipmentComponent from './MyGroupEquipmentComponent.vue';
import MyEquipmentComponent from './MyEquipmentComponent.vue';
import Loading from './MyLoading.vue';
import * as RestAPI from '@/JS/RestAPI.js';
import { States } from '@/JS/Constants.js';
import { Equipment } from '@/classes/Equipment.js';
import { EquipmentConfig } from '@/classes/EquipmentConfig.js';
import { EquipmentUsage } from '@/classes/EquipmentUsage.js';

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
            timeoutId: null, // Store the timeout ID,
            ParentTopPosition: 200, //For Remove
            FixedTopPosition: 200, // 200 defult
            TopPosition: 0,
            FixedLeftPosition: 0,
            LeftPosition: 0,
            oParentPos: {},
            GroupObjectPerLevel: {},
            ParentIndex: {},
            oParentPosition:{},
            maximumRow: 0,
            maximumColumn: 0,
            minimumColumn: 0,
            arr: [],
            Dictionary: [],
            dataReady: false,
            EmptyChild: {},
            EmptyCount: 0,
            EmptyKey:{},
        }
    },
    
    components:{
        Navbar,
        MyGroupEquipmentComponent,
        Loading,
        MyEquipmentComponent
    },
   
    methods:{
        async GetEquipmentID(){
            const equipmentId = localStorage.getItem('equipmentId');
            this.GetTempEquipmentID = equipmentId;
            this.GetTempEquipmentResult = await RestAPI.GetEquipmentID(this.GetTempEquipmentID);
            this.GetTempEquipmentResult = JSON.parse(this.GetTempEquipmentResult.data);


            await this.testFunction(this.GetTempEquipmentResult);


            this.GetTempEquipmentResult['level'] = this.level;
            var object = await this.ReSummarizeEquipmentObject(this.GetTempEquipmentResult)
            var oParent = {};

            this.GroupObjectPerLevel = {};
            for (var iEq = 0; iEq<this.arrAllEquipments.length; iEq++){
                var oEq = {};
                oEq = this.arrAllEquipments[iEq];
                oParent[oEq.Equipment_ID] = oEq;
                var iLevel = oEq['level'];

                    //PLT TO M
                    // if(null==this.GroupObjectPerLevel[iLevel]){
                    //     var arEq = [];
                    //     arEq.push(oEq);
                    //     this.GroupObjectPerLevel[iLevel] = arEq;
                    // }else{
                    //     var arEq = [];
                    //     arEq = this.GroupObjectPerLevel[iLevel];
                    //     arEq.push(oEq);
                    // }
                    //level * heightbox + fixedposition
                    
                    if(this.EmptyChild[oEq.Equipment_ID] != undefined)
                            {
                                var tempEmpty = {};
                                if(null != this.GroupObjectPerLevel[iLevel+1])
                                {
                                    tempEmpty = this.GroupObjectPerLevel[iLevel+1];
                                }

                                if(null==tempEmpty['invisible']){
                                    var InvisibleEquipment = new Equipment();
                                    InvisibleEquipment.Equipment_ID = 'invisible';
                                    InvisibleEquipment.Productivity_State = '';
                                    tempEq = {};
                                    tempEq = InvisibleEquipment.toJSON();
                                    this.AddStyles(tempEq);
                                    // if(tempEq['ParentEquipmentID'] == '' && tempEq['ParentEquipmentID'] == undefined){
                                    //     tempEq['ParentEquipmentID'] = oEq.Equipment_ID;
                                    // } 
                                    tempEmpty['invisible'] = InvisibleEquipment.toJSON(tempEq);
                                    this.GroupObjectPerLevel[iLevel+1] = tempEmpty;
                                }
                                var emptyCount = this.EmptyChild[oEq.Equipment_ID];
                                for(var i = 1; i <= emptyCount; i++ )
                                {
                                    this.EmptyCount++;
                                    var EmptyEqpID = 'Empty_'+ oEq.Equipment_ID + '_' + i;
                                    var EmptyEquipment2 = new Equipment();
                                    EmptyEquipment2.Equipment_ID = 'Empty';
                                    EmptyEquipment2.Productivity_State = '';
                                    EmptyEquipment2.level = iLevel + 1;
                                    EmptyEquipment2.ParentEquipmentID = oEq.Equipment_ID;
                                    var tempEq = EmptyEquipment2.toJSON();
                                    this.AddStyles(tempEq);
                                    tempEmpty[EmptyEqpID] = EmptyEquipment2.toJSON(tempEq);
                                    this.GroupObjectPerLevel[iLevel + 1] = tempEmpty;
                                }
                            }

                    if(null==this.GroupObjectPerLevel[iLevel]){
                            //PLT
                            var arEq = {};
                            arEq[oEq.Equipment_ID] = oEq; 
                            
                            //INVISIBLE
  
                            var InvisibleEquipment = new Equipment();
                            InvisibleEquipment.Equipment_ID = 'invisible';
                            InvisibleEquipment.Productivity_State = '';
                            tempEq = {};
                            tempEq = InvisibleEquipment.toJSON();
                            this.AddStyles(tempEq);
                            // if(tempEq['ParentEquipmentID'] == '' && tempEq['ParentEquipmentID'] == undefined){
                            //     tempEq['ParentEquipmentID'] = oEq.Equipment_ID;
                            // } 
                            arEq['invisible'] = InvisibleEquipment.toJSON(tempEq);
                             this.GroupObjectPerLevel[iLevel] = arEq;

                    }else{
                            var arEq = {};
                            arEq = this.GroupObjectPerLevel[iLevel];
                            arEq[oEq.Equipment_ID] = oEq;
                            
                            // if(null==arEq['invisible'])
                            // {
                            //     var InvisibleEquipment = new Equipment();
                            //     InvisibleEquipment.Equipment_ID = 'invisible';
                            //     InvisibleEquipment.Productivity_State = '';
                            //     tempEq = {};
                            //     tempEq = InvisibleEquipment.toJSON();
                            //     this.AddStyles(tempEq);
                            //     // if(tempEq['ParentEquipmentID'] == '' && tempEq['ParentEquipmentID'] == undefined){
                            //     //     tempEq['ParentEquipmentID'] = oEq.Equipment_ID;
                            //     // } 
                            //     arEq['invisible'] = InvisibleEquipment.toJSON(tempEq);
                            //     this.GroupObjectPerLevel[iLevel] = arEq;
                            // }
                    }

                    //PLT TO M
                    //Get Index
                    for(var i=0;i < this.GroupObjectPerLevel[iLevel].length;i++){
                        var tempObj  = this.GroupObjectPerLevel[iLevel][i];
                        if(tempObj.Equipment_ID == oEq.Equipment_ID){
                            this.ParentIndex[oEq.Equipment_ID] = i+1;
                        }
                    }
                
            }




            this.BoolLoad = true
            const sessionId = localStorage.getItem('sessionId');
            // Generate a new sessionId value
            const newSessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            // Store the new sessionId value in the localStorage
            localStorage.setItem('sessionId', newSessionId);
            // Check if the sessionId value has changed
            if (sessionId !== newSessionId) {
            // alert(this.GetTempEquipmentID + ' is already open in another browser');
            }
        },

        async testFunction(object){
            var eums = String;
            const EquipmentObj = new Equipment();
            var eqp = EquipmentObj.toJSON(this.GetTempEquipmentResult);
            
            var row = Number;
            var column = Number;
            this.maximumColumn = 0;
            this.maximumRow = 0;
            this.minimumColumn = 0;
            try{
                row = 0;
                column = 0;
                await this.GetArraySize(eqp, 0, 0);
                this.arr = Array.from(Array(this.maximumRow), () => new Array(this.maximumColumn));
                for(row = 0; row <= this.maximumRow - 1; row++){
                    for(column = 0; column < this.maximumColumn; column++){
                        this.arr[row][column] = 'invisible';
                    }
                }
                this.minimumColumn = 0;
                await this.PositionArray(eqp, 0, 0,'');

            }
            catch(e){
                alert(e)
            }
        },
        
        async GetArraySize(eqp, row, column){
            const childEquip = new Equipment();
            var childRow = Number;
            var childColumn = Number;
            var index = Number;
            var childCount = Number;
            const equipConfig = new EquipmentConfig();
            //var equipmentConfig = equipConfig.toJSON(this.GetTempEquipmentResult);

            try{
                childRow = row + 1;
                childColumn = this.maximumColumn;
                childCount = 0;

                if(eqp != undefined && eqp != null){
                    if(eqp.ChildrenEquipment != undefined && eqp.ChildrenEquipment != null){
                        var ChildEquipmentConfigCount =  Object.keys(eqp.ChildEquipmentConfig).length;
                        for(index = 0; index <= ChildEquipmentConfigCount - 1; index++){
                            var key = Object.keys(eqp.ChildEquipmentConfig)[index];
                            var equipmentConfig = equipConfig.toJSON(eqp.ChildEquipmentConfig[key]);
                            childCount += equipmentConfig.Child_Equipment_Count;
                        }
                        var ChildrenEquipmentCount =  Object.keys(eqp.ChildrenEquipment).length;
                        for(index = 0; index <= childCount - 1; index++){
                            if(index < ChildrenEquipmentCount){
                                var key = Object.keys(eqp.ChildrenEquipment)[index];
                                var childEqp = childEquip.toJSON(eqp.ChildrenEquipment[key]);
                                await this.GetArraySize(childEqp, childRow, childColumn)
                            }
                            else{
                                await this.GetArraySize(null, childRow, childColumn)
                            }
                            childColumn = childColumn + 1;
                            if(this.minimumColumn > childColumn){
                                childColumn = this.minimumColumn;
                            }
                        }
                        if(ChildrenEquipmentCount == 0){
                            if(this.maximumColumn + 1 > this.minimumColumn){
                                this.minimumColumn = this.maximumColumn + 1;
                            }
                        }
                    }
                }
                else{
                    if(this.maximumColumn + 1 > this.minimumColumn){
                        this.minimumColumn = this.maximumColumn + 1;
                    }
                }

                if(childRow > this.maximumRow){
                    this.maximumRow = childRow;
                }
                if(childColumn > this.maximumColumn){
                    this.maximumColumn = childColumn
                }
            }
            catch(e){
                alert(e)
            }
        },

        async PositionArray(eqp, row, column, parentEqp){
            const childEquip = new Equipment();
            var childRow = Number;
            var childColumn = Number;
            var index = Number;
            var childCount = 0;
            const equipConfig = new EquipmentConfig();

            try{
                if(eqp != null && eqp != undefined){
                    this.arr[row][column] = eqp.Equipment_ID;
                }
                else{
                    if(null==this.EmptyChild[parentEqp])
                    {
                        var iCount = 1;
                        this.EmptyChild[parentEqp] = iCount;
                        this.arr[row][column] = 'Empty_'+parentEqp+'_'+iCount;
                    }
                    else{
                        var iCount = this.EmptyChild[parentEqp];
                        iCount++;
                        this.EmptyChild[parentEqp] = iCount;
                        this.arr[row][column] = 'Empty_'+parentEqp+'_'+iCount;
                    }
                }
                
                childRow = row + 1;
                childColumn = column;
                if(eqp != null && eqp != undefined){
                    if(eqp.ChildrenEquipment != null && eqp.ChildrenEquipment != undefined){
                        var ChildEquipmentConfigCount =  Object.keys(eqp.ChildEquipmentConfig).length;
                        for(index = 0; index <= ChildEquipmentConfigCount - 1; index++){
                            var key = Object.keys(eqp.ChildEquipmentConfig)[index];
                            var equipmentConfig = equipConfig.toJSON(eqp.ChildEquipmentConfig[key]);
                            childCount += equipmentConfig.Child_Equipment_Count;
                        }
                        var ChildrenEquipmentCount =  Object.keys(eqp.ChildrenEquipment).length;
                        for(index = 0; index <= childCount - 1; index++){
                            if(index < ChildrenEquipmentCount){
                                var key = Object.keys(eqp.ChildrenEquipment)[index];
                                var childEqp = childEquip.toJSON(eqp.ChildrenEquipment[key]);
                                await this.PositionArray(childEqp, childRow, childColumn,'');
                            }
                            else{
                                var tempParent = '';
                                if(null!=eqp || undefined != eqp)
                                {
                                    tempParent = eqp.Equipment_ID;
                                }
                                await this.PositionArray(null, childRow, childColumn,tempParent);
                            }
                            childColumn = childColumn + 1;
                            if(this.minimumColumn > childColumn){
                                childColumn = this.minimumColumn;
                            }
                        }
                        if(ChildrenEquipmentCount == 0){
                            if(column + 1 > this.minimumColumn){
                                this.minimumColumn = column + 1;
                            }
                        }
                    }
                }
                else{
                    if(column + 1 > this.minimumColumn){
                        this.minimumColumn = column + 1
                    }
                }
            }
            catch(e){
                console.log(e)
            }


        },

        async AddStyles(object){
            if(object.Productivity_State == States._Productive ){
                    object["MyEquipmentColor"] = '2px solid green';
                    object["MyEquipmentOpacity"] = 1;
                }
                else if(object.Productivity_State == States._Warning){
                    object["MyEquipmentColor"] = '2px solid yellow';
                    object["MyEquipmentOpacity"] = 1;
                }
                else if(object.Productivity_State == States._Critical){
                    object["MyEquipmentColor"] = '2px solid orange';
                    object["MyEquipmentOpacity"] = 1;
                }
                else if(object.Productivity_State == States._Non_Productive ){
                    object["MyEquipmentColor"] = '2px solid red';
                    object["MyEquipmentOpacity"] = 1;
                }
                else if(object.Productivity_State == States._Spare ){
                    object["MyEquipmentColor"] = '2px solid brown';
                    object["MyEquipmentOpacity"] = 1;
                }
                else if(object.Productivity_State == States._Ongoing_Repair){
                    object["MyEquipmentColor"] = '2px solid blue';
                    object["MyEquipmentOpacity"] = 1;
                }
                else if(object.Productivity_State == States._Scrapped){
                    object["MyEquipmentColor"] = '2px solid violet';
                    object["MyEquipmentOpacity"] = 1;
                }else if(object.Productivity_State == '' && object.Equipment_ID.includes('Empty')){
                    object["MyEquipmentColor"] = '2px dashed black';
                    object["MyEquipmentOpacity"] = 1;
                }else if(object.Productivity_State == '' && object.Equipment_ID == 'invisible'){
                    object["MyEquipmentColor"] = '2px dashed black';
                    object["MyEquipmentOpacity"] = 0;
                }
                
                object["MyEquipmentHeight"] = 150;
                object["MyEquipmentWidth"] = 200;
                // object["MyEquipmentLeftPosition"] = 50;
                object["MyModalTrigger"] = 'MyModal';
                object["MyScreenWidthSize"] = screen.width;
                object["MyScreenHeightSize"] = screen.height;

                object["MyEquipmentLeftPosition"] = this.LeftPosition;
                //Compute the top position
                var IDToUse = "";
                if(object.ParentEquipmentID==undefined)
                {
                    IDToUse = object.Equipment_ID;
                }
                else{
                    IDToUse = object.ParentEquipmentID;
                }
                if(null==this.oParentPosition[IDToUse])
                {
                    this.TopPosition = this.FixedTopPosition + (object.level*(object.MyEquipmentHeight+50));
                    this.oParentPosition[IDToUse] = this.TopPosition;
                    object["MyEquipmentTopPosition"] = this.TopPosition;
                }
                else{
                    this.TopPosition = this.FixedTopPosition + (object.level*(object.MyEquipmentHeight+50));
                    object["MyEquipmentTopPosition"] = this.TopPosition;
                }        
                if(object.ParentEquipmentID == undefined)
                {
                    object["MyEquipmentTopPosition"] = this.FixedTopPosition;
                    this.TopPosition = this.FixedTopPosition + (object.level*(object.MyEquipmentHeight+50));
                    this.oParentPosition[IDToUse] = this.TopPosition;
                }        

        },

        async ReSummarizeEquipmentObject(object) {
            //Push to Array
            this.arrAllEquipments.push(object);
            var iConfigCount = Object.keys(object.ChildEquipmentConfig).length;
            //#region
            if(object.ParentEquipmentID != undefined){
                    var EquipmentPrefix =  object.ParentEquipmentID.split("-")[0];
                    if(null==this.oParentPos[EquipmentPrefix])
                    {
                        if(null!=this.oParentPosition[EquipmentPrefix])
                        {
                            this.ParentTopPosition = this.oParentPosition[EquipmentPrefix];
                        }
                        else
                        {
                            this.ParentTopPosition = this.ParentTopPosition + 400;
                        }
                        var oTempParent = {};
                        oTempParent['Top'] = this.ParentTopPosition;
                        oTempParent['Left'] = 0;
                        this.oParentPos[EquipmentPrefix] = oTempParent;
                        object["MyEquipmentLeftPosition"] = oTempParent['Left'];
                        object["MyEquipmentTopPosition"] = oTempParent['Top'];
                        this.oParentPosition[EquipmentPrefix] = this.ParentTopPosition;
                    }
                    else{ 
                        var oTempParent = this.oParentPos[EquipmentPrefix];
                        object["MyEquipmentLeftPosition"] = oTempParent['Left'];
                        object["MyEquipmentTopPosition"] = oTempParent['Top'];
                    }
            }
            else
            {
                var EquipmentPrefix =  object.Equipment_ID.split("-")[0];
                if(null==this.oParentPos[EquipmentPrefix])
                {
                    var oTempParent = {};
                    oTempParent['Top'] = this.ParentTopPosition;
                    oTempParent['Left'] = 0;
                    this.oParentPos[EquipmentPrefix] = oTempParent;
                    object["MyEquipmentLeftPosition"] = oTempParent['Left'];
                    object["MyEquipmentTopPosition"] = oTempParent['Top'] + 200;
                    this.ParentTopPosition = this.ParentTopPosition;
                    this.oParentPosition[EquipmentPrefix] = this.ParentTopPosition + 200;
                }
                else{ 
                    var oTempParent = this.oParentPos[EquipmentPrefix];
                    object["MyEquipmentLeftPosition"] = oTempParent['Left'];
                    object["MyEquipmentTopPosition"] = oTempParent['Top'] + 200;
                }
            }
            //#endregion

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

                var iParentLevel = object['level'];
                iParentLevel++;
                object.ChildrenEquipment[Childkey]["level"] = iParentLevel; 
                
                if(null!=this.GroupObjectPerLevel['Level_'+iParentLevel])
                {
                    var arLevelTemp = {};
                    arLevelTemp = this.GroupObjectPerLevel['Level_'+iParentLevel];
                    arLevelTemp[object.ChildrenEquipment[Childkey].Equipment_ID] = object.ChildrenEquipment[Childkey];
                }
                else
                {
                    var arLevelTemp = {};
                    arLevelTemp[object.ChildrenEquipment[Childkey].Equipment_ID] = object.ChildrenEquipment[Childkey]
                    this.GroupObjectPerLevel['Level_'+iParentLevel] = arLevelTemp;
                }

                //Add the parent equipment id to the current child equipment
                object.ChildrenEquipment[Childkey]["ParentEquipmentID"] = object.Equipment_ID;              
                //Check if the next children has count
                //If 0 then it is the last child for that node
                var bLastEquipment = false;
                if (iChildCount === 0) {
                    bLastEquipment = true;
                }
                object.ChildrenEquipment[Childkey]["LastEquipment"] = bLastEquipment;
                await this.ReSummarizeEquipmentObject(object.ChildrenEquipment[Childkey]);

            }
                return object;
        },
        
        mounted() {
 
        },
        async DeleteSession() {
        this.userID = localStorage.getItem('userID');
        this.DeleteSessionResult = await RestAPI.DeleteSession(this.userID);
        localStorage.setItem('isAuthenticated', 'false');
       // Check if the current route is not already the root path
        if (this.$route.path !== '/') {
            this.$router.push('/');
        }
        },
        
        async callGetAllActiveSessions() {
        this.userID = localStorage.getItem('userID');
        this.GetAllActiveSessionsResult = await RestAPI.GetAllActiveSessions();
        const parsedData = JSON.parse(this.GetAllActiveSessionsResult.data);
        // Check if parsedData is empty
            // Iterate over parsedData object
            for (const key in parsedData) {
                if (parsedData.hasOwnProperty(key)) {
                    // Check if Session_ID contains localStorage.getItem('equipmentId')
                    if (parsedData[key].Session_ID.includes(localStorage.getItem('equipmentId')) && localStorage.getItem('userID') !== parsedData[key].User_ID) {
                            localStorage.setItem('isEditing', 'false');
                            Swal.fire('Someone is Editing ' +  localStorage.getItem('equipmentId'))
                    }
                    else if (!parsedData[key].Session_ID.includes(localStorage.getItem('equipmentId'))){
                        localStorage.setItem('isEditing', 'true');
                    }
                       
                }
            }
        
    },

        

    },
    async mounted(){
        await this.GetEquipmentID();
        this.dataReady = true;
    },
        created() {
        // this.GetEquipmentID();
        this.callGetAllActiveSessions();

        let timeoutId; // Variable to store the timeout ID

        this.userID = ''; // Define userID before event listeners
        this.GetAllActiveSessionsResult = null; // Initialize GetAllActiveSessionsResult

        // Function to reset the timeout when the mouse is moved
        const resetTimeout = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
            this.DeleteSession(); // Use arrow function to preserve the scope of 'this'
            }, 900000); // 5 minutes
        }

        // Add event listeners for mousemove and touchmove
        document.addEventListener('mousemove', resetTimeout);
        document.addEventListener('touchmove', resetTimeout);

      


},
            
}
</script>
<template>
    <div >
        <div>
            <Navbar/>
            <br>
            <br>
            <a href="/dashboard#/dashboard">Back</a>
                    <div v-if="!BoolLoad">
                        <Loading />
                    </div>
                
        </div>
        <br>
        <div v-if="this.dataReady == true">
            <div id="mainDiv" class="Equipment" v-for="(equipments,index) in this.arr" :key="index" >
                <div id="itemDiv" v-for="(item,itemIndex) in equipments" :key="itemIndex" >
                    <!-- {{ item }}
                    {{ index }} -->
                    <MyGroupEquipmentComponent v-on="$listeners" 
                        :Equipment_ID="GroupObjectPerLevel[index][item].Equipment_ID"
                        :MES_State="GroupObjectPerLevel[index][item].MES_State"
                        :EUMS_State="GroupObjectPerLevel[index][item].EUMS_State" 
                        :Productivity_State="GroupObjectPerLevel[index][item].Productivity_State"
                        :Equipment_Model="GroupObjectPerLevel[index][item].Equipment_Model"
                        :PartType="GroupObjectPerLevel[index][item].Part_Type"
                        :Classification="GroupObjectPerLevel[index][item].Classification"
                        :ChildrenEquipment="GroupObjectPerLevel[index][item].ChildrenEquipment"
                        :ChildrenEquipmentConfig="GroupObjectPerLevel[index][item].ChildEquipmentConfig"
                        :EquipmentUsage="GroupObjectPerLevel[index][item].EquipmentUsage"
                        :MyGrpEquipHeight="GroupObjectPerLevel[index][item].MyEquipmentHeight"
                        :MyGrpEquipWidth="GroupObjectPerLevel[index][item].MyEquipmentWidth"
                        :MyGrpEquipLeftPosition="GroupObjectPerLevel[index][item].MyEquipmentLeftPosition"
                        :MyGrpEquipTopPosition="GroupObjectPerLevel[index][item].MyEquipmentTopPosition"
                        :MyGrpEquipColor="GroupObjectPerLevel[index][item].MyEquipmentColor"
                        :MyGrpEquipBorderStyle="GroupObjectPerLevel[index][item].MyEquipmentBorderStyle"
                        :MyModalTrigger="GroupObjectPerLevel[index][item].MyModalTrigger"
                        :ParentEquip_ID="GroupObjectPerLevel[index][item].ParentEquipmentID"
                        :MyGrpEquipOpacity="GroupObjectPerLevel[index][item].MyEquipmentOpacity"
                    />
                    
                </div>
            </div>
        </div>

        <!-- <div class="mainDiv" v-for="(obj,index) in this.GroupObjectPerLevelv2" :key="index">
            <div v-for="(item,itemIndex) in obj" :key="itemIndex">
                <MyGroupEquipmentComponent v-on="$listeners"
                    :Equipment_ID="item.Equipment_ID"
                    :MES_State="item.MES_State"
                    :EUMS_State="item.EUMS_State" 
                    :Productivity_State="item.Productivity_State"
                    :Equipment_Model="item.Equipment_Model"
                    :PartType="item.Part_Type"
                    :Classification="item.Classification"
                    :ChildrenEquipment="item.ChildrenEquipment"
                    :ChildrenEquipmentConfig="item.ChildEquipmentConfig"
                    :EquipmentUsage="item.EquipmentUsage"
                    :MyGrpEquipHeight="item.MyEquipmentHeight"
                    :MyGrpEquipWidth="item.MyEquipmentWidth"
                    :MyGrpEquipLeftPosition="item.MyEquipmentLeftPosition"
                    :MyGrpEquipTopPosition="item.MyEquipmentTopPosition"
                    :MyGrpEquipColor="item.MyEquipmentColor"
                    :MyGrpEquipBorderStyle="item.MyEquipmentBorderStyle"
                    :MyModalTrigger="item.MyModalTrigger"
                    :ParentEquip_ID="item.ParentEquipmentID"
                    :EquipmentLevel="item.level"
                    :MyGrpEquipOpacity="item.MyEquipmentOpacity"
                />
            </div>
        </div> -->
        
        
        <!-- <div  v-for="(main,index) in this.GroupObjectPerLevel" :key="index" id="mainDiv" class="Equipment">
            <div id = "itemDiv" v-for="(item,val) in main" :key="val" >
                <MyGroupEquipmentComponent v-on="$listeners" 
                    :Equipment_ID="item.Equipment_ID"
                    :MES_State="item.MES_State"
                    :EUMS_State="item.EUMS_State" 
                    :Productivity_State="item.Productivity_State"
                    :Equipment_Model="item.Equipment_Model"
                    :PartType="item.Part_Type"
                    :Classification="item.Classification"
                    :ChildrenEquipment="item.ChildrenEquipment"
                    :ChildrenEquipmentConfig="item.ChildEquipmentConfig"
                    :EquipmentUsage="item.EquipmentUsage"
                    :MyGrpEquipHeight="item.MyEquipmentHeight"
                    :MyGrpEquipWidth="item.MyEquipmentWidth"
                    :MyGrpEquipLeftPosition="item.MyEquipmentLeftPosition"
                    :MyGrpEquipTopPosition="item.MyEquipmentTopPosition"
                    :MyGrpEquipColor="item.MyEquipmentColor"
                    :MyGrpEquipBorderStyle="item.MyEquipmentBorderStyle"
                    :MyModalTrigger="item.MyModalTrigger"
                    :ParentEquip_ID="item.ParentEquipmentID"
                    :EquipmentLevel="item.level"
                    :MyGrpEquipOpacity="item.MyEquipmentOpacity"
                />
            </div>
        </div> -->

        
        <!-- <div class="row">
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
                    :MyGrpEquipTopPosition="iChildEquip.MyEquipmentTopPosition"
                    :MyGrpEquipColor="iChildEquip.MyEquipmentColor"
                    :MyGrpEquipBorderStyle="iChildEquip.MyEquipmentBorderStyle"
                    :MyModalTrigger="iChildEquip.MyModalTrigger"
                    :ParentEquip_ID="iChildEquip.ParentEquipmentID"
                    :EquipmentLevel="iChildEquip.level"
                />
        </div>         -->
    </div>
</template>
