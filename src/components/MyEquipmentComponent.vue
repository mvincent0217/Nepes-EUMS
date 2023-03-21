<script>
/* eslint-disable */
import MyEquipmentModal from './MyEquipmentModal.vue';
import MyHoverComponent from './MyHoverComponent.vue';
import MyMenuComponent from './MyMenuComponent.vue';
import Swal from 'sweetalert2'
import * as RestAPI from '@/JS/RestAPI.js';
import VueRouter from 'vue-router'


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
        ParentEquipment_ID: String,

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
        DeleteEquip(ChildID,ParentID){
            console.log('ID ' + ParentID + ' ' + 'Parent ID ' + ChildID);
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
                    RestAPI.RemoveEquipment(ParentID, ChildID);
                    Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                    )
                    this.$router.push('/dashboard');
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
    }
}
</script>
<template>
    <div>
        <div :id="MyModalId" class="Equipment tooltip" @click.self="openModal"
        :style="{
                '--heightEquipment':this.tempEquipHeight,
                '--widthEquipment': this.tempEquipWidth,
                '--leftPositionEquipment': this.tempEquipLeftPosition,
                '--bgColorEquipment': this.MyEquipColor || 'white'
                }">
             <!-- <span v-if="this.Classification == 'Component'" @click.prevent="DeleteEquip(Equipment_ID,ParentEquipment_ID)" class="close">&times;</span> -->
             <a v-if="ParentEquipment_ID" @click="toggle" class="equipmentMenu tooltip">&#9776;</a>
                <label class="EquipTitle" @click.prevent="openModal"><b><center>{{ Equipment_ID }}</center></b></label>
                <span class="tooltiptext">
                    <MyHoverComponent
                        :Equipment_Model="Equipment_Model"
                        :MES_State="MES_State"
                        :EUMS_State="EUMS_State"
                        :Productivity_State="Productivity_State"
                    />
                </span>
                <div v-if="active">
                <MyMenuComponent 
                    @DeleteEquipment="DeleteEquip" 
                    :Classification="Classification" 
                    :MenuEquipment_ID="Equipment_ID"
                    :ParentEquipment_ID="ParentEquipment_ID"
                />
             </div>

        </div>
        <MyEquipmentModal @BoolModal="CloseModal" ref="modal" :MyModalID="MyModalId" :ShowModal="ShowModal"/>
    </div>
</template>