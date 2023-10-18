import BaseService from "./base.service.js";
import { config } from "../config.js";

const CHARACTERS_SERVICE_BASE = config.services.CHARACTERS_SERVICE;

export class CharactersService extends BaseService {
  constructor() {
    super(CHARACTERS_SERVICE_BASE, "Characters");
  }
}
