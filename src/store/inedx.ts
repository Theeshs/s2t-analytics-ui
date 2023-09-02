import { createStore } from 'vuex';
import dashboardModule from './dashboards';
import chartsModule from './charts'

const store = createStore({
  modules: {
    dashboardModule,
    chartsModule,
    // Add more modules if needed
  },
});

export default store;