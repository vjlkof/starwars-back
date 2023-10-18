import { Router } from "express";
import { StarshipsService } from "../services/starships.service.js";
import baseException from "../exceptions/base.exception.js";
import {
  starshipsSerializer,
  serializeOneStarship,
} from "../serializers/starships.serializer.js";

class StarshipsController {
  getAll = "/api/starships";
  getOne = "/api/starships/:id";
  router = Router();
  #starshipService;

  constructor() {
    this.#initializeServices();
    this.#initializeRoutes();
  }

  #initializeServices() {
    this.#starshipService = new StarshipsService();
  }

  #initializeRoutes() {
    this.router.get(`${this.getAll}`, this.#getAllStarships);
    this.router.get(`${this.getOne}`, this.#getOneStarship);
  }

  #getAllStarships = async (req, res, next) => {
    try {
      const urlData = {
        params: {
          page: req.query.page ? req.query.page.toString() : "",
        },
      };
      if (req.query.search) {
        urlData.params.search = req.query.search.toString();
      }

      const starships = await this.#starshipService.getAll(urlData);

      const serializedStarships = starshipsSerializer(starships);

      res.status(200).json(serializedStarships);
    } catch (error) {
      next(error);
    }
  };

  #getOneStarship = async (req, res, next) => {
    try {
      const urlData = {
        paths: [req.params.id],
      };
      const starship = await this.#starshipService.get(urlData);

      if (!starship.data) {
        throw new baseException(
          starship.error.status,
          "starship_service_error",
          starship.error.message
        );
      }

      const serializedStarship = serializeOneStarship(starship.data);

      res.status(200).json(serializedStarship);
    } catch (error) {
      next(error);
    }
  };
}

export default StarshipsController;
