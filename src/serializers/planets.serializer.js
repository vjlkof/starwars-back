export const serializeOnePlanet = (planet) => ({
  id: planet.url.split("/")[planet.url.split("/").length - 2],
  name: planet.name,
  rotation_period: planet.rotation_period,
  orbital_period: planet.orbital_period,
  diameter: planet.diameter,
  climate: planet.climate,
  crew: planet.crew,
  gravity: planet.gravity,
  terrain: planet.terrain,
  surface_water: planet.surface_water,
  population: planet.population,
});

export const planetsSerializer = (planets) => {
  planets.next = planets.next && planets.next.split("?")[1];
  planets.previous = planets.previous && planets.previous.split("?")[1];
  const results = planets.results.map((planet) => serializeOnePlanet(planet));
  planets.results = results;

  return planets;
};
