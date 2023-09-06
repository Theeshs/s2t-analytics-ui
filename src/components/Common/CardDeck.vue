<template>
    <div class="flex flex-wrap -mx-4 mt-4">
      <!-- Loop through cards and create a card for each -->
      <div v-for="(card, index) in props.cards" :key="index" class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-4">
        <!-- You can use your Card component here or style the card directly -->
          <div class="bg-white shadow-md rounded-lg p-4">
            <img src="https://picsum.photos/200" alt="Card Image" class="mb-4 w-full h-auto" />
            <!-- Card content goes here -->
            <h2 v-if="!enableForm"  class="text-lg font-semibold" @click="onClickDashboard(card.id)">{{card.name}}</h2>
            <label v-if="enableForm" for="dashboardName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dashboard Name</label>
            <input v-if="enableForm" v-model="formData.name" type="text" id="dashboardName" name="dashboardName" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            <!-- <p class="text-gray-600">Card content goes here.</p> -->
            <div class="flex flex-row">
              <div class="basis-1/4"><button class="bg-danger hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded" @click="onClickDeleteButton(card.id)"><DeleteIcon /></button></div>
              <div v-if="!enableForm" class="basis-1/4"><button class="bg-warning hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded" @click="onClickEdit(card)"><EditIcon /></button></div>
              <div v-if="enableForm" class="basis-1/4"><button class="bg-warning hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded" @click="onClickDiscard()"><DiscardIcon /></button></div>
              <div v-if="enableForm" class="basis-1/4"><button class="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded" @click="onSaveName(card)"><SaveIcon /></button></div>
              
            </div>
          </div>
      </div>
    </div>
</template>
  
  <script lang="ts">
  import router from "../../router"
  import { useStore } from 'vuex';
  import { computed, watch, ref } from "vue";
  import EditIcon from "../Icons/Edit.vue"
  import DeleteIcon from "../Icons/DeleteIcon.vue"
  import DiscardIcon from "../Icons/Discard.vue"
  import SaveIcon from "../Icons/SaveIcon.vue"

  export default {
    name: 'CardDeck',
    props: {
      cards: Array, // Pass an array of card data to the component
    },
    components: {
      EditIcon,
      DeleteIcon,
      DiscardIcon,
      SaveIcon
    },
    

    setup(props) {
      const store = useStore();
      const dashboards = computed(() => store.getters['getDashboards'])
      // let dashboarsList = props.cards
      let enableForm = ref(false)
      const formData = {
      "name": ""
      }

      const onClickDashboard = (id: number) => {
        let dbFound = dashboards.value.filter(db => db.id === id)
  
        if (dbFound != undefined && dbFound != null && dbFound.lenght != 0) {
          store.commit('setCurrentDashboardID', dbFound[0])
          router.push(`/dashboard/${dbFound[0].id}`)
    
        } else {
          alert("unable to load the dashboard")
        }
      }

      const onClickDeleteButton = (dbID: number) => {
        store.dispatch("deleteDashboard", dbID)
      }
      
      const onClickEdit = (card: any) => {
        enableForm.value = true
      }

      const onClickDiscard = () => {
        enableForm.value = false
      }

      const onSaveName = (card: any) => {
        const payLoad = {
          "id": card.id,
          "payload": formData
        }

        store.dispatch("updateDashboard", payLoad)
        enableForm.value = false
      }
      return {
        onClickDashboard,
        props,
        onClickDeleteButton,
        onClickEdit,
        enableForm,
        onClickDiscard,
        formData,
        onSaveName,
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any additional styles here if needed */
  </style>