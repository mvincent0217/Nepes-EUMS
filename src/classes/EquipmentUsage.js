import Vue from 'vue'

export class EquipmentUsage extends Vue {

    Usage_Config_ID = '';
    Equipment_ID = '';
    Installation_TimeStamp = '';
    Last_Repair_TimeStamp = '';
    Usage_Status = '';	
    EUMS_State = '';
    Usage_Unit = '';
    Cummulative_Usage = '';
    Total_Accumulated_Usage = '';
    Default_Get_OrderBy = '';
    RefDTNameForDelete = '';
    idx = '';
    Status = '';
    TempQuery_OrderBy_LastRecord = '';	
    Object_Type = '';
    Insert_DateTime = '';
    Last_Update_DateTime = '';


    toJSON(object) {
        return {
            Usage_Config_ID: object.Usage_Config_ID,
            Equipment_ID: object.Equipment_ID,
            Installation_TimeStamp: object.Installation_TimeStamp,
            Last_Repair_TimeStamp: object.Last_Repair_TimeStamp,
            EUMS_State: object.EUMS_State,
            Usage_Unit: object.Usage_Unit,
            Cummulative_Usage: object.Cummulative_Usage,	
            Total_Accumulated_Usage: object.Total_Accumulated_Usage,
            Default_Get_OrderBy: object.Default_Get_OrderBy,
            RefDTNameForDelete: object.RefDTNameForDelete,	
            idx: object.idx,
            TempQuery_OrderBy_LastRecord: object.TempQuery_OrderBy_LastRecord,
            Object_Type: object.Object_Type,
            Insert_DateTime: object.Insert_DateTime,
            Last_Update_DateTime: object.Last_Update_DateTime,
        };

    }
    
}