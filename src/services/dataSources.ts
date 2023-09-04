import { API } from "./api";
// import {DashboardCreatePayload} from "../utils/type"

export class dataSourcesAPI extends API {
  constructor() {
    super("chart");
  }

  getDataSources(id: int) {
    this._url = `${this._url}/${id}/datasources`
    return this.getData();
  }
  
}
