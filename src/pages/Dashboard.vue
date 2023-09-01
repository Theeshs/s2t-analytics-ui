<script lang="ts">
import { onMounted, computed, ref } from "vue";

import CareerGoal from "../components/DashBoard/CareerGoal.vue";
import RecentDocuments from "../components/DashBoard/RecentDocuments.vue";
import Container from "../components/Layout/Container.vue";
import CommonModal from "../components/Common/Modal.vue"
import { userStore } from "../store/user";
import { Roles, DashboardMessage } from "../utils/constants";
import router from "../router"

export default {
  name: "Dashboard",
  components: {
    CareerGoal,
    RecentDocuments,
    Container,
    CommonModal,
  },

  setup() {
    const useUserStore = userStore();
    const showModal = ref(false);

    onMounted(() => {
      useUserStore.fetchUser();
    });

    const user = computed(() => {
      return {
        userName: useUserStore.getUserName,
        isManager: useUserStore.getUserRole === Roles.MANAGER,
        isLoading: useUserStore.getLoading,
        dashBardMessage:
          useUserStore.getUserRole === Roles.MANAGER
            ? DashboardMessage.FOR_MANAGER
            : DashboardMessage.FOR_PERSONAL,
      };
    });

    const onCreateDashboardClick = () => {
      router.push('/dashboard/1');
      // showModal.value = true
      debugger
    }


    return {
      user,
      onCreateDashboardClick,
      showModal
    };
  },
};
</script>

<template>
  <Container>
    <div class="flex flex-row">
      <div class="basis-1/2"><h1 class="text-4xl font-bold">Dashboards</h1></div>
      <div class="basis-1/2">
        <div class="flex flex-row justify-content: flex-end">
          <div class="basis-1/2"></div>
          <div class="basis-1/2"></div>
          <div class="basis-1/2"></div>
          <div class="basis-1/2 grid grid-flow-col justify-stretch">
            <button @click="onCreateDashboardClick" class="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="flex flex-row">
      <div class="grid grid-cols-4 gap-4"></div>
      <div class="grid grid-cols-4 gap-4 ">
        <CommonModal v-if="showModal" :isOpen="showModal" @update:isOpen="showModal = $event">
              <template v-slot:default>
                <p class="text-lg">This is the content of the modal.</p>
              </template>
        </CommonModal>
      </div>
      <div class="grid grid-cols-4 gap-4"></div>
    </div> -->
    <!-- <div class="mt-4">
      <p
        :class="[
          'text-2xl font-bold mb-2 lg:mb-0',
          { hidden: user.isLoading === 'failed' },
        ]"
      >
        Hi, {{ user.userName }}👋
      </p>
      <p v-if="user.isLoading === 'loading'" class="hidden">loading...</p>
      <p class="font-normal text-gray-scale-one mt-2">
        {{ user.dashBardMessage }}
      </p>
    </div>
    <div class="grid lg:grid-cols-3 sm:grid-cols-1 gap-10 mt-12">
      <div
        v-if="user.isManager"
        :class="user.isManager ? 'lg:col-span-1' : 'hidden'"
      >
        <CareerGoal />
      </div>

      <div :class="user.isManager ? 'lg:col-span-2' : 'lg:col-span-4'">
        <RecentDocuments />
      </div>
    </div> -->
  </Container>
</template>
