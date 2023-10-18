import { Router } from "express";
import { PlanetsService } from "../services/planets.service.js";
import baseException from "../exceptions/base.exception.js";
import {
  planetsSerializer,
  serializeOnePlanet,
} from "../serializers/planets.serializer.js";

class PlanetsController {
  getAll = "/api/planets";
  getOne = "/api/planets/:id";
  router = Router();
  #planetService;

  constructor() {
    this.#initializeServices();
    this.#initializeRoutes();
  }

  #initializeServices() {
    this.#planetService = new PlanetsService();
  }

  #initializeRoutes() {
    this.router.get(`${this.getAll}`, this.#getAllPlanets);
    this.router.get(`${this.getOne}`, this.#getOnePlanet);
  }

  #getAllPlanets = async (req, res, next) => {
    try {
      const urlData = {
        params: {
          page: req.query.page ? req.query.page.toString() : "",
        },
      };
      if (req.query.search) {
        urlData.params.search = req.query.search.toString();
      }

      const planets = await this.#planetService.getAll(urlData);

      const serializedPlanets = planetsSerializer(planets);

      res.status(200).json(serializedPlanets);
    } catch (error) {
      next(error);
    }
  };

  #getOnePlanet = async (req, res, next) => {
    try {
      const urlData = {
        paths: [req.params.id],
      };
      const planet = await this.#planetService.get(urlData);

      if (!planet.data) {
        throw new baseException(
          planet.error.status,
          "planet_service_error",
          planet.error.message
        );
      }

      const serializedPlanet = serializeOnePlanet(planet.data);

      res.status(200).json(serializedPlanet);
    } catch (error) {
      next(error);
    }
  };
}

export default PlanetsController;
