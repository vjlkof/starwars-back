import BaseService from "./base.service.js";
import { config } from "../config.js";

const STARSHIPS_SERVICE_BASE = config.services.STARSHIPS_SERVICE;

export class StarshipsService extends BaseService {
  constructor() {
    super(STARSHIPS_SERVICE_BASE, "Starships");
  }
}
