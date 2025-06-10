import type { FlavorTextEntry } from "../assets/interfaces/entry-flavor-text";
import type { PokemonListResponse } from "../assets/interfaces/pokemon-list-response";
import type { PokemonType } from "../assets/interfaces/pokemon-type";


export const getPokemonData = async (paramReturn:string) => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const { results } = await response.json() as PokemonListResponse;

  const pokemonData = await Promise.all(
    results.map(async ({ name, url }) => {
      // Obtener descripción
      const pokemonDataRequest = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
      const pokemonDataResponse = await pokemonDataRequest.json();
      const flavorTextEntries: FlavorTextEntry[] = pokemonDataResponse.flavor_text_entries;
      const entry = flavorTextEntries.find(entry => entry.language.name === "es");

      // Obtener tipos
      const requestTypes = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const typesPokemon = await requestTypes.json();
      const types: string[] = typesPokemon.types.map((type : PokemonType) => type.type.name);

      const pokemonId = url.split("/").at(-2)
      console.log( pokemonId )

      const paramReturnValidator = paramReturn === "name"
      const paramsReturn = paramReturnValidator ? { name : name} : {id: pokemonId}


      return {
        params: paramsReturn ,
        props: { 
          name, 
          url, 
          descripcion: entry ? entry.flavor_text.replace(/\n/g, " ") : "Descripción no disponible",
          types,
          id : pokemonId
        } 
      };
    })
  );

  return pokemonData;
};