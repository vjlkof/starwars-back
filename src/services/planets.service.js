import BaseService from "./base.service.js";
import { config } from "../config.js";

const PLANETS_SERVICE_BASE = config.services.PLANETS_SERVICE;

export class PlanetsService extends BaseService {
  constructor() {
    super(PLANETS_SERVICE_BASE, "Planets");
  }
}
