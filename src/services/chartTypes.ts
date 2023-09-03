import { API } from "./api";

export class chartsTypeAPI extends API {
  constructor() {
    super("chart_type");
  }

  getCharts() {
    return this.getData();
  }
}
