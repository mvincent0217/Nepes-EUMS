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
            userCanDeleteEquipment: false,
            isEditing: localStorage.getItem('isEditing')
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

        console.log(localStorage.getItem('isEditing'))
    }
}
</script>

<template>
    <div v-if="isEditing === 'true'">
    <div>
        <ul class="main-menu">
            <div v-if="userCanAddEquipment">
            <li v-if="Equipment_ID == 'Empty'"><a href="#">Add ▼</a>
                <ul class="main-menu">
                    <li @click="EmitPopUpModal()"><a class ="OptionColor" href="#">Add Item</a></li>
                </ul>
            </li>
            </div>
            <li class ="OptionColor" v-if="Classification == 'Component' && userCanDeleteEquipment" v-on:click="emitDeleteEquipment(Equipment_ID,ParentEquipment_ID)"><a href="#">Delete</a></li> 
        </ul>
    </div>
</div>
</template>
