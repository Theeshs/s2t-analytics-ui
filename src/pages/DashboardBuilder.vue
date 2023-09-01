<script lang="ts">
    import {onMounted, computed, ref} from "vue"
    import Container from "../components/Layout/Container.vue";

    export default{
        name: "DashboardBuilder",
        components: {
            Container,
        },

        data() {
            return {
                charts: [] as string[],
                chartTypes: ["Bar", "Line", "Pie", "Doughnut"] as string[]
            };
        },
        methods: {
            addCharts(charType: string) {
                this.charts.push(charType)
            }
        },

        setup() {
            onMounted(() => {
            })


            return {
            }
        }
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


        <div class="flex flex-row">
            
            <div class="basis-1/2">
                <div class="bg-white shadow-sm rounded-lg p-4 flex flex-row">
                    <div @click="addCharts(chartTtpe)" v-for="(chartTtpe, index) in chartTypes" :key="index" class="basis-1/5">
                        {{chartTtpe}}
                    </div>
                </div>
            </div>
            <div class="basis-1/4"></div>
            <div class="basis-1/4"></div>
            <div class="basis-1/4"></div>
            
        </div>

        <div>
            <!-- <button @click="addCharts">Add Item</button> -->
            <div class="flex flex-wrap">
                <div v-for="(chart, index) in charts" :key="index" v-bind:class="`order-${index}`" class="basics-1/2 bg-white shadow-lg m-2 rounded-lg flex items-center justify-center">
                    {{ chart }}
                </div>
            </div>
            
        </div>
    </Container>
</template>