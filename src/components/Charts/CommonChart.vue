<script lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import * as Highcharts from "highcharts"


export default {
    name: "Chart",
    props: {
        divID: String,
        chartOptions: Object
    },

    setup(props) {
        console.log(props.chartOptions)
        const chartContainerRef = ref(null);
        const chartOptions = ref<Highcharts.Options>(props.chartOptions);
        let chart: Highcharts.Chart | null = null;

        watch(() => props.chartOptions, (newChartData) => {
            debugger
            // Update or redraw the chart when props.chartData changes
            // Use the charting library's API to achieve this
            chart = Highcharts.chart(
                props.divID,
                newChartData
            );
        });


        onMounted(() => {
            // console.log(chartContainerRef.value)
            chart = Highcharts.chart(
                props.divID,
                chartOptions.value
            );
        });

        onBeforeUnmount(() => {
            if (chart) {
                chart.destroy();
                chart = null;
            }
        });

        return {
            chartContainerRef,
            props
        };
    }
}
</script>


<template>
    <div :id="props.divID"></div>
</template>