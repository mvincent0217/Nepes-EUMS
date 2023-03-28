<script>
export default {
    props:{
        Classification: String,
        MyModalID: String,
        Equipment_ID: String,
        ParentEquipment_ID: String,
    },
    methods:{
        emitDeleteEquipment(Equipment_ID, ParentEquipment_ID){
            this.$emit('DeleteEquipment',Equipment_ID, ParentEquipment_ID);
        },
        EmitPopUpModal(){
            this.$emit('PopUpModal');
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
            <li v-if="Equipment_ID == 'EMPTY'"><a href="#">Add ▼</a>
                <ul class="menu-list">
                    <li @click="EmitPopUpModal()"><a href="#">Add Item</a></li>
                    <li><a href="#">Usage</a></li>
                </ul>
            </li>
            <li v-if="Classification == 'Component'" v-on:click="emitDeleteEquipment(Equipment_ID,ParentEquipment_ID)"><a href="#">Delete</a></li> 
        </ul>
    </div>
</template>