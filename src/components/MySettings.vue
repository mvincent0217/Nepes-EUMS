<script>
  import Navbar from './MyNavigationBar.vue';
  import Cards from './MyCardStatus.vue';
  import Table from './MyTable.vue';
  
  export default {
    data() {
      return {
        NavbarColor: localStorage.getItem('NavbarColor') || 'Orange',
        ButtonColor: localStorage.getItem('ButtonColor') || '#0077ff',
        EquipmentButtonColor: localStorage.getItem('EquipmentButtonColor') || '#0077ff',
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
  <div >
      <div class="FormSettingsCard">
         <div class="aligncards">
          <div class="card">
           <div class="card-details">
             <p class="text-title">CardTitle</p>
             <a class="text-body">0</a>
           </div>
           <button :style="{ '--bgCardBtn': ButtonColor || '#0077ff'}" class="card-button">Click me</button>
         </div>
        </div>
     </div>
     <div class="FormSettingsButton">
      <button :style="{ '--bgEquipmentBtn': EquipmentButtonColor || '#0077ff' }" class="ViewEquipIDBtn">View</button>
    </div>
  </div>
      <form>
    <div class="Formcard">
      <a for="color-dropdown">Navigation Bar Color: &nbsp;</a>
      <select id="color-dropdown" class="Settingsdropdown" v-model="NavbarColor" @change="saveNavbarColor">
        <option value="">--Please select a color--</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="orange">Orange</option>
      </select>
      <Cards :productivityStateResult="GetProductivityStateResult" :style="{ '--bgCardBtn': ButtonColor || '#0077ff' }"/>
      <br>
      <a for="color-dropdown">Card Button Color: &nbsp;</a>
      <select id="color-dropdown" class="Settingsdropdown" v-model="ButtonColor" @change="saveButtonColor">
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
      <select id="color-dropdown" class="Settingsdropdown" v-model="EquipmentButtonColor" @change="saveEquipmentButtonColor">
        <option value="">--Please select a color--</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="orange">Orange</option>
      </select>
    </div>
    </form>
    </div>
  </template>