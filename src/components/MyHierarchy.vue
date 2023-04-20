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
            ParentTopPosition: 200, //For Remove
            FixedTopPosition: 200, // 200 defult
            TopPosition: 0,
            FixedLeftPosition: 0,
            LeftPosition: 0,
            oParentPos: {},
            GroupObjectPerLevel: {},
            ParentIndex: {},
            oParentPosition:{},
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
            var object = await this.ReSummarizeEquipmentObject(this.GetTempEquipmentResult)

            //#region 
            var oParent = {};
            this.GroupObjectPerLevel = {};
            for (var iEq = 0; iEq<this.arrAllEquipments.length; iEq++){
                var oEq = {};
                oEq = this.arrAllEquipments[iEq];
                oParent[oEq.Equipment_ID] = oEq;
                var iLevel = oEq['level'];

                    //PLT TO M
                    if(null==this.GroupObjectPerLevel[iLevel]){
                        var arEq = [];
                        arEq.push(oEq);
                        this.GroupObjectPerLevel[iLevel] = arEq;
                    }else{
                        var arEq = [];
                        arEq = this.GroupObjectPerLevel[iLevel];
                        arEq.push(oEq);
                    }
                    //PLT TO M
                    //Get Index
                    for(var i=0;i < this.GroupObjectPerLevel[iLevel].length;i++){
                        var tempObj  = this.GroupObjectPerLevel[iLevel][i];
                        if(tempObj.Equipment_ID == oEq.Equipment_ID){
                            this.ParentIndex[oEq.Equipment_ID] = i+1;
                        }
                    }
                
                //MAKE EMPTY BOXES
                var iTempConfigCount = 0;
                var ctr = 0; 
                var childCount = Object.keys(oEq.ChildrenEquipment).length;
                for(var key in oEq.ChildEquipmentConfig){
                    iTempConfigCount = oEq.ChildEquipmentConfig[key].Child_Equipment_Count
                    if(childCount < iTempConfigCount){
                            for(var i = childCount; i < iTempConfigCount; i++){
                                var PlaceholderEquipment = {};
                                PlaceholderEquipment['Equipment_ID'] = 'EMPTY'; 
                                PlaceholderEquipment['ParentEquipmentID'] = oEq.Equipment_ID;
                                PlaceholderEquipment['ChildEquipmentConfig'] = {};
                                PlaceholderEquipment['Equipment_Model'] = key;
                                var iParentLevel = oEq['level'];
                                iParentLevel++;
                                PlaceholderEquipment["level"] = iParentLevel;
                                PlaceholderEquipment["counter"] = ctr;
                                this.AddStyles(PlaceholderEquipment)
                                if(null==this.GroupObjectPerLevel[iParentLevel]){
                                    var arEq = [];
                                    arEq.push(PlaceholderEquipment);
                                    this.GroupObjectPerLevel[iParentLevel] = arEq;
                                }else{
                                    var arEq = [];
                                    arEq = this.GroupObjectPerLevel[iParentLevel];
                                    arEq.push(PlaceholderEquipment);
                                }
                            }
                    }
                    var iChildCount = oEq.ChildCount;
                    if(iChildCount != 0 && iTempConfigCount > 0){
                        //#region 
                        // console.log(oEq);

                        /////INSERT EMPTY
                        // var oTempChildEquipmentConfig = oEq.ChildEquipmentConfig;
                        // var iTempConfigCount = Object.keys(oTempChildEquipmentConfig).length;
                        // // console.log(iTempConfigCount)
                        // var oConfig = {};
                        // for(var key in oTempChildEquipmentConfig){
                        //     oConfig[key] = oTempChildEquipmentConfig[key].Child_Equipment_Count;
                        //     // console.log(oEq.Equipment_ID + ' : ' + oConfig[key]);
                        //     // console.log(key)
                        // }
                        
                        // console.log(oConfig);
                        // for(var key in oConfig){
                        //     // console.log(key) // Equipment Model
                        //     var bFound = true;
                        //     var iCount = 0;
                        //     //console.log(key)
                        //     iTempConfigCount = oConfig[key];
                        //     for(var child in oEq.ChildrenEquipment)
                        //     {
                        //         if(oEq.ChildrenEquipment[child].Equipment_Model == key)
                        //         {
                        //             //console.log(oTemp.ChildrenEquipment[child].Equipment_Model);
                        //             iCount++;
                        //         }
                        //     }
                        //     if(iCount != iTempConfigCount)
                        //     {
                        //         bFound= false;
                        //     }
                        //     else
                        //     {
                                
                        //     }
                        //     if(!bFound)
                        //     {
                        //         // console.log('EquipmentModel:'+key);
                        //         // console.log('ParentEquipmentID:'+oEq.ChildrenEquipment[child].ParentEquipmentID);
                        //         // console.log('iCount:'+iCount);
                        //         // console.log('iTempConfigCount:'+iTempConfigCount);
                        //         //console.log('Not Found ' + key + ':'+oTemp.ChildrenEquipment[child].ParentEquipmentID);
                        //         var PlaceholderEquipment = {};
                        //         PlaceholderEquipment['Equipment_ID'] = 'EMPTY'; 
                        //         PlaceholderEquipment['ParentEquipmentID'] = oEq.ChildrenEquipment[child].ParentEquipmentID;
                        //         PlaceholderEquipment['ChildEquipmentConfig'] = {};
                        //         //PlaceholderEquipment['Equipment_Model'] = key;
                        //         //oTempChildrens[key+'_EMPTY_'+iEmpty] = PlaceholderEquipment;
                        //         var iParentLevel = oEq['level'];
                        //         iParentLevel++;
                        //         PlaceholderEquipment["level"] = iParentLevel;
                        //         var EquipmentPrefix =  oEq.ChildrenEquipment[child].Equipment_Model.split("-")[0];
                        //         var ParentEquipmentPrefix = oEq.ChildrenEquipment[child].ParentEquipmentID.split("-")[0]; 
                        //         this.AddStyles(PlaceholderEquipment)
                        //         if(null==this.GroupObjectPerLevel[iParentLevel])
                        //         {
                        //             var arEq = [];
                        //             arEq.push(PlaceholderEquipment);
                        //             this.GroupObjectPerLevel[iParentLevel] = arEq;
                        //         }else{
                        //             var arEq = [];
                        //             arEq = this.GroupObjectPerLevel[iParentLevel];
                        //             arEq.push(PlaceholderEquipment);
                        //         }
                        //     }
                        // }
                        //#endregion
                        //Invisible Boxes
                        for (var i = 1; i < iTempConfigCount; i++)
                        {
                            var arEq = [];
                            var PlaceholderEquipment = {};
                                PlaceholderEquipment['Equipment_ID'] = ''; 
                                if(oEq.ParentEquipmentID != undefined){
                                    PlaceholderEquipment['ParentEquipmentID'] = oEq.ParentEquipmentID;
                                }
                                PlaceholderEquipment['ChildEquipmentConfig'] = {};
                                var iParentLevel = oEq['level'];
                                iParentLevel++;
                                PlaceholderEquipment["level"] = iParentLevel;
                                var EquipmentPrefix =  oEq.Equipment_Model.split("-")[0];
                                this.AddStyles(PlaceholderEquipment)
                                if(null==this.GroupObjectPerLevel[iLevel]){
                                    var arEq = [];
                                    arEq.push(PlaceholderEquipment);
                                    this.GroupObjectPerLevel[iLevel] = arEq;
                                }else{
                                    var arEq = [];
                                    arEq = this.GroupObjectPerLevel[iLevel];
                                    arEq.push(PlaceholderEquipment);
                            }
                        }
                            
                    } 
                } 
            }

                
            //#endregion


            //#region 
            // this.GroupObjectPerLevel = {};
            // var level;

            // //LEVEL 0
            // var arEq = [];
            // level = 0;
            // var PlaceholderEquipment = {};
            // PlaceholderEquipment['Equipment_ID'] = 'PLT-003-03';
            // PlaceholderEquipment["level"] = level;
            // PlaceholderEquipment['ChildEquipmentConfig'] = {};
            // PlaceholderEquipment['ParentEquipmentID'] = '';
            // this.AddStyles(PlaceholderEquipment)
            // arEq.push(PlaceholderEquipment);
            // var PlaceholderEquipment = {};
            // PlaceholderEquipment['Equipment_ID'] = 'EMPTY';
            // PlaceholderEquipment["level"] = level;
            // PlaceholderEquipment['ChildEquipmentConfig'] = {};
            // PlaceholderEquipment['ParentEquipmentID'] = '';
            // this.AddStyles(PlaceholderEquipment)
            // arEq.push(PlaceholderEquipment);
            // var PlaceholderEquipment = {};
            // PlaceholderEquipment['Equipment_ID'] = '';
            // PlaceholderEquipment["level"] = level;
            // PlaceholderEquipment['ChildEquipmentConfig'] = {};
            // PlaceholderEquipment['ParentEquipmentID'] = '';
            // this.AddStyles(PlaceholderEquipment)
            // arEq.push(PlaceholderEquipment);
            // var PlaceholderEquipment = {};
            // PlaceholderEquipment['Equipment_ID'] = 'PNP-001-01';
            // PlaceholderEquipment["level"] = level;
            // PlaceholderEquipment['ChildEquipmentConfig'] = {};
            // PlaceholderEquipment['ParentEquipmentID'] = '';
            // this.AddStyles(PlaceholderEquipment)
            // arEq.push(PlaceholderEquipment);
            // this.GroupObjectPerLevel[0] = arEq;

            // //LEVEL 1
            // var arEq = [];
            // level = 1;
            // var PlaceholderEquipment = {};
            // PlaceholderEquipment['Equipment_ID'] = '';
            // PlaceholderEquipment["level"] = level;
            // PlaceholderEquipment['ParentEquipmentID'] = 'PLT-003-03';
            // PlaceholderEquipment['ChildEquipmentConfig'] = {};
            // this.AddStyles(PlaceholderEquipment)
            // arEq.push(PlaceholderEquipment);
            // var PlaceholderEquipment = {};
            // PlaceholderEquipment['Equipment_ID'] = 'PLC-001-01';
            // PlaceholderEquipment["level"] = level;
            // PlaceholderEquipment['ParentEquipmentID'] = 'PLT-003-03';
            // PlaceholderEquipment['ChildEquipmentConfig'] = {};
            // this.AddStyles(PlaceholderEquipment)
            // arEq.push(PlaceholderEquipment);
            // var PlaceholderEquipment = {};
            // PlaceholderEquipment['Equipment_ID'] = 'EMPTY';
            // PlaceholderEquipment["level"] = level;
            // PlaceholderEquipment['ParentEquipmentID'] = 'PLT-003-03';
            // PlaceholderEquipment['ChildEquipmentConfig'] = {};
            // this.AddStyles(PlaceholderEquipment)
            // arEq.push(PlaceholderEquipment);
            // var PlaceholderEquipment = {};
            // PlaceholderEquipment['Equipment_ID'] = 'POP-001-01';
            // PlaceholderEquipment["level"] = level;
            // PlaceholderEquipment['ParentEquipmentID'] = 'PLT-003-03';
            // PlaceholderEquipment['ChildEquipmentConfig'] = {};
            // this.AddStyles(PlaceholderEquipment)
            // arEq.push(PlaceholderEquipment);
            // this.GroupObjectPerLevel[1] = arEq;


            // //LEVEL 1
            // var arEq = [];
            // level = 2;
            // var PlaceholderEquipment = {};
            // PlaceholderEquipment['Equipment_ID'] = 'SAM-010-101';
            // PlaceholderEquipment["level"] = level;
            // PlaceholderEquipment['ParentEquipmentID'] = 'PLC-001-01';
            // PlaceholderEquipment['ChildEquipmentConfig'] = {};
            // this.AddStyles(PlaceholderEquipment)
            // arEq.push(PlaceholderEquipment);
            // var PlaceholderEquipment = {};
            // PlaceholderEquipment['Equipment_ID'] = 'PLE-001-01';
            // PlaceholderEquipment["level"] = level;
            // PlaceholderEquipment['ParentEquipmentID'] = 'PLC-001-01';
            // PlaceholderEquipment['ChildEquipmentConfig'] = {};
            // this.AddStyles(PlaceholderEquipment)
            // arEq.push(PlaceholderEquipment);
            // var PlaceholderEquipment = {};
            // PlaceholderEquipment['Equipment_ID'] = 'EMPTY';
            // PlaceholderEquipment["level"] = level;
            // PlaceholderEquipment['ParentEquipmentID'] = 'PLC-001-01';
            // PlaceholderEquipment['ChildEquipmentConfig'] = {};
            // this.AddStyles(PlaceholderEquipment)
            // arEq.push(PlaceholderEquipment);
            // var PlaceholderEquipment = {};
            // PlaceholderEquipment['Equipment_ID'] = 'EMPTY';
            // PlaceholderEquipment["level"] = level;
            // PlaceholderEquipment['ParentEquipmentID'] = 'PLC-001-01';
            // PlaceholderEquipment['ChildEquipmentConfig'] = {};
            // this.AddStyles(PlaceholderEquipment)
            // arEq.push(PlaceholderEquipment);
            // this.GroupObjectPerLevel[2] = arEq;
            

            
            // console.log(this.GroupObjectPerLevel);
            //#endregion

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
                }else{
                    object["MyEquipmentColor"] = '2px dashed black';
                    object["MyEquipmentOpacity"] = 1;
                }
                if(object.Equipment_ID == ''){
                    object["MyEquipmentColor"] = '2px solid black';
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
            //console.log(object['Equipment_ID']+':'+iConfigCount)
            //console.log(object.ChildEquipmentConfig);
            // console.log(object.ParentEquipmentID)

            // if(object.ParentEquipmentID != undefined){
            //         var EquipmentPrefix =  object.ParentEquipmentID.split("-")[0];
            //         // console.log(EquipmentPrefix);
            //         if(null==this.oParentPos[EquipmentPrefix])
            //         {
            //             // console.log(this.oParentPosition[EquipmentPrefix]);
            //             // console.log(EquipmentPrefix)

            //                 //DI Napasok sa IF
            //             if(null!=this.oParentPosition[EquipmentPrefix])
            //             {
            //                 this.ParentTopPosition = this.oParentPosition[EquipmentPrefix];
            //                 // console.log(EquipmentPrefix+':'+this.ParentTopPosition);
            //             }
            //             else
            //             {
            //                     //DITO NABABAGO YUNG TOP POSITION NG LAHAT NG BOX NG PLC AND M
            //                 this.ParentTopPosition = this.ParentTopPosition + 400;
            //                 console.log(EquipmentPrefix+':'+this.ParentTopPosition);
            //             }
            //             var oTempParent = {};
            //             oTempParent['Top'] = this.ParentTopPosition;
            //             oTempParent['Left'] = 0;
            //             this.oParentPos[EquipmentPrefix] = oTempParent;
            //             object["MyEquipmentLeftPosition"] = oTempParent['Left'];
            //                 //NABABAGO YUNG 1st PLC AND M
            //             object["MyEquipmentTopPosition"] = oTempParent['Top'];
            //                 //NABABAGO YUNG TOP POSITION NG EMPTY
            //             this.oParentPosition[EquipmentPrefix] = this.ParentTopPosition;
            //         }
            //         else{ 
            //             var oTempParent = this.oParentPos[EquipmentPrefix];
            //             object["MyEquipmentLeftPosition"] = oTempParent['Left'];
            //             //NAANGAT YUNG 1st PLC SA PLB Level at M sa PLC Level
            //             object["MyEquipmentTopPosition"] = oTempParent['Top'];
            //         }
            // }
            // else
            // {
            //     var EquipmentPrefix =  object.Equipment_ID.split("-")[0];
            //     //console.log(EquipmentPrefix);
            //     if(null==this.oParentPos[EquipmentPrefix])
            //     {
            //         var oTempParent = {};
            //         oTempParent['Top'] = this.ParentTopPosition;
            //         oTempParent['Left'] = 0;
            //         this.oParentPos[EquipmentPrefix] = oTempParent;
            //         object["MyEquipmentLeftPosition"] = oTempParent['Left'];
            //         // NABABAGO YUNG TOP POSITION NI PLT
            //         object["MyEquipmentTopPosition"] = oTempParent['Top'] + 200;
            //         // NABABAGO POSITION NG PLC AND M
            //         this.ParentTopPosition = this.ParentTopPosition;
            //         this.oParentPosition[EquipmentPrefix] = this.ParentTopPosition + 200;
            //         // console.log(this.oParentPosition[EquipmentPrefix])
            //     }
            //     //DI NAPASOK SA ELSE
            //     else{ 
            //         console.log('qwe')
            //         var oTempParent = this.oParentPos[EquipmentPrefix];
            //         object["MyEquipmentLeftPosition"] = oTempParent['Left'];
            //         object["MyEquipmentTopPosition"] = oTempParent['Top'] + 200;
            //     }
            // }
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
                // var iConfigCount = Object.keys(object.ChildrenEquipment[Childkey].ChildEquipmentConfig).length;
                // console.log(object['Equipment_ID']+':'+iConfigCount)
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


                // if(object.ChildrenEquipment[Childkey]["level"] == 3){
                //     // var arrPositionTemp = [];
                //     object.ChildEquipment[Childkey]["MyEquipmentLeftPosition"] = screen.width/iChildCount;
                //     // arrPositionTemp = object["MyEquipmentLeftPosition"];
                //     // arrPositionTemp.push(object.ChildEquipment[Childkey]);
                //     console.log(arrPositionTemp)
                // }

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
            // console.log("No Active Session");
        } else {
            // console.log("Active Users");
            // Iterate over parsedData object
            for (const key in parsedData) {
                if (parsedData.hasOwnProperty(key)) {
                    // console.log("User_ID: " + parsedData[key].User_ID);
                    // console.log("Session_ID: " + parsedData[key].Session_ID);
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
        <div id="mainDiv" v-for="(main,index) in this.GroupObjectPerLevel" :key="index" class="Equipment">
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
        </div>
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
