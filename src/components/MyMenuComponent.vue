<script>
export default {
    props:{
        Classification: String,
        MenuEquipment_ID: String,
    },
    method:{
        emitDelete(e){
            this.$emit('DeleteEquipment',e);
            console.log(e);
        },
    },
    created(){
        const equipmentId = localStorage.getItem('equipmentId');
        console.log(equipmentId)
        const userRightsJSON = localStorage.getItem('userRights');
        const userRights = JSON.parse(userRightsJSON);
        console.log(userRights);
    }
}
</script>
<template>
     <div class="main-menu">
        <ul class="menu-list">
            <li><a>Add ▼</a>
                <ul>
                    <li><a>Equipment</a></li>
                    <li><a>Usage</a></li>
                </ul>
            </li>
            <li><a>Update</a></li>
            <li v-if="Classification == 'Component'" @click="emitDelete(MenuEquipment_ID)"><a>Delete</a></li> 
        </ul>
    </div>
</template>