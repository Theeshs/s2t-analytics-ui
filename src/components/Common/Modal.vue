<script lang="ts">
import { onMounted, defineEmits, computed } from 'vue';
import { useStore  } from 'vuex';

export default {
  name: 'CommonModal',
  props: {
    isOpen: Boolean,
    chartToEdit: {},
    dashboardID: Number
  },
  emits: ['update:isOpen'],
  setup(props, { emit }) {
    const store = useStore()
    debugger
    const formData = {
      "title": null,
      "subTitle": null,
      "xAxis": null,
      "yAxis": null
    }
    onMounted(() => {
      console.log(props.isOpen);
    });
    // const emit = defineEmits()
    const isLoading = computed(() => store.getters("isLoading"))
    const onCharDataSubmit = (event: Event): void => {
      event.preventDefault()
      let halfUrl = `dashboard/${props.dashboardID}/chart/${props.chartToEdit.id}/data`
      const payload = {
        url: halfUrl,
        payload: formData
      }
      store.dispatch("editChartData", payload)
      // debugger
      emit('update:isOpen', false);
      // if (!isLoading) {
      //   de
      // } 

    }

    const close = () => {
      // debugger;
      emit('update:isOpen', false);
    };

    return {
      close,
      props,
      formData,
      onCharDataSubmit,
    };
  },
};
</script>

<template>
  <div
    v-if="props.isOpen"
    class="fixed inset-0 flex items-center justify-center"
  >
    <!-- <div class="absolute inset-0 bg-black opacity-50"></div> -->
    <div class="bg-white rounded-lg p-6 shadow-lg w-1/2" @click.stop>
      <div class="container mx-auto mt-8">
        <form>
          <div class="mb-4">
            <label for="name" class="block text-gray-600">Title</label>
            <input
              type="text"
              id="name"
              name="name"
              v-model="formData.title"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div class="mb-4">
            <label for="subTitle" class="block text-gray-600">Sub Title</label>
            <input
              type="text"
              id="subTitle"
              name="subTitle"
              v-model="formData.subTitle"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div class="mb-4">
            <label for="xAxis" class="block text-gray-600">1st Value</label>
            <input
              type="text"
              id="xAxis"
              name="xAxis"
              v-model="formData.xAxis"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div class="mb-4">
            <label for="yAxis" class="block text-gray-600">2nd Value</label>
            <input
              type="text"
              id="yAxis"
              name="yAxis"
              v-model="formData.yAxis"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <button
            type="submit"
            class="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded"
            @click="onCharDataSubmit"
          >
            Submit
          </button>
        </form>
      </div>
      <!-- <slot>
        x
        <input type="text" />
      </slot> -->
      <!-- <button
        @click="close"
        class="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded"
      >
        Close
      </button> -->
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
