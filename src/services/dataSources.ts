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

  getDataSourceColumns(payload: any) {
    
    if (payload.chartType && payload.chartType != undefined && payload.chartType != null) {
      
      this._url = `${this._url}/${payload.sourceName}?chart_type=${payload.chartType}`
      
    } else {
      this._url = `${this._url}/${payload.sourceName}`
    }
    return this.getData()
  }
  
}
