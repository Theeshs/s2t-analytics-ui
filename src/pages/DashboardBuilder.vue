<script lang="ts">
    import {onMounted, computed, ref} from "vue"
    import Container from "../components/Layout/Container.vue";
    import Chart from "../components/Charts/CommonChart.vue";
    import LineChartIcon from "../components/Icons/LineChartIcon.vue"
    import BarChartIcon from "../components/Icons/BarChartIcon.vue"
    import PieChartIcon from "../components/Icons/PieChartIcon.vue"
    import DoughnutChartIcon from "../components/Icons/DoughnutChatIcon.vue"
    import jsonData from './chartConfigs.json';
    import {JsonObject} from "../utils/constants"
    import CommonModal from "../components/Common/Modal.vue"
    import { useStore  } from 'vuex';

    export default{
        name: "DashboardBuilder",
        components: {
            Container,
            Chart,
            LineChartIcon,
            BarChartIcon,
            PieChartIcon,
            DoughnutChartIcon,
            CommonModal

        },

        data() {
            return {
                charts: [] as string[],
                chartTypes: ["Bar", "Line", "Pie", "Doughnut"] as string[],
                // chartConfig: {},
            };
        },
        methods: {
            addCharts(chartType: any) {
                const chartPayload = {
                    name: "test",
                    chart_type: 1,
                    dashboard: 1,
                    order: 1
                }
                if (chartType === "bar") {
                    this.chartConfig = jsonData["bar"]
                } else if (chartType === "line") {
                    this.chartConfig = jsonData["line"]
                } else if (chartType === "pie") {
                    this.chartConfig = jsonData["pie"]
                } else if (chartType === "doughnut") {
                    this.chartConfig = jsonData["doughnut"]
                }
                console.log(this.chartConfig)
                debugger
                this.charts.push(chartType)
            },
        },

        setup() {
            let chartConfig = {}
            let charts = []
            const showModal = ref(false)
            const store = useStore();
            const currentDashboard = computed(() => store.getters['getCurrentDashboardID'])
            debugger

            
            onMounted(() => {
                console.log(currentDashboard.value)
                debugger
            })

            const onClieckChart = (chartType: any) => {
                
                showModal.value = true
            }

            const addCharts = (chartType: any) => {
                const db = currentDashboard.value
                const paylaod = {
                    name: "test",
                    chart_type: 1,
                    dashboard: db,
                    order: 1
                }
                debugger
                if (chartType === "bar") {
                    chartConfig = jsonData["bar"]
                } else if (chartType === "line") {
                    chartConfig = jsonData["line"]
                } else if (chartType === "pie") {
                    chartConfig = jsonData["pie"]
                } else if (chartType === "doughnut") {
                    chartConfig = jsonData["doughnut"]
                }
                console.log(chartConfig)
                store.dispatch("addChartToDashboard", paylaod)
                debugger
                charts.push(chartType)
            }

            return {
                onClieckChart,
                showModal,
                chartConfig,
                addCharts
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
                <div class="basics-1/2 bg-white shadow-lg m-2 rounded-lg flex items-center justify-center">
                    <LineChartIcon @click="addCharts('line')"/>
                </div>
                <div class="basics-1/2 bg-white shadow-lg m-2 rounded-lg flex items-center justify-center">
                    <BarChartIcon @click="addCharts('bar')"/>
                </div>
                <div class="basics-1/2 bg-white shadow-lg m-2 rounded-lg flex items-center justify-center">
                    <PieChartIcon @click="addCharts('pie')"/>
                </div>
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
                <div v-for="(chart, index) in charts" :key="index" v-bind:class="`order-${index}`" class="basics-1/2 bg-white shadow-lg m-2 rounded-lg flex items-center justify-center">
                    <Chart @click="onClieckChart(chart)" :divID="`chart-${chart}-${index}`" :chartOptions="chartConfig"/>
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