<script>
/* eslint-disable */
import MyEquipmentModal from './MyEquipmentModal.vue';
import MyHoverComponent from './MyHoverComponent.vue';
import MyMenuComponent from './MyMenuComponent.vue';
import Swal from 'sweetalert2'

var tempthis;

export default { 
    data() {
        return {            
            ShowModal: false,
            TempEquipment_ID: '',

            tempEquipHeight: null,
            tempEquipWidth: null,
            tempEquipLeftPosition: null,

            tempEquipMES_State: '',
            iCount: 0,

            active: false,
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
        MyEquipmentModal,
        MyHoverComponent,
        MyMenuComponent,
    },
    methods: {
        emitPopupModal(){
            this.$emit('PopupModal');
        },
        DeleteEquip(e){
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
                    console.log('delete click'),
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
        toggle(){
            this.active = !this.active;
        }
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
        this.TempEquipment_ID = localStorage.getItem('equipmentId')
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
             <!-- <span v-if="this.Classification == 'Component'" @click.prevent="showSweetAlert(Equipment_ID)" class="close">&times;</span> -->
             <a @click="toggle" class="equipmentMenu" v-if="Equipment_ID != TempEquipment_ID">&#9776;</a>
             <div v-if="active">
                <MyMenuComponent @DeleteEquipment="DeleteEquip()" :Classification="Classification" :MenuEquipment_ID="Equipment_ID"/>
             </div>
                <label class="EquipTitle" @click.prevent="openModal"><b><center>{{ this.Equipment_ID }}</center></b></label>
                <span class="tooltiptext">
                    <MyHoverComponent
                        :Equipment_Model="Equipment_Model"
                        :MES_State="MES_State"
                        :EUMS_State="EUMS_State"
                        :Productivity_State="Productivity_State"
                    />
                </span>

        </div>
        <MyEquipmentModal @BoolModal="CloseModal" ref="modal" :MyModalID="MyModalId" :ShowModal="ShowModal"/>
    </div>
</template>