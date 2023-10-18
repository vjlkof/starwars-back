import "dotenv/config";
import bodyParser from "body-parser";
import express from "express";
import errorMiddleware from "./middlewares/error.middleware.js";
import { config } from "./config.js";
import CharactersController from "./controllers/characters.controller.js";
import MoviesController from "./controllers/movies.controller.js";
import StarshipsController from "./controllers/starships.controller.js";
import PlanetsController from "./controllers/planets.controller.js";
import cors from "cors";

const app = express();
app.use(cors());

initialize([
  new CharactersController(),
  new MoviesController(),
  new StarshipsController(),
  new PlanetsController(),
]);

function initialize(controllers) {
  initializeMiddlewares();
  initializeControllers(controllers);
  initializeErrorHandling();
}

function initializeMiddlewares() {
  app.use(bodyParser.json());
}

function initializeControllers(controllers) {
  controllers.forEach((controller) => {
    app.use("/", controller.router);
  });
}

function initializeErrorHandling() {
  app.use(errorMiddleware);
}

app.listen(process.env.PORT, () => {
  console.log(
    `\n====================================\n` +
      `🚀 App listening on the port ${config.PORT} 🚀\n` +
      `====================================`
  );
});
