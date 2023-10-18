export const config = {
  HOST: process.env.HOST || "http://localhost",
  PORT: process.env.PORT || "8080",
  services: {
    CHARACTERS_SERVICE:
      process.env.CHARACTERS_SERVICE || `https://swapi.dev/api/people`,
    MOVIES_SERVICE: process.env.MOVIES_SERVICE || `https://swapi.dev/api/films`,
    STARSHIPS_SERVICE:
      process.env.STARSHIPS_SERVICE || `https://swapi.dev/api/starships`,
    PLANETS_SERVICE:
      process.env.PLANETS_SERVICE || `https://swapi.dev/api/planets`,
  },
};
