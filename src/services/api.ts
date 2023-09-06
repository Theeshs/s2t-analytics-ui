import axios, { Axios } from "axios";

export class API {
  protected _url: string;
  protected _network: Axios;

  constructor(endpoint: string) {
    this._url = `http://localhost:8000/api/${endpoint}`;
    this._network = axios;
  }

  protected getData() {
    return this._network.get(this._url);
  }

  protected createData(paylaod: any) {
    return this._network.post(this._url, paylaod)
  }

  protected updateChartData(url: string, payload: string) {
    return this._network.put(url, payload)
  }

  protected deleteData(id: number) {
    
    return this._network.delete(`${this._url}/${id}`)
  }

  protected updateData(id: number, paylaod: any) {
    
    return this._network.put(`${this._url}/${id}`, paylaod)
  }

  protected deletebyUrl(url: string) {
    
    return this._network.delete(url)
  }
}
