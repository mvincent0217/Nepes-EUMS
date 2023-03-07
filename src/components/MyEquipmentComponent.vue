<script>
export default {
    props:{
        Equipment_ID: String,
        MES_State: String,
        EUMS_State: String,
        Equipment_Model: String,
        Productivity_State: String,
        ChildrenEquipment: Object,
        ChildrenEquipmentConfig: Object,
        EquipmentUsage: Object,
        MyModalId: String,
    }
    
}
</script>
<template>
    <div>
        
        <div id="myModal" class="Equipment tooltip">
            <a role="button" class="EquipmentClose" aria-label="menu" aria-expanded="false">
                <span>❌</span>
            </a>
                <label><b><center>{{ this.Equipment_ID }}</center></b></label>
                    <span class="tooltiptext">Equipment Model : {{ this.Equipment_Model }} <br> MES STATE : {{ this.MES_State }} <br> EUMS STATE : {{ this.EUMS_State }} <br> PRODUCTIVITY STATE : {{ this.Productivity_State }}</span>
        </div>
    </div>
</template>