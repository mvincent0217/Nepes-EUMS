<script>
export default {
  data() {
    return {
      ButtonNewVariable: ''
    }
  },
  props: {
    equipmentData: {
      required: true
    },
    ButtonValue: {
      type: String,
      required: true
    }
  },
  watch: {
    ButtonValue(newValue) {
      this.ButtonNewVariable = `${newValue}`
    }
  },
  methods: {
    emitEquipmentId(equipmentId) {
      this.$emit('equipmentIdSelected', equipmentId)
    }
  }
}
</script>

<template>
  <div v-if="ButtonValue">
    <h3 class="TitleFont">{{ ButtonValue }}</h3>
    <table>
      <thead>
        <tr class="ToprowFont">
          <th>Equipment ID</th>
          <th>MES State</th>
          <th>EUMS State</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in equipmentData" :key="index">
          <td v-if="data.Productivity_State == ButtonNewVariable">{{ data.Equipment_ID }}</td>
          <td v-if="data.Productivity_State == ButtonNewVariable">{{ data.MES_State }}</td>
          <td v-if="data.Productivity_State == ButtonNewVariable">{{ data.EUMS_State }}</td>
   
          <td v-if="data.Productivity_State == ButtonNewVariable">
            <button class="ViewEquipIDBtn" @click="emitEquipmentId(data.Equipment_ID)">View</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

