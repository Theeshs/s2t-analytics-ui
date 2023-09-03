// src/store/myModule.ts

import { Module } from 'vuex';
import {DashboardAPI} from "../services/dashboard"
import {chartsTypeAPI} from "../services/chartTypes"
import {DashboardType, DashboardCreatePayload} from "../utils/type"
import router from "../router"

interface dashboardData {
    dashboards: any[]; // Replace 'any' with the actual data type you expect
    isLoading: boolean;
    error: string | null;
    currentDashboardID: number,
    chartTypes: any[]
}

const dashboardModule: Module<dashboardData, any> = {
  state: {
    dashboards: [],
    isLoading: true,
    error: false,
    currentDashboardID: null,
    chartTypes: []
  },
  mutations: {
    setData(state: any, payload: any) {
        state.dashboards = payload;
      },
    setLoading(state: any, isLoading: any) {
      state.isLoading = isLoading;
    },
    setError(state: any, error: any) {
      state.error = error;
    },
    setCurrentDashboardID(state: any, payload: DashboardType) {
      debugger
      state.currentDashboardID = payload.id
    },
    setChartTypes(state: any, payload: any[]) {
      state.chartTypes = payload
    }
  },
  actions: {
    async fetchData({ commit }) {
        const dashboardAPI = new DashboardAPI()
        commit('setLoading', true);
        try {
          const response = await dashboardAPI.getDashboards();
          commit('setData', response.data);
          commit('setError', null);
        } catch (error) {
          commit('setData', []);
          commit('setError', 'Error fetching data. Please try again.');
          console.error('API request failed:', error);
        } finally {
          commit('setLoading', false);
        }
      },

    async createDashbooard({commit, rootGetters }, payload: DashboardCreatePayload) {
      const dashboardAPI = new DashboardAPI()
      commit("setLoading", true);
      try {
        const response = await dashboardAPI.crateDashboard(payload);
        let allDashboards = rootGetters.getDashboards
        allDashboards.push(response.data)
        commit('setData', allDashboards);
        console.log(allDashboards)
        debugger
        commit("setCurrentDashboardID", {"id": response.data.id})
        commit('setError', null);
        router.push(`/dashboard/${response.data.id}`)
      } catch (error) {
        commit('setCurrentDashboardID', null);
        commit('setError', 'Error fetching data. Please try again.');
        console.error('API request failed:', error);
      } finally {
        commit('setLoading', false);
      }
    },
    async fetchChartTypes({commit}) {
      debugger
      const chartAPI = new chartsTypeAPI()
      try {
        const response = await chartAPI.getCharts();
        debugger
        commit("setChartTypes", response.data)
      } catch(error) {
        commit('setChartTypes', []);
        commit('setError', 'Error fetching data. Please try again.');
        console.error('API request failed:', error);
      }
    }
  },
  getters: {
    getDashboards(state: dashboardData): DashboardType[] {
        return state.dashboards ?? [];
    },
    getCurrentDashboardID(state: dashboardData): number {
      debugger
      return state.currentDashboardID ?? null
    },
    getChartTypes(state: dashboardData): any[] {
      return state.chartTypes ?? []
    }
  },
};

export default dashboardModule;