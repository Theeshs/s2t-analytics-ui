<script lang="ts">
import { onMounted, defineEmits } from 'vue';

export default {
    name: "CommonModal",
    props: {
        isOpen: Boolean
    },
    emits: ['update:isOpen'],
    setup(props, {emit}) {
        onMounted(() => {
            console.log(props.isOpen)
        })
        // const emit = defineEmits()

        const close = () => {
            debugger
            emit('update:isOpen', false);

        }

        return {
            close,
            props,
        }
    }
    
}
</script>

<template>
    <div v-if="props.isOpen" class="fixed inset-0 flex items-center justify-center">
      <!-- <div class="absolute inset-0 bg-black opacity-50"></div> -->
      <div
        class="bg-white rounded-lg p-6 shadow-lg w-1/2"
        @click.stop
      >
        <slot>
        </slot>
        <button @click="close" class="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded">
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