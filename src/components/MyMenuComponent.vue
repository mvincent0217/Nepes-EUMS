<script>
export default {
    props:{
        Classification: String,
        MyModalID: String,
        Equipment_ID: String,
        ParentEquipment_ID: String,
    },
    data() {
        return {
            userCanAddEquipment: false,
            userCanDeleteEquipment: false
        }
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
        // console.log(equipmentId)

        const userRightsJSON = localStorage.getItem('userRights');
        const userRights = JSON.parse(userRightsJSON);
        // console.log(userRights);

        if (userRights.includes(`${equipmentId}_ADD-EQUIPMENT`)) {
            this.userCanAddEquipment = true;
        }

        if (userRights.includes(`${equipmentId}_DELETE-EQUIPMENT`)) {
            this.userCanDeleteEquipment = true;
        }
    }
}
</script>

<template>
    <div>
        <ul class="main-menu">
            <div v-if="userCanAddEquipment">
                <li @click="EmitPopUpModal()" class="main-menu-add-delete" v-if="Equipment_ID == 'Empty'">
                    <a href="#">Add Item</a>
                </li>
            </div>
            <li class="main-menu-add-delete" v-if="Classification == 'Component' && userCanDeleteEquipment" v-on:click="emitDeleteEquipment(Equipment_ID,ParentEquipment_ID)">
                <a href="#">Delete</a>
            </li> 
        </ul>
    </div>
</template>
