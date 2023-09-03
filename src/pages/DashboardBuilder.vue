<script lang="ts">
    import {onMounted, computed, ref} from "vue"
    import Container from "../components/Layout/Container.vue";
    import Chart from "../components/Charts/CommonChart.vue";
    // import LineChartIcon from "../components/Icons/LineChartIcon.vue"
    // import BarChartIcon from "../components/Icons/BarChartIcon.vue"
    // import PieChartIcon from "../components/Icons/PieChartIcon.vue"
    // import DoughnutChartIcon from "../components/Icons/DoughnutChatIcon.vue"
    import CommonChartType from "../components/Icons/CommonChartTypeIcon.vue"
    import jsonData from './chartConfigs.json';
    import {JsonObject} from "../utils/constants"
    import CommonModal from "../components/Common/Modal.vue"
    import { useStore  } from 'vuex';

    export default{
        name: "DashboardBuilder",
        components: {
            Container,
            Chart,
            // LineChartIcon,
            // BarChartIcon,
            // PieChartIcon,
            // DoughnutChartIcon,
            CommonModal,
            CommonChartType

        },

        data() {
            return {
                // charts: [] as string[],
                chartTypes: ["Bar", "Line", "Pie", "Doughnut"] as string[],
                // chartConfig: {},
            };
        },
        methods: {
        },

        setup() {
            const charts = ref([] as string[]);
            let chartConfig = ref({})
            const showModal = ref(false)
            const store = useStore();
            const currentDashboard = computed(() => store.getters['getCurrentDashboardID'])
            const chartsFromStore = computed(() => store.getters["getCharts"])
            const chartTypesAvailable = computed(() => store.getters["getChartTypes"])

            
            onMounted(() => {
                console.log(currentDashboard.value)
                debugger
                if (currentDashboard.value !== null && currentDashboard.value !== undefined) {
                    store.dispatch("fetchChartsForDashboard", currentDashboard.value)
                }
            })

            const onClieckChart = (chartType: any) => {
                
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
                debugger
                console.log(chartConfig)
                store.dispatch("addChartToDashboard", paylaod)
                debugger
                charts.value.push(currentDrawingChart[0].chart_type)
                debugger
            }

            return {
                onClieckChart,
                showModal,
                chartConfig,
                addCharts,
                charts,
                chartTypesAvailable,
                chartsFromStore,
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
                <div class="basics-1/2 bg-white shadow-lg m-2 rounded-lg flex items-center justify-center" v-for="(type, index) in chartTypesAvailable" :key="index">
                    <!-- <LineChartIcon @click="addCharts('line')"/> -->
                    <CommonChartType @click="addCharts(type.id)" :chartImage="type.chart_image" />
                </div>
                <!-- <div class="basics-1/2 bg-white shadow-lg m-2 rounded-lg flex items-center justify-center">
                    <BarChartIcon @click="addCharts('bar')"/>
                </div>
                <div class="basics-1/2 bg-white shadow-lg m-2 rounded-lg flex items-center justify-center">
                    <PieChartIcon @click="addCharts('pie')"/>
                </div> -->
                <!-- <div class="basics-1/2 bg-white shadow-lg m-2 rounded-lg flex items-center justify-center">
                    <DoughnutChartIcon @click="addCharts('doughnut')"/>
                </div> -->
                    <!-- <div @click="addCharts(chartTtpe)" v-for="(chartTtpe, index) in chartTypes" :key="index" class="basis-1/2">
                        {{chartTtpe}}
                    </div> -->
                </div>
            
        </div>

        <div>
            <!-- <button @click="addCharts">Add Item</button> -->
            <div class="flex flex-wrap">
                <div v-for="(chart, index) in chartsFromStore" :key="index" v-bind:class="`order-${index}`" class="basics-1/2 bg-white shadow-lg m-2 rounded-lg flex items-center justify-center">
                    <!-- {{ chart }} -->
                    <Chart @click="onClieckChart(chart)" :divID="`chart-${chart.id}-${index}`" :chartOptions="chart.chart_config"/>
                </div>
            </div>
            
        </div>

        <div class="flex flex-row">
        <div class="grid grid-cols-4 gap-4"></div>
        <div class="grid grid-cols-4 gap-4 ">
            <CommonModal v-if="showModal" :isOpen="showModal" @update:isOpen="showModal = $event">
                <template v-slot:default>
                    <p class="text-lg">This is the content of the modal.</p>
                </template>
            </CommonModal>
        </div>
        <div class="grid grid-cols-4 gap-4"></div>
        </div>
    </Container>
</template>