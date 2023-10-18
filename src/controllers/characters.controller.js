import { Router } from "express";
import { CharactersService } from "../services/characters.service.js";
import { PlanetsService } from "../services/planets.service.js";
import baseException from "../exceptions/base.exception.js";
import {
  charactersSerializer,
  serializeOneCharacter,
} from "../serializers/characters.serializer.js";

class CharactersController {
  getAllPerPage = "/api/characters";
  getOne = "/api/characters/:id";
  router = Router();
  #characterService;
  #planetService;

  constructor() {
    this.#initializeServices();
    this.#initializeRoutes();
  }

  #initializeServices() {
    this.#characterService = new CharactersService();
    this.#planetService = new PlanetsService();
  }

  #initializeRoutes() {
    this.router.get(`${this.getAllPerPage}`, this.#getAllCharacterPerPage);
    this.router.get(`${this.getOne}`, this.#getOneCharacter);
  }

  #getAllCharacterPerPage = async (req, res, next) => {
    try {
      const urlData = {
        params: {
          page: req.query.page ? req.query.page.toString() : "",
        },
      };
      if (req.query.search) {
        urlData.params.search = req.query.search.toString();
      }

      const characters = await this.#characterService.getAll(urlData);

      const serializedCharacters = charactersSerializer(characters);

      res.status(200).json(serializedCharacters);
    } catch (error) {
      next(error);
    }
  };

  #getOneCharacter = async (req, res, next) => {
    try {
      const urlData = {
        paths: [req.params.id],
      };
      const character = await this.#characterService.get(urlData);

      if (!character.data) {
        throw new baseException(
          character.error.status,
          "character_service_error",
          character.error.message
        );
      }

      const planetId =
        character.data.homeworld.split("/")[
          character.data.homeworld.split("/").length - 2
        ];
      const homeWorld = await this.#getCharacterHomeworld(planetId);

      const serializedCharacter = serializeOneCharacter(character.data);
      serializedCharacter.homeworld = homeWorld.planet.name;

      res.status(homeWorld.status).json(serializedCharacter);
    } catch (error) {
      next(error);
    }
  };

  async #getCharacterHomeworld(planetId) {
    let status = 200;
    const planetUrlData = {
      paths: [planetId],
    };

    const planetHome = await this.#planetService.get(planetUrlData);

    if (!planetHome.data) {
      status = 206;
    }

    return {
      planet: planetHome.data,
      status,
    };
  }
}

export default CharactersController;
