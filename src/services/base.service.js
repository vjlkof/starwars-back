import axios from "axios";
import { UrlBuilder } from "../utils/urlBuilder.js";

class BaseService {
  urlBuilder;
  #serviceName;

  constructor(baseUrl, serviceName) {
    this.urlBuilder = new UrlBuilder(baseUrl);
    this.#serviceName = serviceName;
  }

  getAll = async (urlData) =>
    (await axios.get(this.urlBuilder.build(urlData))).data;

  get = async (urlData) => {
    const serviceRes = { data: null, error: null };
    try {
      serviceRes.data = (await axios.get(this.urlBuilder.build(urlData))).data;
    } catch (err) {
      serviceRes.error = this.handleError(err);
    }
    return serviceRes;
  };

  handleError = (err) => {
    console.log(`${this.#serviceName}: ${err}`);
    return {
      status: err.response ? Number(err.response.status) : 500,
      message: err.response ? err.response.statusText : err.code,
    };
  };
}

export default BaseService;
