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
            tempParentEquipmentID: '',

            tempEquipHeight: null,
            tempEquipWidth: null,
            tempEquipLeftPosition: null,
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

        MyEquipHeight: Number,
        MyEquipWidth: Number,
        MyEquipLeftPosition: Number,
        MyEquipColor: String,
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
        if(!isNaN(this.MyEquipHeight)){
            this.tempEquipHeight = this.MyEquipHeight + 'px';
        }else{
            //default Value
            this.tempEquipHeight = '300px';
        }
        if(!isNaN(this.MyEquipWidth)){
            this.tempEquipWidth = this.MyEquipWidth + 'px';
        }else{
            //default Value
            this.tempEquipWidth = '300px';
        }
        if(!isNaN(this.MyEquipLeftPosition)){
            this.tempEquipLeftPosition = this.MyEquipLeftPosition + 'px';
        }else{
            //default Value
            this.tempEquipLeftPosition = '300px';
        }
    },
    mounted(){
        // console.log(this.AlertNotification());
    }
}
</script>
<template>
    <div>
        <div :id="MyModalId" class="Equipment tooltip" @click.self="openModal"
        :style="{'--heightEquipment':this.tempEquipHeight,
                 '--widthEquipment': this.tempEquipWidth,
                 '--leftPositionEquipment': this.tempEquipLeftPosition,
                 '--bgColorEquipment': this.MyEquipColor || 'white'
                }">
             <span v-if="this.Classification == 'Equipment'" @click.prevent="showSweetAlert(Equipment_ID)" class="close">&times;</span>
                <label class="EquipTitle" @click.prevent="openModal"><b><center>{{ this.Equipment_ID }}</center></b></label>
                <span class="tooltiptext">
                    <table>
                        <tr>
                        <td>Equipment Model</td>
                        <td>{{ this.Equipment_Model }}</td>
                    </tr>
                    <tr>
                        <td> MES STATE</td>
                        <td>{{ this.MES_State }}</td>
                    </tr>
                    <tr>
                        <td> EUMS STATE</td>
                        <td>{{ this.EUMS_State }}</td>
                    </tr>
                    <tr>
                        <td> PRODUCTIVITY STATE </td>
                        <td>{{ this.Productivity_State }}</td>
                    </tr>
                    </table>
                </span>

        </div>
        <MyEquipmentModal @BoolModal="CloseModal" ref="modal" :MyModalID="MyModalId" :ShowModal="ShowModal"/>
    </div>
</template>