<script lang="ts">
import { onMounted, computed, ref, onUpdated, watch } from "vue"
import Container from "../components/Layout/Container.vue";
import Chart from "../components/Charts/CommonChart.vue";
import CommonChartType from "../components/Icons/CommonChartTypeIcon.vue"
import jsonData from './chartConfigs.json';
import { JsonObject } from "../utils/constants"
import CommonModal from "../components/Common/Modal.vue"
import { useStore } from 'vuex';
import EditIcon from "../components/Icons/Edit.vue"
import DeleteIcon from "../components/Icons/DeleteIcon.vue"

export default {
    name: "DashboardBuilder",
    components: {
        Container,
        Chart,
        // LineChartIcon,
        // BarChartIcon,
        // PieChartIcon,
        // DoughnutChartIcon,
        CommonModal,
        CommonChartType,
        EditIcon,
        DeleteIcon

    },

    data() {
        return {
            // charts: [] as string[],
            chartTypes: ["Bar", "Line", "Pie", "Doughnut"] as string[],
            // chartConfig: {},
        };
    },
    computed: {
    },

    setup() {
        const charts = ref([] as string[]);
        let chartConfig = ref({})
        const showModal = ref(false)
        const store = useStore();
        const currentDashboard = computed(() => store.getters['getCurrentDashboardID'])
        // let chartsFromStore = computed(() => store.getters["getCharts"])
        const chartTypesAvailable = computed(() => store.getters["getChartTypes"])
        const chartToEdit = ref({})
        const chartsFromStore = computed(() => store.getters["getCharts"])
        const storeChartType = computed(() => store.getters["getChartType"])


        onMounted(() => {
            console.log(currentDashboard.value)
            
            if (currentDashboard.value !== null && currentDashboard.value !== undefined) {
                store.dispatch("fetchChartsForDashboard", currentDashboard.value)
            }
        })
        onUpdated(() => {
            
        })

        const onClickDelete = (chart: any) => {
            
            store.dispatch("deleteChart", chart.id)
        }

        // watch(chartsFromStore, (newData) => {
        //     chartsFromStore = newData
        // })

        const onClickChart = (chartConfig: any) => {
            
            store.dispatch("fetchDataSources", chartConfig.chart_type)
            chartToEdit.value = chartConfig
            let x = storeChartType.value
            
            showModal.value = true
        }


        const addCharts = (chartType: any) => {
            const db = currentDashboard.value
            let currentDrawingChart = chartTypesAvailable.value.filter(element => element.id == chartType)
            if (currentDrawingChart.length == 1) {
                if (currentDrawingChart[0].chart_type === "bar") {
                    chartConfig.value = jsonData["bar"]
                } else if (currentDrawingChart[0].chart_type === "line") {
                    chartConfig.value = jsonData["line"]
                } else if (currentDrawingChart[0].chart_type === "pie") {
                    chartConfig.value = jsonData["pie"]
                } else if (currentDrawingChart[0].chart_type === "doughnut") {
                    chartConfig.value = jsonData["doughnut"]
                }
            }
            const paylaod = {
                name: "test",
                chart_type: currentDrawingChart[0].id,
                dashboard: db,
                order: chartsFromStore.value.length + 1,
                chart_config: chartConfig.value
            }
            console.log(chartConfig)
            store.dispatch("addChartToDashboard", paylaod)
            charts.value.push(currentDrawingChart[0].chart_type)
        }

        return {
            onClickChart,
            showModal,
            chartConfig,
            addCharts,
            charts,
            chartTypesAvailable,
            chartsFromStore,
            chartToEdit,
            currentDashboard,
            storeChartType,
            onClickDelete
        }
    },
}
</script>

<template>
    <Container>

        <!-- <div class="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden">
            <img class="w-full h-auto" src="https://via.placeholder.com/300x200" alt="Card Image">
            <div class="px-6 py-4">
            <h3 class="text-xl font-semibold mb-2">tets</h3>
            <p class="text-gray-700 text-base">test</p>
            </div>
        </div> -->


        <div class="flex flex-wrap">
            <div class="bg-white shadow-sm rounded-lg p-4 flex flex-row">
                <div class="basics-1/2 bg-white shadow-lg m-2 rounded-lg flex items-center justify-center"
                    v-for="(type, index) in chartTypesAvailable" :key="index">
                    <!-- <LineChartIcon @click="addCharts('line')"/> -->
                    <CommonChartType @click="addCharts(type.id)" :chartImage="type.chart_image" />
                </div>
            </div>

        </div>

        <div>
            <div class="flex flex-wrap">
                <div v-for="(chart, index) in chartsFromStore" :key="index" :class="`order-${index}`"
                    class="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
                    <div class="bg-white shadow-lg rounded-lg">
                        <div class="p-4 flex justify-between items-center">
                            <div class="flex items-center">
                                <!-- You can place any content here -->
                            </div>
                            <div class="flex items-center">
                                <button @click="onClickChart(chart)"
                                    class="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded mr-2">
                                    <EditIcon />
                                </button>
                                <button @click="onClickDelete(chart)"
                                    class="bg-danger hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded mr-2">
                                    <DeleteIcon />
                                </button>
                            </div>
                        </div>
                        <div class="p-4">
                            <Chart :divID="`chart-${chart.id}-${index}`" :chartOptions="chart.chart_config" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-row">
            <div class="grid grid-cols-4 gap-4"></div>
            <div class="grid grid-cols-4 gap-4 ">
                <CommonModal v-if="showModal" :isOpen="showModal" :chartToEdit="chartToEdit" :dashboardID="currentDashboard"
                    @update:isOpen="showModal = $event" />
            </div>
            <div class="grid grid-cols-4 gap-4"></div>
        </div>
    </Container>
</template>