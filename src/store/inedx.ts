import { createStore } from 'vuex';
import dashboardModule from './dashboards';

const store = createStore({
  modules: {
    dashboardModule,
    // Add more modules if needed
  },
});

export default store;