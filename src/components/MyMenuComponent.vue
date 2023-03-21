<script>
export default {
    props:{
        Classification: String,
        MenuEquipment_ID: String,
        ParentEquipment_ID: String,
    },
    methods:{
        emitDeleteEquipment(MenuEquipment_ID, ParentEquipment_ID){
            this.$emit('DeleteEquipment',MenuEquipment_ID, ParentEquipment_ID);
        },
        DisplayAlert(){
            alert('clicked');
            console.log('clicked equipment')
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
            <li><a href="#">Add ▼</a>
                <ul class="menu-list">
                    <li @click="DisplayAlert()"><a href="#">Equipment</a></li>
                    <li><a href="#">Usage</a></li>
                </ul>
            </li>
            <li v-if="Classification == 'Component'" v-on:click="emitDeleteEquipment(MenuEquipment_ID,ParentEquipment_ID)"><a href="#">Delete</a></li> 
        </ul>
    </div>
</template>