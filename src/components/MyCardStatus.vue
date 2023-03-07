<script>
export default {
  data() {
    return {
      MyCardTitle: '',
      MyCardNumber: '',
    };
  },
  props: {
    equipmentData: Array,
    CardTitle: String,
    CardNumber: Number,
    bgcolorCard: String,
    buttonFunction: Function  // Add this prop

  },
  methods: {
    handleButtonClick() {
    this.buttonFunction(this.CardTitle);
    
  }
  },
  watch: {
    CardTitle: {
      deep: true,
      handler(val) {
        this.MyCardTitle = val;
      },
    },
    CardNumber: {
      deep: true,
      handler(val) {
        this.MyCardNumber = val;
      },
    },
  },
};
</script>



<template>
    <div class="card" :style="{'--bgcolorCard':this.bgcolorCard} ">
        <div class="card-details">
            <p class="text-title">{{ CardTitle }}</p>
            <p class="text-body">{{ CardNumber }}</p>
         </div>
            <button class="card-button" @click="handleButtonClick">Click me</button>
    </div>
    
</template>