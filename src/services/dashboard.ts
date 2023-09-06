import { API } from "./api";
import {DashboardCreatePayload} from "../utils/type"

export class DashboardAPI extends API {
  constructor() {
    super("dashboard");
  }

  getDashboards() {
    return this.getData();
  }
  
  crateDashboard(payload: DashboardCreatePayload) {
    return this.createData(payload)
  }

  deleteDashboard(id: number): any {
    return this.deleteData(id)
  }

  updateDashboard(id: number, paylaod: any) {
    return this.updateData(id, paylaod)
  }
}
