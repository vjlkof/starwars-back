export const serializeOneCharacter = (character) => ({
  id: character.url.split("/")[character.url.split("/").length - 2],
  name: character.name,
  gender: character.gender,
  height: character.height,
  weigth: character.mass,
  hair_color: character.hair_color,
  eye_color: character.eye_color,
  birth_year: character.birth_year,
});

export const charactersSerializer = (characters) => {
  characters.next = characters.next && characters.next.split("?")[1];
  characters.previous =
    characters.previous && characters.previous.split("?")[1];
  const results = characters.results.map((character) =>
    serializeOneCharacter(character)
  );
  characters.results = results;

  return characters;
};
