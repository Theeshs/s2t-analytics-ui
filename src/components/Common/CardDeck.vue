<template>
    <div class="flex flex-wrap -mx-4 mt-4">
      <!-- Loop through cards and create a card for each -->
      <div v-for="(card, index) in props.cards" :key="index" @click="onClickDashboard(card.id)" class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-4">
        <!-- You can use your Card component here or style the card directly -->
          <div class="bg-white shadow-md rounded-lg p-4">
            <img src="https://picsum.photos/200" alt="Card Image" class="mb-4 w-full h-auto" />
            <!-- Card content goes here -->
            <h2 class="text-lg font-semibold">{{card.name}}</h2>
            <p class="text-gray-600">Card content goes here.</p>
          </div>
      </div>
    </div>
</template>
  
  <script lang="ts">
  import router from "../../router"
  import { useStore } from 'vuex';
  import { computed } from "vue";

  export default {
    name: 'CardDeck',
    props: {
      cards: Array, // Pass an array of card data to the component
    },
    

    setup(props) {
      const store = useStore();
      const dashboards = computed(() => store.getters['getDashboards'])

      const onClickDashboard = (id: number) => {
        let dbFound = dashboards.value.filter(db => db.id === id)
  
        if (dbFound != undefined && dbFound != null && dbFound.lenght != 0) {
          store.commit('setCurrentDashboardID', dbFound[0])
          router.push(`/dashboard/${dbFound[0].id}`)
    
        } else {
          alert("unable to load the dashboard")
        }
      }
      return {
        onClickDashboard,
        props
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any additional styles here if needed */
  </style>