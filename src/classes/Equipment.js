import Vue from 'vue'

export class Equipment extends Vue {

    Equipment_ID = '';
    MES_State = '';
    EUMS_State = '';
    Equipment_Model = '';
    Part_Type =  '';
    Classification = '';
    Productivity_State = '';
    ChildrenEquipment = {};
    ChildEquipmentConfig = {};
    EquipmentUsage = {};

    ParentEquipmentID = '';
    MyEquipmentColor = '';
    MyEquipmentHeight = '';
    MyEquipmentLeftPosition = '';
    MyEquipmentOpacity = '';
    MyEquipmentTopPosition = '';
    MyEquipmentWidth = '';
    MyModalTrigger = '';
    MyScreenHeightSize = '';
    MyScreenWidthSize = '';
    level = '';

    toJSON(object) {
        if(object == undefined)
        {
            return {
                Equipment_ID: this.Equipment_ID,
                MES_State: this.MES_State,
                EUMS_State: this.EUMS_State,
                Equipment_Model: this.Equipment_Model,
                Part_Type: this.Part_Type,
                Classification: this.Classification,
                Productivity_State: this.Productivity_State,
                ChildrenEquipment: this.ChildrenEquipment,
                ChildEquipmentConfig: this.ChildEquipmentConfig,
                EquipmentUsage: this.EquipmentUsage,
    
                ParentEquipmentID: this.ParentEquipmentID,
                MyEquipmentColor: this.MyEquipmentColor,
                MyEquipmentHeight: this.MyEquipmentHeight,
                MyEquipmentLeftPosition: this.MyEquipmentLeftPosition,
                MyEquipmentOpacity: this.MyEquipmentOpacity,
                MyEquipmentTopPosition: this.MyEquipmentTopPosition,
                MyEquipmentWidth: this.MyEquipmentWidth,
                MyModalTrigger: this.MyModalTrigger,
                MyScreenHeightSize: this.MyScreenHeightSize,
                MyScreenWidthSize: this.MyScreenWidthSize,
                level: this.level,
            }
        }
        else{
            return {
                Equipment_ID: object.Equipment_ID,
                MES_State: object.MES_State,
                EUMS_State: object.EUMS_State,
                Equipment_Model: object.Equipment_Model,
                Part_Type: object.Part_Type,
                Classification: object.Classification,
                Productivity_State: object.Productivity_State,
                ChildrenEquipment: object.ChildrenEquipment,
                ChildEquipmentConfig: object.ChildEquipmentConfig,
                EquipmentUsage: object.EquipmentUsage,
    
                ParentEquipmentID: object.ParentEquipmentID,
                MyEquipmentColor: object.MyEquipmentColor,
                MyEquipmentHeight: object.MyEquipmentHeight,
                MyEquipmentLeftPosition: object.MyEquipmentLeftPosition,
                MyEquipmentOpacity: object.MyEquipmentOpacity,
                MyEquipmentTopPosition: object.MyEquipmentTopPosition,
                MyEquipmentWidth: object.MyEquipmentWidth,
                MyModalTrigger: object.MyModalTrigger,
                MyScreenHeightSize: object.MyScreenHeightSize,
                MyScreenWidthSize: object.MyScreenWidthSize,
                level: object.level,
    
            }
        }
    }
}