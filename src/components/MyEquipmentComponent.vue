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
            tempUserID: '',

            tempEquipHeight: null,
            tempEquipWidth: null,
            tempEquipLeftPosition: null,
            tempEquipTopPosition: null,

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
        EquipmentLevel: Number,

        MyEquipHeight: Number,
        MyEquipWidth: Number,
        MyEquipLeftPosition: Number,
        MyEquipColor: String,
        MyEquipTopPosition: Number,
        MyEquipOpacity: Number,
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
                    this.tempUserID = localStorage.getItem('userID')
                    RestAPI.RemoveEquipment(ParentID, ChildID, this.tempUserID);
                    Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                    )
                    location.assign(window.location.origin + '#/hierarchy');
                    location.reload();
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
        }
    },
    updated(){
    },
    created(){
        if(!isNaN(this.MyEquipHeight)){
            this.tempEquipHeight = this.MyEquipHeight + 'px';
        }else{
            //default Value
            this.tempEquipHeight = '100px';
        }
        if(!isNaN(this.MyEquipWidth)){
            this.tempEquipWidth = this.MyEquipWidth + 'px';
        }else{
            //default Value
            this.tempEquipWidth = '100px';
        }
        if(!isNaN(this.MyEquipLeftPosition)){
            this.tempEquipLeftPosition = this.MyEquipLeftPosition;// + 'px';
        } else{
            //default Value
            // this.tempEquipLeftPosition = '300px';
        }
        if(!isNaN(this.MyEquipTopPosition)){
            this.tempEquipTopPosition = this.MyEquipTopPosition;// + 'px';
        }else{
            
        }
        //console.log('qwe')
        //console.log(this.tempEquipTopPosition)
        this.TempEquipment_ID = localStorage.getItem('equipmentId')
    },
    mounted(){
    }
}
</script>
<template>
    <span>
        <div class="Equipment tooltip"
        :style="{
                '--heightEquipment':this.tempEquipHeight,
                '--widthEquipment': this.tempEquipWidth,
                '--leftPositionEquipment': this.tempEquipLeftPosition+'px',
                '--bgColorEquipment': this.MyEquipColor || 'white',
                '--topPositionEquipment': this.MyEquipTopPosition +'px',
                '--opacityEquipment': this.MyEquipOpacity,
                }">
             <!-- <span v-if="this.Classification == 'Component'" @click.prevent="DeleteEquip(Equipment_ID,ParentEquipment_ID)" class="close">&times;</span> -->
             <a v-if="Equipment_ID != ''" @click="toggle" class="equipmentMenu tooltip">&#9776;</a>
                <label class="EquipTitle"><b><center>{{ Equipment_ID }}</center></b></label>
                <span class="tooltiptext" v-if="Equipment_ID != '' && Equipment_ID != 'Empty'">
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
    </span>
</template>