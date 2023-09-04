import { createStore } from 'vuex';
import dashboardModule from './dashboards';
import chartsModule from './charts'
import dataSourcesModule from './dataSources'

const store = createStore({
  modules: {
    dashboardModule,
    chartsModule,
    dataSourcesModule
    // Add more modules if needed
  },
});

export default store;