<script lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import * as Highcharts from "highcharts"


export default {
    name: "Chart",
    props: {
        divID: String,
        chartOptions: Object,
        height: Number,
        width: Number
    },

    setup(props) {
        debugger
        console.log(props.chartOptions)
        const chartContainerRef = ref(null);
        const chartOptions = ref<Highcharts.Options>(props.chartOptions);
        let chart: Highcharts.Chart | null = null;

        watch(() => props.chartOptions, (newChartData) => {
            // Update or redraw the chart when props.chartData changes
            // Use the charting library's API to achieve this
            chart = Highcharts.chart(
                props.divID,
                newChartData
            );
        });


        onMounted(() => {
            // chartOptions.value.plotBox.height = 1000
            // chartOptions.value["plotBox"]["width"] = 50
            // console.log(chartContainerRef.value)
            chartOptions.value.plotHeight=props.height
            chartOptions.value.plotWidth=props.width
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
    <div :style="{width: props.width, height:props.height}" :id="props.divID" ></div>
</template>