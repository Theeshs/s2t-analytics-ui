// src/store/myModule.ts

import { Module } from 'vuex';
import {DashboardAPI} from "../services/dashboard"
import {DashboardType} from "../utils/type"

interface dashboardData {
    dashboards: any[]; // Replace 'any' with the actual data type you expect
    isLoading: boolean;
    error: string | null;
}

const dashboardModule: Module<dashboardData, any> = {
  state: {
    dashboards: [],
    isLoading: true,
    error: false
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
  },
  actions: {
    async fetchData({ commit }) {
        const dashboardAPI = new DashboardAPI()
        commit('setLoading', true);
        try {
          const response = await dashboardAPI.getDashboards(); // Assuming you have an apiService as explained in the previous response
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
  },
  getters: {
    getDashboards(state: dashboardData): DashboardType[] {
        return state.dashboards ?? [];
    },
  },
};

export default dashboardModule;