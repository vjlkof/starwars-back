import { Router } from "express";
import { MoviesService } from "../services/movies.service.js";
import baseException from "../exceptions/base.exception.js";
import {
  moviesSerializer,
  serializeOneMovie,
} from "../serializers/movies.serializer.js";

class MoviesController {
  getAll = "/api/movies";
  getOne = "/api/movies/:id";
  router = Router();
  #movieService;

  constructor() {
    this.#initializeServices();
    this.#initializeRoutes();
  }

  #initializeServices() {
    this.#movieService = new MoviesService();
  }

  #initializeRoutes() {
    this.router.get(`${this.getAll}`, this.#getAllMovies);
    this.router.get(`${this.getOne}`, this.#getOneMovie);
  }

  #getAllMovies = async (req, res, next) => {
    try {
      const urlData = {
        params: {
          page: req.query.page ? req.query.page.toString() : "",
        },
      };
      if (req.query.search) {
        urlData.params.search = req.query.search.toString();
      }

      const movies = await this.#movieService.getAll(urlData);

      const serializedMovies = moviesSerializer(movies);

      res.status(200).json(serializedMovies);
    } catch (error) {
      next(error);
    }
  };

  #getOneMovie = async (req, res, next) => {
    try {
      const urlData = {
        paths: [req.params.id],
      };
      const movie = await this.#movieService.get(urlData);

      if (!movie.data) {
        throw new baseException(
          movie.error.status,
          "movie_service_error",
          movie.error.message
        );
      }

      const openingCrawl = movie.data.opening_crawl;
      const serializedMovie = serializeOneMovie(movie.data);
      serializedMovie.openingCrawl = openingCrawl;

      res.status(200).json(serializedMovie);
    } catch (error) {
      next(error);
    }
  };
}

export default MoviesController;
