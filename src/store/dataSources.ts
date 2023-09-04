import { Module } from "vuex"
import {dataSourcesAPI} from "../services/dataSources"


interface dataSources {
    chartTypeID: number
    chartType: string
    dataSources: any[];
    isLoading: boolean;
    error: string | null;
}

const dataSourcesModule: Module<dataSources, any> = {
    state: {
        chartTypeIDNew: 0,
        chartType: "",
        dataSources: [],
        isLoading: true,
        error: false
    },
    mutations: {
        setChartTypeIDNew(state: any, id: number) {
            state.chartTypeIDNew = id
        },
        setChartType(state: any, chartType: string) {
            state.chartType = chartType
        },
        setDataSources(state: any, payload: any[]) {
            state.dataSources = payload
        },
        setLoading(state: any, isLoading: any) {
            state.isLoading = isLoading;
        },
        setError(state: any, error: any) {
            state.error = error;
        },
    },
    actions: {
        async fetchDataSources({commit}, id: number) {
            debugger
            const dtsAPI = new dataSourcesAPI()
            commit('setLoading', true);
            try {
                const response = await dtsAPI.getDataSources(id)
                commit("setChartTypeIDNew", response.data.chart_type_id)
                commit("setChartType", response.data.chart_type)
                commit("setDataSources", response.data.columns)
            } catch(e) {
                commit('setError', 'Error fetching data sources. Please try again.')
            } finally {
                commit('setLoading', false);
            }
        }
    },
    getters: {
        getChartType(state: dataSources): string {
            return state.chartType ?? null
        },
        getDataSoureces(state: dataSources): any[] {
            return state.dataSources ?? []
        }
    }
}

export default dataSourcesModule