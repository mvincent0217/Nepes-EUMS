<script>
/* eslint-disable */
import MyEquipmentModal from './MyEquipmentModal.vue';
import Swal from 'sweetalert2'

var tempthis;

export default { 
    data() {
        return {            
            ShowModal: false,
            tempChildEquipmentID: '',
            tempParentEquipmentID: ''
        }
    },
    props:{
        Equipment_ID: String,
        MES_State: String,
        EUMS_State: String,
        Equipment_Model: String,
        Productivity_State: String,
        PartType: String,
        Classification: String,
        ChildrenEquipment: Object,
        ChildrenEquipmentConfig: Object,
        EquipmentUsage: Object,
        MyModalId: String,
    },
    components:{
        MyEquipmentModal
    },
    methods: {
        emitPopupModal(){
            this.$emit('PopupModal');
        },
        showSweetAlert(e){
            this.ShowModal = false;
            console.log(e);
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                    )
                }
            })
        },
        openModal(){
            this.ShowModal = true;
        },
        CloseModal(e){
            this.ShowModal = false;
        },
    },
    updated(){
        // console.log(this.ChildrenEquipment)
    },
    created(){
        tempthis = this;
    },
    mounted(){
        // console.log(this.AlertNotification());
    }
}
</script>
<template>
    <div>
        <div :id="MyModalId" class="Equipment tooltip" @click.self="openModal">
             <span @click.prevent="showSweetAlert(Equipment_ID)" class="close">&times;</span> <!-- v-if="this.Classification == 'Component'" -->
                <label><b><center>{{ this.Equipment_ID }}</center></b></label>
                <span class="tooltiptext">Equipment Model : {{ this.Equipment_Model }} <br> MES STATE : {{ this.MES_State }} <br> EUMS STATE : {{ this.EUMS_State }} <br> PRODUCTIVITY STATE : {{ this.Productivity_State }}</span>

        </div>
        <MyEquipmentModal @BoolModal="CloseModal" ref="modal" :MyModalID="MyModalId" :ShowModal="ShowModal"/>
    </div>
</template>