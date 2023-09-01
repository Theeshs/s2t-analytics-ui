<script lang="ts">
import { onMounted, computed, ref } from "vue";

import Container from "../components/Layout/Container.vue";
import CommonModal from "../components/Common/Modal.vue"
import CardDeck from "../components/Common/CardDeck.vue"
// import { userStore } from "../store/user";
import router from "../router"
import { useStore } from 'vuex';

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
      debugger
      store.dispatch("fetchData");
      debugger
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
    debugger

    const onCreateDashboardClick = () => {
      router.push('/dashboard/1');
      // showModal.value = true
      debugger
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
