<template>
    <div>
      <div>Index: {{ index }}</div>
      <div>Names Array: {{ namesArray }}</div>
      <div>Name: {{ namesArray[index] }}</div>
      <div>Name: {{ Equipment_ID }}</div>
    </div>
  </template>
  
  <script>
  export default {
    name: "MyEquipmentComponentChildrenEquipment",
    props: ["names-array", "index","Equipment_ID"]
  };
  </script>