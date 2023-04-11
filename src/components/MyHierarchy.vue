<script>
/* eslint-disable */
import  Navbar from './MyNavigationBar.vue';
import MyGroupEquipmentComponent from './MyGroupEquipmentComponent.vue';
import MyEquipmentComponent from './MyEquipmentComponent.vue';
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
            timeoutId: null, // Store the timeout ID,
            
       
            GroupObjectPerLevel: {}
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
            this.GetTempEquipmentResult['level'] = this.level;
            var arLevelTemp = [];
            arLevelTemp.push(this.GetTempEquipmentResult);
            this.GroupObjectPerLevel['Level_0'] = arLevelTemp;
            var object = await this.ReSummarizeEquipmentObject(this.GetTempEquipmentResult, 0)
            var obj = await this.ReSummarizeEquipmentChildObject();
            var tempobj = await this.buildHierarchy(this.arrAllEquipments)
            //console.log(tempobj)
            console.log(this.GroupObjectPerLevel);
            this.BoolLoad = true

            // Get the sessionId value from the localStorage
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
        async ReSummarizeEquipmentChildObject(){
            var level = 0;
            if(this.arrAllEquipments.length > 0)
            {
                //this.arrAllEquipments[0]['level'] = level;
                //level++;
                //var sParent = '';
                for (var i = 0;  i < this.arrAllEquipments.length; i++)
                {
                    var oTemp = {};
                    oTemp = this.arrAllEquipments[i];
                    //oTemp['level'] = level;
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
                                //oTempChildEquipment['level'] = level;

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
                                    //PlaceholderEquipment['level'] = level + 1; 
                                    PlaceholderEquipment['ChildEquipmentConfig'] = {};
                                    oTempChildrens[key+'_EMPTY_'+iEmpty] = PlaceholderEquipment;
                                    this.arrAllEquipments.push(PlaceholderEquipment);
                                    this.AddStyles(PlaceholderEquipment)
                                    //level = level + 1;
                                }
                            }
                            //level = 0;
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
                object["MyEquipmentHeight"] = 150;
                object["MyEquipmentWidth"] = 200;
                object["MyEquipmentLeftPosition"] = 50;
                object["MyModalTrigger"] = 'MyModal';
                object["MyScreenWidthSize"] = screen.width;
                object["MyScreenHeightSize"] = screen.height;
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
                var iParentLevel = object['level'];
                iParentLevel++;
                object.ChildrenEquipment[Childkey]["level"] = iParentLevel;

                if(null!=this.GroupObjectPerLevel['Level_'+iParentLevel])
                {
                    var arLevelTemp = [];
                    arLevelTemp = this.GroupObjectPerLevel['Level_'+iParentLevel];
                    arLevelTemp.push(object.ChildrenEquipment[Childkey]);
                }
                else
                {
                    var arLevelTemp = [];
                    arLevelTemp.push(object.ChildrenEquipment[Childkey]);
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
                else
                {
                }
                object.ChildrenEquipment[Childkey]["LastEquipment"] = bLastEquipment;

                if(object.ChildrenEquipment[Childkey]["level"] == 0){
                    var arrPositionTemp = [];
                    object.ChildEquipment["MyEquipmentLeftPosition"] = screen.width/iChildCount;
                    arrPositionTemp = object["MyEquipmentLeftPosition"];
                    // arrPositionTemp.push(object.ChildEquipment[Childkey]);
                    console.log(arrPositionTemp)
                }

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
         mounted() {
 
        },

        async DeleteSession() {
        this.userID = localStorage.getItem('userID');
        this.DeleteSessionResult = await RestAPI.DeleteSession(this.userID);
        console.log('Session deleted.'); // Placeholder for the actual logic to delete the session
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
        // console.log(parsedData);
        // Check if parsedData is empty
        if (Object.keys(parsedData).length === 0) {
            console.log("No Active Session");
        } else {
            console.log("Active Users");
            // Iterate over parsedData object
            for (const key in parsedData) {
                if (parsedData.hasOwnProperty(key)) {
                    console.log("User_ID: " + parsedData[key].User_ID);
                    console.log("Session_ID: " + parsedData[key].Session_ID);
                    // Check if Session_ID contains localStorage.getItem('equipmentId')
                    if (parsedData[key].Session_ID.includes(localStorage.getItem('equipmentId'))) {
                        
                        if(parsedData[key].Session_ID == localStorage.getItem('sessionID')){
                        localStorage.setItem('isEditing', 'false');
                        }
                        else{
                            localStorage.setItem('isEditing', 'true');
                            alert("Someone is Editing " + localStorage.getItem('equipmentId'));
                        }
                    }
                       
                }
            }
        }
    },

        

    },
        created() {
        this.GetEquipmentID();
        this.callGetAllActiveSessions();

        let timeoutId; // Variable to store the timeout ID

        this.userID = 'crsc'; // Define userID before event listeners
        this.GetAllActiveSessionsResult = null; // Initialize GetAllActiveSessionsResult

        // Function to reset the timeout when the mouse is moved
        const resetTimeout = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
            this.DeleteSession(); // Use arrow function to preserve the scope of 'this'
            }, 300000); // 5 minutes
        }

        // Add event listeners for mousemove and touchmove
        document.addEventListener('mousemove', resetTimeout);
        document.addEventListener('touchmove', resetTimeout);

      


},
            
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
                    :EquipmentLevel="iChildEquip.level"
                />
        </div>
        <!-- <div>
            <div class="level-1 rectangle" v-for="(grpLevel, index) in GroupObjectPerLevel.Level_0" :key="index">
                        <MyEquipmentComponent 
                            v-on="$listeners"
                            :Equipment_ID="grpLevel.Equipment_ID"
                            :MES_State="grpLevel.MES_State"
                            :EUMS_State="grpLevel.EUMS_State" 
                            :Productivity_State="grpLevel.Productivity_State"
                            :Equipment_Model="grpLevel.Equipment_Model"
                            :PartType="grpLevel.PartType"
                            :Classification="grpLevel.Classification"
                            :ChildrenEquipment="grpLevel.ChildrenEquipment"
                            :ChildrenEquipmentConfig="grpLevel.ChildrenEquipmentConfig"
                            :EquipmentUsage="grpLevel.EquipmentUsage"
                            :MyEquipHeight="grpLevel.MyEquipmentHeight"
                            :MyEquipWidth="grpLevel.MyEquipmentWidth"
                            :MyEquipLeftPosition="grpLevel.MyEquipmentLeftPosition"
                            :MyEquipColor="grpLevel.MyEquipmentColor"
                            :MyModalId="grpLevel.MyModalTrigger"
                            :ParentEquipment_ID="grpLevel.ParentEquip_ID"
                            :EquipmentLevel="grpLevel.EquipmentLevel"
                        />
            </div>
            <ol class="level-2-wrapper">
                <li v-for="(grpLevel, index) in GroupObjectPerLevel.Level_1" :key="index">
                    <div class="level-2 rectangle">
                        <MyEquipmentComponent 
                            v-on="$listeners"
                            :Equipment_ID="grpLevel.Equipment_ID"
                            :MES_State="grpLevel.MES_State"
                            :EUMS_State="grpLevel.EUMS_State" 
                            :Productivity_State="grpLevel.Productivity_State"
                            :Equipment_Model="grpLevel.Equipment_Model"
                            :PartType="grpLevel.PartType"
                            :Classification="grpLevel.Classification"
                            :ChildrenEquipment="grpLevel.ChildrenEquipment"
                            :ChildrenEquipmentConfig="grpLevel.ChildrenEquipmentConfig"
                            :EquipmentUsage="grpLevel.EquipmentUsage"
                            :MyEquipHeight="grpLevel.MyEquipmentHeight"
                            :MyEquipWidth="grpLevel.MyEquipmentWidth"
                            :MyEquipLeftPosition="grpLevel.MyEquipmentLeftPosition"
                            :MyEquipColor="grpLevel.MyEquipmentColor"
                            :MyModalId="grpLevel.MyModalTrigger"
                            :ParentEquipment_ID="grpLevel.ParentEquip_ID"
                            :EquipmentLevel="grpLevel.EquipmentLevel"
                        />
                    </div>
                    <ol class="level-3-wrapper">
                        <li v-for="(grpLevel, index) in GroupObjectPerLevel.Level_2" :key="index">
                            <div class="level-3 rectangle">
                                <MyEquipmentComponent 
                                v-on="$listeners"
                                :Equipment_ID="grpLevel.Equipment_ID"
                                :MES_State="grpLevel.MES_State"
                                :EUMS_State="grpLevel.EUMS_State" 
                                :Productivity_State="grpLevel.Productivity_State"
                                :Equipment_Model="grpLevel.Equipment_Model"
                                :PartType="grpLevel.PartType"
                                :Classification="grpLevel.Classification"
                                :ChildrenEquipment="grpLevel.ChildrenEquipment"
                                :ChildrenEquipmentConfig="grpLevel.ChildrenEquipmentConfig"
                                :EquipmentUsage="grpLevel.EquipmentUsage"
                                :MyEquipHeight="grpLevel.MyEquipmentHeight"
                                :MyEquipWidth="grpLevel.MyEquipmentWidth"
                                :MyEquipLeftPosition="grpLevel.MyEquipmentLeftPosition"
                                :MyEquipColor="grpLevel.MyEquipmentColor"
                                :MyModalId="grpLevel.MyModalTrigger"
                                :ParentEquipment_ID="grpLevel.ParentEquip_ID"
                                :EquipmentLevel="grpLevel.EquipmentLevel"
                            />
                            </div>
                        </li>
                    </ol>
                    <ol class="level-4-wrapper">
                        <li v-for="(grpLevel, index) in GroupObjectPerLevel.Level_3" :key="index">
                            <div class="level-4 rectangle" >
                                <MyEquipmentComponent 
                                v-on="$listeners"
                                :Equipment_ID="grpLevel.Equipment_ID"
                                :MES_State="grpLevel.MES_State"
                                :EUMS_State="grpLevel.EUMS_State" 
                                :Productivity_State="grpLevel.Productivity_State"
                                :Equipment_Model="grpLevel.Equipment_Model"
                                :PartType="grpLevel.PartType"
                                :Classification="grpLevel.Classification"
                                :ChildrenEquipment="grpLevel.ChildrenEquipment"
                                :ChildrenEquipmentConfig="grpLevel.ChildrenEquipmentConfig"
                                :EquipmentUsage="grpLevel.EquipmentUsage"
                                :MyEquipHeight="grpLevel.MyEquipmentHeight"
                                :MyEquipWidth="grpLevel.MyEquipmentWidth"
                                :MyEquipLeftPosition="grpLevel.MyEquipmentLeftPosition"
                                :MyEquipColor="grpLevel.MyEquipmentColor"
                                :MyModalId="grpLevel.MyModalTrigger"
                                :ParentEquipment_ID="grpLevel.ParentEquip_ID"
                                :EquipmentLevel="grpLevel.EquipmentLevel"
                            />
                            </div>
                        </li>
                    </ol>
                </li>
            </ol>
        </div> -->
    </div>
</template>
