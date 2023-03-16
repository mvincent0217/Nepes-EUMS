<script>
export default {
    props:{
        Classification: String,
    },
    created(){
        console.log();
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
            <li><a href="#">Add</a></li>
            <li><a href="#">Update</a></li>
            <li v-if="Classification == 'Component'"><a href="#">Delete</a></li> 
        </ul>
    </div>
</template>