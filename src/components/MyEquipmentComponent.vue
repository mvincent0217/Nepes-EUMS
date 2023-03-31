<script>
/* eslint-disable */
import MyEquipmentModal from './MyEquipmentModal.vue';
import MyHoverComponent from './MyHoverComponent.vue';
import MyMenuComponent from './MyMenuComponent.vue';
import Swal from 'sweetalert2'
import * as RestAPI from '@/JS/RestAPI.js';

export default { 
    data() {
        return {            
            ShowModal: false,
            TempEquipment_ID: '',
            getApplicableIds: '',

            tempEquipHeight: null,
            tempEquipWidth: null,
            tempEquipLeftPosition: null,

            tempEquipMES_State: '',
            iCount: 0,

            active: false,
            EquipmentIdModal: ''            
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
                    this.$router.push('/hierarchy');
                }
            })
        },
        openModal(){
            this.ShowModal = true;
            this.EquipmentIdModal = this.ParentEquipment_ID;
        },
        CloseModal(e){
            this.ShowModal = false;
        },
        toggle(){
            this.active = !this.active;
            this.getApplicableEquipmentIds();
        },
        async getApplicableEquipmentIds()
        {
            this.getApplicableIds = await RestAPI.ApplicableEquipments(this.ParentEquipment_ID);
            // this.getApplicableIds = JSON.parse(this.getApplicableIds.data)
            // console.log(this.getApplicableIds.data)
            // this.getApplicableIds = JSON.parse(this.getApplicableIds.data)
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
        // console.log(this.ParentEquipment_ID)
    },
    mounted(){
    }
}
</script>
<template>
    <div>
        <div class="Equipment tooltip"
        :style="{
                '--heightEquipment':this.tempEquipHeight,
                '--widthEquipment': this.tempEquipWidth,
                '--leftPositionEquipment': this.tempEquipLeftPosition,
                '--bgColorEquipment': this.MyEquipColor || 'white',
                }">
             <!-- <span v-if="this.Classification == 'Component'" @click.prevent="DeleteEquip(Equipment_ID,ParentEquipment_ID)" class="close">&times;</span> -->
             <a v-if="ParentEquipment_ID" @click="toggle" class="equipmentMenu tooltip">&#9776;</a>
                <label class="EquipTitle"><b><center>{{ Equipment_ID }}</center></b></label>
                <span class="tooltiptext" v-if="Equipment_ID != 'EMPTY'">
                    <MyHoverComponent
                        :Equipment_Model="Equipment_Model"
                        :MES_State="MES_State"
                        :EUMS_State="EUMS_State"
                        :Productivity_State="Productivity_State"
                        :EquipmentUsage="EquipmentUsage"
                    />
                </span>
                <div v-if="active">
                <MyMenuComponent 
                    @DeleteEquipment="DeleteEquip"
                    @PopUpModal="openModal"
                    :Classification="Classification" 
                    :Equipment_ID="Equipment_ID"
                    :ParentEquipment_ID="ParentEquipment_ID"
                />
             </div>

        </div>
        <MyEquipmentModal @BoolModal="CloseModal" ref="modal" 
            :ParentEquipment_ID="this.EquipmentIdModal" 
            :MyModalID="MyModalId" 
            :ShowModal="ShowModal" 
            :LoadModal="ShowModal"
            :ApplicableIds="getApplicableIds.data"
            />
    </div>
</template>