import { API } from "./api";

export class DashboardAPI extends API {
  constructor() {
    super("dashboard");
  }

  getDashboards() {
    return this.getData();
  }
}
