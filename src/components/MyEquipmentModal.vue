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
            bShowModal: false
        }
    },
    props: {
        MyModalID: String,
        ShowModal: Boolean,
        LoadModal: Boolean,
        CloseModal: Boolean,
        ParentEquipment_ID: String,
    },
    watch: {
        ShowModal: {
            deep: true,
            handler(val) {
                // if(!this.TempBool) { this.TempBool = val; }
                if(val){
                    this.bShowModal = val;
                    this.Modal = document.getElementById('EquipmentModal');
                    this.Modal.style.display = "block";
                    //console.log(this.ParentEquipmentId);
                }
            }
        }, 
        ParentEquipment_ID:{
            deep: true,
            handler(val) {
                this.ParentEquipmentId = val
                //console.log(val)
            }
        }
    },
    mounted(){
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
        //this.ParentEquipmentId = '123'
    }
}
</script>
<template>
    <div v-if="this.bShowModal" >
        <div  id="EquipmentModal"  class="modal">
            <div class="modal-content">
                <span @click="closeModal(false)" class="close">&times;</span>
                <div class="container">
                    <h1>Add</h1>
                    <hr>
                    <label for="ParentEquipmentId"><b>Parent Equipment Id:</b></label>
                    <input type="text" placeholder="Enter Parent Equipment Id" id="ParentEquipment" name="ParentEquipmentId" v-model="ParentEquipmentId" disabled>

                    <label for="ChildEquipmentId"><b>Child Equipment Id:</b></label>
                    <input type="text" placeholder="Enter Child Equipment Id" name="ChildEquipmentId" v-model="ChildEquipmentId" required>

                    <button class="AddEquipmentbtn" @click="AddEquipment(ParentEquipmentId, ChildEquipmentId)">Submit</button>
                </div>
            </div>
        </div>
        <div id="snackbar">{{ToastMessage}}</div>
    </div>
</template>