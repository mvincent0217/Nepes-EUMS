<script>
export default {
    data() {
        return {            
            TempEquipment_Model: '',
            TempMES_State: '',
            TempEUMS_State: '',
            TempProductivity_State: '',
        }
    },
    props: {
        Equipment_Model: String,
        MES_State: String,
        EUMS_State: String,
        Productivity_State: String,
    },
    watch:{
        Equipment_Model: {
            deep: true,
            handler(val) {
                this.TempEquipment_Model = val;
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
    }
}
</script>
<template>
        <table>
            <tr>
                <td>Equipment Model</td>
                <td>{{ this.TempEquipment_Model }}</td>
            </tr>
            <tr>
                <td> MES STATE</td>
                <td>{{ this.TempMES_State }}</td>
            </tr>
            <tr>
                <td> EUMS STATE</td>
                <td>{{ this.TempEUMS_State }}</td>
            </tr>
            <tr>
                <td> PRODUCTIVITY STATE </td>
                <td>{{ this.TempProductivity_State }}</td>
            </tr>
        </table>
</template>