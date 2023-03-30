<script>
import Vue from 'vue'
import moment from 'moment';
Vue.prototype.moment = moment;
export default {
    data() {
        return {            
            TempEquipment_Model: '',
            TempMES_State: '',
            TempEUMS_State: '',
            TempProductivity_State: '',
            TempUsage_Equipment_ID: '',
            TempUsage_Usage_Unit: '',
            TempUsage_Cummulative_Usage: '',
            TempUsage_Last_Repair_Timestamp: '',
        }
    },
    props: {
        Equipment_Model: String,
        MES_State: String,
        EUMS_State: String,
        Productivity_State: String,
        EquipmentUsage: Object,
    },
    watch:{
        Equipment_Model: {
            deep: true,
            handler(val) {
                this.TempEquipment_Model = val;
                console.log(val)
            }
        },
        MES_State: {
            deep: true,
            handler(val) {
                this.TempMES_State = val;
            }
        },
        EUMS_State: {
            deep: true,
            handler(val) {
                this.TempEUMS_State = val;
            }
        },
        Productivity_State: {
            deep: true,
            handler(val) {
                this.TempProductivity_State = val;
            }
        },
        EquipmentUsage:{
            deep: true,
            handler(val){
                console.log(val)
                this.TempUsage_Equipment_ID = val['AMP-MIN'];
            }
        }
    },
    created(){
    }
}
</script>
<template>
        <table>
            <th>Name</th>
            <th>Value</th>
            <tr>
                <td>Equipment Model</td>
                <td>{{ Equipment_Model }}</td>
            </tr>
            <tr>
                <td> MES STATE</td>
                <td>{{ MES_State }}</td>
            </tr>
            <tr>
                <td> EUMS STATE</td>
                <td>{{ EUMS_State }}</td>
            </tr>
            <tr>
                <td> PRODUCTIVITY STATE </td>
                <td>{{ Productivity_State }}</td>
            </tr>
            <tr>
                <td>Equipment ID</td>
                <td>{{ EquipmentUsage['AMP-MIN'].Equipment_ID }}</td>
            </tr>
            <tr>
                <td>Usage Unit</td>
                <td>{{ EquipmentUsage['AMP-MIN'].Usage_Unit }}</td>
            </tr>
            <tr>
                <td>Cummulative Usage</td>
                <td>{{ EquipmentUsage['AMP-MIN'].Cummulative_Usage }}</td>
            </tr>
            <tr>
                <td>Last Repair Timestamp</td>
                <td>{{ moment(EquipmentUsage['AMP-MIN'].Last_Repair_TimeStamp).format('MMM DD YYYY hh:mmA')}}</td>
            </tr>
        </table>
</template>