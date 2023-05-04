import Vue from 'vue'

export class EquipmentConfig extends Vue {
    
    Equipment_ID = '';
    Child_Equipment_Model = '';
    Equipment_Group = '';
    Child_Equipment_Count = '';
    Child_Equipment_Availability_Percent_Requirement = '';
    Default_Get_OrderBy = '';
    RefDTNameForDelete = '';
    idx = '';
    Status = '';
    TempQuery_OrderBy_LastRecord = '';
    Object_Type	= '';
    Insert_DateTime	= '';
    Last_Update_DateTime = '';

    toJSON(object) {
        return {
            Equipment_ID: object.Equipment_ID,
            Child_Equipment_Model: object.Child_Equipment_Model,
            Equipment_Group: object.Equipment_Group,
            Child_Equipment_Count: object.Child_Equipment_Count,
            Child_Equipment_Availability_Percent_Requirement: object.Child_Equipment_Availability_Percent_Requirement,
            Default_Get_OrderBy: object.Default_Get_OrderBy,
            RefDTNameForDelete: object.RefDTNameForDelete,	
            idx: object.idx,
            Status: object.Status,
            TempQuery_OrderBy_LastRecord: object.TempQuery_OrderBy_LastRecord,	
            Object_Type: object.Object_Type,
            Insert_DateTime: object.Insert_DateTime,
            Last_Update_DateTime: object.Last_Update_DateTime,
        };

    }
    
}