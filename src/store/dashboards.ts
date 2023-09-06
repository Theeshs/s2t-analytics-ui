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
      state.currentDashboardID = payload.id
    },
    setChartTypes(state: any, payload: any[]) {
      state.chartTypes = payload
    },
    removeDashboardAndReUpdate(state: any, id: number) {
      const index = state.dashboards.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.dashboards.splice(index, 1);
      }
    },
    updateDashboards(state:any, updatedDb: any) {
      const index = state.dashboards.findIndex((db) => db.id === updatedDb.id);
      
      if (index !== -1) {
          
          const updated = { ...state.dashboards[index], ...updatedDb };
          
          state.dashboards[index] = updated;
      }
    },
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
      const chartAPI = new chartsTypeAPI()
      try {
        const response = await chartAPI.getCharts();
        
        commit("setChartTypes", response.data)
      } catch(error) {
        commit('setChartTypes', []);
        commit('setError', 'Error fetching data. Please try again.');
        console.error('API request failed:', error);
      }
    },
    async deleteDashboard({commit}, id: number) {
      const dashboardAPI = new DashboardAPI()
      commit("setLoading", true);
      try {
        
        const response = await dashboardAPI.deleteDashboard(id)
        commit("removeDashboardAndReUpdate", id)
      } catch(err) {
        commit('setError', 'Error deleting dashboard. Please try again.');
      } finally {
        commit('setLoading', false);
      }
    },
    async updateDashboard({commit}, payload: any) {
      
      const dashboardAPI = new DashboardAPI()
      commit("setLoading", true);
      try {
        const response = await dashboardAPI.updateDashboard(payload.id, payload.payload)
        commit("updateDashboards", response.data)
      } catch(err) {
        commit('setError', 'Error updating dashboard. Please try again.');
      } finally {
        commit('setLoading', false);
      }
    }
  },
  getters: {
    getDashboards(state: dashboardData): DashboardType[] {
        return state.dashboards ?? [];
    },
    getCurrentDashboardID(state: dashboardData): number {
      
      return state.currentDashboardID ?? null
    },
    getChartTypes(state: dashboardData): any[] {
      return state.chartTypes ?? []
    }
  },
};

export default dashboardModule;