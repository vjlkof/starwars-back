import BaseService from "./base.service.js";
import { config } from "../config.js";

const MOVIES_SERVICE_BASE = config.services.MOVIES_SERVICE;

export class MoviesService extends BaseService {
  constructor() {
    super(MOVIES_SERVICE_BASE, "Movies");
  }
}
