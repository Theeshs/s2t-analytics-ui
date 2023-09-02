<script lang="ts">
import { onMounted, computed, ref } from "vue";

import Container from "../components/Layout/Container.vue";
import CommonModal from "../components/Common/Modal.vue"
import CardDeck from "../components/Common/CardDeck.vue"
// import { userStore } from "../store/user";
import router from "../router"
import { useStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid';
import { DashboardCreatePayload } from "../utils/type"

export default {
  name: "Dashboard",
  components: {
    Container,
    CommonModal,
    CardDeck
  },

  setup() {
    const store = useStore();
    const showModal = ref(false);

    onMounted(() => {
      store.dispatch("fetchData");
    });

    // const user = computed(() => {
    //   return {
    //     userName: useUserStore.getUserName,
    //     isManager: useUserStore.getUserRole === Roles.MANAGER,
    //     isLoading: useUserStore.getLoading,
    //     dashBardMessage:
    //       useUserStore.getUserRole === Roles.MANAGER
    //         ? DashboardMessage.FOR_MANAGER
    //         : DashboardMessage.FOR_PERSONAL,
    //   };
    // });
    const dashboards = computed(() => store.getters['getDashboards'])
    console.log(dashboards.value)

    const onCreateDashboardClick = () => {
      const randomUUID = uuidv4();
      console.log('Random UUID:', randomUUID);
      let dashboardCratePayload : DashboardCreatePayload = {
        name: `${randomUUID}-dashboard`,
        isDeleted: false,
        createdAt: null,
        updatedAt: null
      }
      store.dispatch("createDashbooard", dashboardCratePayload);
    }


    return {
      // user,
      onCreateDashboardClick,
      showModal,
      dashboards
    };
  },
};
</script>

<template>
  <Container>
    <div class="flex flex-row">
      <div class="basis-1/2">
        <h1 class="text-4xl font-bold">Dashboards</h1>
      </div>
      <div class="basis-1/2">
        <div class="flex flex-row justify-content: flex-end">
          <div class="basis-1/2"></div>
          <div class="basis-1/2"></div>
          <div class="basis-1/2"></div>
          <div class="basis-1/2 grid grid-flow-col justify-stretch">
            <button @click="onCreateDashboardClick"
              class="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <CardDeck :cards="dashboards" />
    </div>
  </Container>
</template>
