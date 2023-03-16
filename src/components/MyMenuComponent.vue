<script>
export default {
    props:{
        Classification: String,
    },
    created(){
        console.log();
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