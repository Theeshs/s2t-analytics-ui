<script lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as Highcharts from "highcharts"


export default {
    name: "Chart",
    props: {
        divID: String,
        chartOptions: Object
    },

    setup(props) {
        console.log(props.chartOptions)
        debugger
        const chartContainerRef = ref(null);
        const chartOptions = ref<Highcharts.Options>(props.chartOptions);

        let chart: Highcharts.Chart | null = null;

        onMounted(() => {
            // console.log(chartContainerRef.value)
            debugger
            chart = Highcharts.chart(
                props.divID,
                chartOptions.value
            );
            debugger
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