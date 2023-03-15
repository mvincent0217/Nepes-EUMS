<script>
  import Navbar from './MyNavigationBar.vue';
  import Cards from './MyCardStatus.vue';
  import Table from './MyTable.vue';
  
  export default {
    data() {
      return {
        NavbarColor: localStorage.getItem('NavbarColor') || 'Orange',
        ButtonColor: localStorage.getItem('ButtonColor') || 'Blue',
        EquipmentButtonColor: localStorage.getItem('EquipmentButtonColor') || 'Blue',
        GetEquipmentsResult: '',
        ButtonValue: '',
        GetProductivityStateResult: '',
      };
    },
    components: {
      Navbar,
      Cards,
      Table,
    },
    methods: {
        saveNavbarColor() {
        localStorage.setItem('NavbarColor', this.NavbarColor);
      },
      saveButtonColor() {
        localStorage.setItem('ButtonColor', this.ButtonColor);
      },
      saveEquipmentButtonColor() {
        localStorage.setItem('EquipmentButtonColor', this.EquipmentButtonColor);
      },
      refreshPage() {
        location.reload();
      },
    },
    watch: {
        NavbarColor() {
        this.refreshPage();
      },
      ButtonColor() {
        this.refreshPage();
      },
      EquipmentButtonColor() {
        this.refreshPage();
      },
    },
  };
  </script>
  

  <template>
    <div>
      <Navbar :style="{ '--bgcolorNav': NavbarColor || 'Orange' }" />
      <br>
      <a for="color-dropdown">Navigation Bar Color: &nbsp;</a>
      <select id="color-dropdown" v-model="NavbarColor" @change="saveNavbarColor">
        <option value="">--Please select a color--</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="orange">Orange</option>
      </select>
      <Cards :productivityStateResult="GetProductivityStateResult" :style="{ '--bgCardBtn': ButtonColor || '#0077ff' }"/>
      <br>
      <a for="color-dropdown">Card Button Color: &nbsp;</a>
      <select id="color-dropdown" v-model="ButtonColor" @change="saveButtonColor">
        <option value="">--Please select a color--</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="orange">Orange</option>
      </select>
      <br>
      <Table :equipmentData="GetEquipmentsResult" :ButtonValue="this.ButtonValue" :style="{ '--bgEquipmentBtn': EquipmentButtonColor || '#0077ff' }"/>
      <br>
      <a for="color-dropdown">Table Button Color: &nbsp;</a>
      <select id="color-dropdown" v-model="EquipmentButtonColor" @change="saveEquipmentButtonColor">
        <option value="">--Please select a color--</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="orange">Orange</option>
      </select>
    </div>
  </template>