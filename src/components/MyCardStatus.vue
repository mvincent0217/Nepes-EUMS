<script>
export default {
  props: {
  CardTitle: String, // Add this line
  buttonFunction: Function,
  productivityStateResult: {
    required: true,
  },
  CountProductive: Number,
  CountWarning: Number,
  CountCritical: Number,
  CountNonProductive: Number,
  CountSpare: Number,
  CountOngoingRepair: Number,
  CountScrapped: Number,
},
  data() {
    return {
      CardNumber: null,
      bgColor: localStorage.getItem('ButtonColor') || '#0077ff',
    };
  },
  methods: {
  handleButtonClick(CardTitle) {
    this.buttonFunction(CardTitle);
    // console.log(CardTitle);
  },
},
watch: {
    bgColor: function(val) {
      document.documentElement.style.setProperty('--bgCardBtn', val);
    },
  },
};
</script>

<template>
  <div>
    <div class="aligncards">
    <div v-for="(CardTitle, key) in productivityStateResult" :key="key" class="card">
      <div class="card-details">
        <p class="text-title">{{ CardTitle }}</p>
        <a class="text-body" v-if="CardTitle === 'PRODUCTIVE' ? true : false" >{{  CountProductive || 0 }}</a>
        <a class="text-body" v-if="CardTitle === 'WARNING' ? true : false">{{  CountWarning || 0 }}</a>
        <a class="text-body" v-if="CardTitle === 'CRITICAL' ? true : false">{{  CountCritical || 0 }}</a>
        <a class="text-body" v-if="CardTitle === 'NON-PRODUCTIVE' ? true : false">{{  CountNonProductive || 0 }}</a>
        <a class="text-body" v-if="CardTitle === 'SPARE' ? true : false">{{  CountSpare || 0 }}</a>
        <a class="text-body" v-if="CardTitle === 'ONGOING-REPAIR' ? true : false">{{  CountOngoingRepair || 0 }}</a>
        <a class="text-body" v-if="CardTitle === 'SCRAPPED' ? true : false">{{  CountScrapped || 0 }}</a>
      </div>
      <button  :style="{ '--bgCardBtn': bgColor }" class="card-button" @click="handleButtonClick(CardTitle)">Click me</button>
    </div>
  </div>
  </div>
</template>
