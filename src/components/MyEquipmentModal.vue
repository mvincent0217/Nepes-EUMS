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
            bShowModal: false,
            ModalStyle: '',
            tempApplicableIds: '',
            tempUserID: '',
            bool: true,
        }
    },
    props: {
        MyModalID: String,
        ShowModal: Boolean,
        LoadModal: Boolean,
        CloseModal: Boolean,
        ParentEquipment_ID: String,
        ApplicableIds: String,
    },
    watch: {
        ShowModal: {
            deep: true,
            handler(val) {
                // if(!this.TempBool) { this.TempBool = val; }
                if(val){
                    this.bShowModal = val;
                    //this.Modal = document.getElementById('EquipmentModal');
                    //this.Modal.style.display = "block";
                    //console.log(this.ParentEquipmentId);
                }
            }
        }, 
        ParentEquipment_ID:{
            deep: true,
            handler(val) {
                this.ParentEquipmentId = val
                this.bShowModal = true;
                this.ModalStyle = 'block';
                //this.Modal = document.getElementById('EquipmentModal');
                //this.Modal.style.display = "block";
            }
        },
        ApplicableIds:{
            deep: true,
            handler(val){
                this.tempApplicableIds = JSON.parse(val)
            }
        }
    },
    mounted(){
    },
    methods:
    {
        closeModal(e){
            this.ModalStyle = 'none';
            this.$emit('BoolModal', e);
        },
        async AddEquipment(ParentEquipmentId, ChildEquipmentId){
            this.bool = false;
            this.tempUserID = localStorage.getItem('userID')
            this.GetTempEquipmentResult = await RestAPI.AddEquipment(ParentEquipmentId, ChildEquipmentId, this.tempUserID);
            var x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
            this.ModalStyle = "none";
            location.assign(window.location.origin + '#/hierarchy');
            location.reload();
        },
        CancelEquipment(){
            this.ModalStyle = 'none'
        }

    },
    created(){
    }
}
</script>
<template>
    
    <div>
        <div v-if="this.bShowModal && tempApplicableIds" id="EquipmentModal" class="modal" :style="{display:this.ModalStyle}">
            <div class="modal-content">
                <div class="container">
                    <h1>Add Item</h1>
                    <hr>
                    <label for="ParentEquipmentId"><b>Parent Item Id:</b></label>
                    <input type="text" placeholder="Enter Parent Equipment Id" id="ParentEquipment" name="ParentEquipmentId" v-model="ParentEquipmentId" disabled>

                    <label for="ChildEquipmentId"><b>Child Item Id:</b></label>
                    <select v-model="ChildEquipmentId">
                        <option value="">SELECT IDs Here</option>
                        <option v-for="(id,index) in tempApplicableIds" :key="index">{{ id }}</option>
                    </select>
                    <!-- <input type="text"  name="ChildEquipmentId" v-model="ChildEquipmentId" required> -->

                    <button v-if="this.bool" class="AddEquipmentbtn" @click="AddEquipment(ParentEquipmentId, ChildEquipmentId)">Submit</button>
                    <button class="CancelEquipmentbtn" @click="CancelEquipment()">Cancel</button>
                </div>
            </div>
        </div>
        <div id="snackbar">Successfully Added</div>
    </div>
</template>