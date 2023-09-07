<script lang="ts">
import { onMounted, defineEmits, computed, watch } from 'vue';
import { useStore } from 'vuex';

interface FormData {
   title: string;
   subTitle: string;
   xAxis: string;
   yAxis: string;
   dataSourceName: string;
   linChartValues: []
   height: number
   width: number
}

export default {
  name: 'CommonModal',
  props: {
    isOpen: Boolean,
    chartToEdit: {},
    dashboardID: Number,
    // chartType: String
  },
  emits: ['update:isOpen'],
  methods: {
  },
  setup(props, { emit }) {
    const store = useStore()

    const formData: FormData = {
      "title": "",
      "subTitle": "",
      "xAxis": "",
      "yAxis": "",
      "dataSourceName": "",
      "linChartValues": [],
      "height": 0,
      "width": 0
    }
    const selecteDataSource = null
    onMounted(() => {

    });
    // const emit = defineEmits()
    const isLoading = computed(() => store.getters["isLoading"])
    const dataSourcesList = computed(() => store.getters["getDataSoureces"])
    const columnList = computed(() => store.getters["getColumns"])
    const chartType = computed(() => store.getters["getChartType"])
    const onCharDataSubmit = (event: Event): void => {
      event.preventDefault()
      let halfUrl = `dashboard/${props.dashboardID}/chart/${props.chartToEdit.id}/data`
      const payload = {
        url: halfUrl,
        payload: formData
      }
      store.dispatch("editChartData", payload)
      emit('update:isOpen', false);
      
      // if (!isLoading) {
      //   de
      // } 

    }

    const close = () => {
      emit('update:isOpen', false);
    };

    const dataSourceOnChange = (event: Event) => {
      formData.dataSourceName = event?.target?.value
      const payload = {
        "chartType": chartType.value,
        "sourceName": formData.dataSourceName
      }
    
      store.dispatch("fetchDataSourcesColumns", payload)
    }

    const cType = () => {
      if (chartType.value === "line") {
      
        return true
      } else {
        return false
      }
    }

    return {
      close,
      props,
      formData,
      onCharDataSubmit,
      columnList,
      dataSourceOnChange,
      selecteDataSource,
      dataSourcesList,
      cType
    };
  },
};
</script>

<template>
  <div v-if="props.isOpen" class="fixed inset-0 flex items-center justify-center">
    <!-- <div class="absolute inset-0 bg-black opacity-50"></div> -->
    <div class="bg-white rounded-lg p-6 shadow-lg w-1/2" @click.stop>
      <div class="container mx-auto mt-8">
        <form>
          <div class="mb-4">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
            <input type="text" id="name" name="name" v-model="formData.title"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
          </div>

          <div class="mb-4">
            <label for="subTitle" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sub Title</label>
            <input type="text" id="subTitle" name="subTitle" v-model="formData.subTitle"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
          </div>
          <div class="mb-4">
            <label for="height" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Height</label>
            <input type="text" id="height" name="height" v-model="formData.height"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
          </div>
          <div class="mb-4">
            <label for="height" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Width</label>
            <input type="text" id="height" name="height" v-model="formData.width"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
          </div>
          <div class="mb-4">
            <label for="dataSource" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data Source</label>
              <select id="dataSource" v-model="selecteDataSource" name="dataSource" @change="dataSourceOnChange" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option v-for="(colum, index) in dataSourcesList"  :key="index" :value="colum">{{ colum }}</option>
              </select>
          </div>
          <div v-if="!cType()" class="mb-4">
            <label for="xAxis" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">X Value</label>
              <select id="xAxis" name="xAxis" v-model="formData.xAxis" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option v-for="(colum, index) in columnList"  :key="index" :value="colum">{{ colum }}</option>
              </select>
          </div>
          <div v-if="cType()" class="mb-4">
            <label for="yAxis" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Y Value</label>
              <select multiple id="yAxis" name="yAxis" v-model="formData.linChartValues" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option v-for="(colum, index) in columnList"  :key="index" :value="colum">{{ colum }}</option>
              </select>
          </div>
          <div v-if="!cType()" class="mb-4">
            <label for="yAxis" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Y Value</label>
              <select id="yAxis" name="yAxis" v-model="formData.yAxis" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option v-for="(colum, index) in columnList"  :key="index" :value="colum">{{ colum }}</option>
              </select>
          </div>

          <div class="flex flex-row">
            <div class="basis-1/4">
              <button type="submit" class="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded"
                @click="onCharDataSubmit">Submit</button>
            </div>

            <div class="basis-1/4">
              <button @click="close" class="bg-danger hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded">
                Close
              </button>
              
            </div>
            <div class="basis-1/4"></div>
            <div class="basis-1/4"></div>
            <div class="basis-1/4"></div>
            <div class="basis-1/4"></div>
            <div class="basis-1/4"></div>
            <div class="basis-1/4"></div>
            <div class="basis-1/4"></div>
            <div class="basis-1/4"></div>
          </div>

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
