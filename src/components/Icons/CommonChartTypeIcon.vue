<script lang="ts">
export default {
    name: "CommonChartTypeIcon",
    props: {
        chartImage: String
    },

    // setup(props) {
    //     return {
    //         props
    //     }
    // }
}; 
</script>
<template>
    <div class="basics-1/2 bg-white shadow-lg m-2 rounded-lg flex items-center justify-center" v-html="chartImage">
    </div>
</template>