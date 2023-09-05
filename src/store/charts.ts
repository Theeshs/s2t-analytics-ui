import { Module } from "vuex"
import { chartsAPI } from "../services/charts"
import {ChartCreatePayloadType, ChartObjectType} from "../utils/type"


interface chartData {
    charts: any[];
    isLoading: boolean;
    error: string | null;
}


const chartModule: Module<chartData, any> = {
    state: {
        charts: [],
        isLoading: true,
        error: false
    },
    mutations: {
        setChartData(state: any, payload: any) {
            state.charts = payload;
        },
        setLoading(state: any, isLoading: any) {
            state.isLoading = isLoading;
        },
        setError(state: any, error: any) {
            state.error = error;
        },
        updateChart(state:any, updatedChart: any) {
            const index = state.charts.findIndex((chart) => chart.id === updatedChart.id);
            debugger
            if (index !== -1) {
                debugger
                const updated = { ...state.charts[index], ...updatedChart };
                debugger
                state.charts[index] = updated;
            }
        },
    },
    actions: {
        async fetchChartsForDashboard({commit}, id: number) {
            const chartApi = new chartsAPI()
            commit('setLoading', true);
            try {
                const response = await chartApi.getCharts(id);
                commit('setChartData', response.data);
                commit('setError', null);
            } catch {
                commit('setChartData', []);
                commit('setError', 'Error fetching data. Please try again.');
            } finally {
                commit('setLoading', false);
            }
        },
        async addChartToDashboard({commit, rootGetters}, payload: ChartCreatePayloadType) {
            const chartApi = new chartsAPI()
            commit('setLoading', true);
            try {
                const response = await chartApi.createChart(payload.dashboard, payload);
                let allCharts = rootGetters.getCharts
                allCharts.push(response.data)
                commit("setChartData", allCharts)

            } catch(error) {
                commit('setError', 'Error creating chart. Please try again.');
            } finally {
                commit('setLoading', false);
            }
        },
        async editChartData({commit, rootGetters}, payload: any) {
            debugger
            const chartApi = new chartsAPI()
            commit('setLoading', true);
            try {
                const response = await chartApi.editChart(payload.url, payload.payload)
                console.log(response.data)
                debugger
                commit("updateChart", response.data)
                commit("setColumns", [])
            } catch(error) {
                commit('setError', 'Error creating chart. Please try again.');
            } finally {
                commit('setLoading', false);
            }
        }
    },
    getters: {
        getCharts(state: chartData): ChartObjectType[] {
            return state.charts ?? []
        },
    }
}

export default chartModule;