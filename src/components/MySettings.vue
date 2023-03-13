<script>
import  Navbar from './MyNavigationBar.vue';

export default {
    data() {
        return {
        }
    },
    
    components:{
        Navbar,

    }
}
</script>


<template>
    <div>
        <Navbar/>
        <br>
        <br>
        <form>
        <label for="favcolor">Navigation bar color: </label>
        <input type="color" id="favcolor" name="favcolor" value="#ff0000"><br><br>
        </form>

    </div>
</template>
