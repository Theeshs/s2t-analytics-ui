<script lang="ts">
    import { onMounted, defineEmits } from 'vue';

    export default {
        name: 'PieChartModal',
        props: {
            isOpen: Boolean
        },
        emits: ['update:isOpen'],

        setup(props, {emit}) {
            onMounted(() => {
                console.log(props.isOpen)
            })

            const close = () => {
                emit("update:isOpen", false)
            }

            return {
                close,
                props
            }
        }
    }
</script>

<template>
    <div class="bg-white rounded-lg p-6 shadow-lg w-1/2" @click.stop>
        <div class="container mx-auto mt-8">test modal</div>

        <button
        @click="close"
        class="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded"
      >
        Close
      </button>
    </div>
</template>