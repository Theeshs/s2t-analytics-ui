<script lang="ts">
import { onMounted, defineEmits } from 'vue';

export default {
  name: 'CommonModal',
  props: {
    isOpen: Boolean,
  },
  emits: ['update:isOpen'],
  setup(props, { emit }) {
    onMounted(() => {
      console.log(props.isOpen);
    });
    // const emit = defineEmits()

    const close = () => {
      debugger;
      emit('update:isOpen', false);
    };

    return {
      close,
      props,
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
            <label for="name" class="block text-gray-600">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div class="mb-4">
            <label for="email" class="block text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
      <slot>
        x
        <input type="text" />
      </slot>
      <button
        @click="close"
        class="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded"
      >
        Close
      </button>
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
