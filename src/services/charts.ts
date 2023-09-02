import { API } from "./api";
import {ChartCreatePayloadType} from "../utils/type"

export class chartsAPI extends API {
  constructor() {
    super("dashboard");
  }

  getCharts(id: number) {
    this._url = `${this._url}/${id}/charts`
    return this.getData();
  }
  
  createChart(id: number, payload: ChartCreatePayloadType) {
    debugger
    this._url = `${this._url}/${id}/charts`
    return this.createData(payload)
  }
}
