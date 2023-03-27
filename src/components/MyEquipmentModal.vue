<script>
import * as RestAPI from '@/JS/RestAPI.js';
export default {    
    data() {
        return {            
            EquipmentId: '', 
            Modal:null,
            ParentEquipmentId: '',
            ChildEquipmentId: '',
            ToastMessage: '',
        }
    },
    props: {
        MyModalID: String,
        ShowModal: Boolean,
        CloseModal: Boolean
    },
    watch: {
        ShowModal: {
            deep: true,
            handler(val) {
                // if(!this.TempBool) { this.TempBool = val; }
                if(val){
                    this.Modal = document.getElementById('EquipmentModal');
                    this.Modal.style.display = "block";
                }
            }
        },
    },
    methods:
    {
        closeModal(e){
            this.Modal = document.getElementById('EquipmentModal');
            this.Modal.style.display = "none";
            this.$emit('BoolModal', e);
        },
        async AddEquipment(ParentEquipmentId, ChildEquipmentId){
            this.GetTempEquipmentResult = await RestAPI.AddEquipment(ParentEquipmentId, ChildEquipmentId);

            console.log(ParentEquipmentId + ' ' + ChildEquipmentId)
            var x = document.getElementById("snackbar");
            this.ToastMessage = "Successfully Added";
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

            this.Modal.style.display = "none";
        }

    },
    created(){
        this.ParentEquipmentId = 'PLT-003-03'
    }
}
</script>
<template>
    <div v-if="!EquipmentId">
        <div id="EquipmentModal" class="modal">
            <div class="modal-content">
                <span @click="closeModal(false)" class="close">&times;</span>
                <div class="container">
                    <h1>Add</h1>
                    <hr>
                    <label for="ParentEquipmentId"><b>Parent Equipment Id:</b></label>
                    <input type="text" placeholder="Enter Parent Equipment Id" name="ParentEquipmentId" v-model="ParentEquipmentId" required>

                    <label for="ChildEquipmentId"><b>Child Equipment Id:</b></label>
                    <input type="text" placeholder="Enter Child Equipment Id" name="ChildEquipmentId" v-model="ChildEquipmentId" required>

                    <button class="AddEquipmentbtn" @click="AddEquipment(ParentEquipmentId, ChildEquipmentId)">Submit</button>
                </div>
            </div>
        </div>
        <div id="snackbar">{{ToastMessage}}</div>
    </div>
</template>