// src/store/myModule.ts

import { Module } from 'vuex';
import {DashboardAPI} from "../services/dashboard"
import {DashboardType, DashboardCreatePayload} from "../utils/type"
import router from "../router"

interface dashboardData {
    dashboards: any[]; // Replace 'any' with the actual data type you expect
    isLoading: boolean;
    error: string | null;
    currentDashboardID: number
}

const dashboardModule: Module<dashboardData, any> = {
  state: {
    dashboards: [],
    isLoading: true,
    error: false,
    currentDashboardID: null
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
      debugger
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
      debugger
      const dashboardAPI = new DashboardAPI()
      commit("setLoading", true);
      try {
        const response = await dashboardAPI.crateDashboard(payload);
        debugger
        let allDashboards = rootGetters.getDashboards
        debugger
        allDashboards.push(response.data)
        commit('setData', allDashboards);
        console.log(allDashboards)
        commit("setCurrentDashboardID", response.data.id)
        commit('setError', null);
        router.push(`/dashboard/${response.data.id}`)
      } catch (error) {
        commit('setCurrentDashboardID', null);
        commit('setError', 'Error fetching data. Please try again.');
        console.error('API request failed:', error);
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
      debugger
      return state.currentDashboardID ?? null
    }
  },
};

export default dashboardModule;