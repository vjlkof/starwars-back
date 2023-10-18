export const serializeOneStarship = (starship) => ({
  id: starship.url.split("/")[starship.url.split("/").length - 2],
  name: starship.name,
  model: starship.model,
  manufacturer: starship.manufacturer,
  cost: starship.cost_in_credits,
  speed: starship.max_atmosphering_speed,
  crew: starship.crew,
  passengers: starship.passengers,
  cargo_capacity: starship.cargo_capacity,
  consumables: starship.consumables,
  class: starship.starship_class,
});

export const starshipsSerializer = (starships) => {
  starships.next = starships.next && starships.next.split("?")[1];
  starships.previous = starships.previous && starships.previous.split("?")[1];
  const results = starships.results.map((starship) =>
    serializeOneStarship(starship)
  );
  starships.results = results;

  return starships;
};
