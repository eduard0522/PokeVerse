import type { FlavorTextEntry } from "../assets/interfaces/entry-flavor-text";
import type { PokemonListResponse } from "../assets/interfaces/pokemon-list-response";
import type { PokemonType } from "../assets/interfaces/pokemon-type";

export const getPokemonPages = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const { results } = await response.json() as PokemonListResponse;

  const pokemonData = await Promise.all(
    results.map(async ({ name, url }) => {
      // Obtener descripción
      const requestDescriptionPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
      const descripcionPokemon = await requestDescriptionPokemon.json();
      const flavorTextEntries: FlavorTextEntry[] = descripcionPokemon.flavor_text_entries;
      const entry = flavorTextEntries.find(entry => entry.language.name === "es");

      // Obtener tipos
      const requestTypes = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const typesPokemon = await requestTypes.json();
      const types: string[] = typesPokemon.types.map((type : PokemonType) => type.type.name);

      return {
          name, 
          url, 
          descripcion: entry ? entry.flavor_text.replace(/\n/g, " ") : "Descripción no disponible",
          types
      };
    })
  );

  return pokemonData;
};