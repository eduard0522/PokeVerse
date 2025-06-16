import type { FlavorTextEntry } from "../interfaces/entry-flavor-text";
import type { PokemonListResponse } from "../interfaces/pokemon-list-response";
import type { PokemonType } from "../interfaces/pokemon-type";


export const getPokemonData = async (paramReturn:string) => {
  try{
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const { results } = await response.json() as PokemonListResponse;

     const pokemonData = await Promise.all(
     results.map(async ({ name, url }) => {
      // Obtener descripción
      const pokemonDataRequest = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
      const pokemonDataResponse = await pokemonDataRequest.json();
      const flavorTextEntries: FlavorTextEntry[] = pokemonDataResponse.flavor_text_entries;
      const entry = flavorTextEntries.find(entry => entry.language.name === "es");

      // Obtener tipos, peso y altura
      const requestPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const dataPokemon = await requestPokemon.json();
      const types: string[] = dataPokemon.types.map((type : PokemonType) => type.type.name);
      
      const pokemonHeight = dataPokemon.height
      const pokemonWeight = dataPokemon.weight
      const pokemonId = url.split("/").at(-2)

      const paramReturnValidator = paramReturn === "name"
      const paramsReturn = paramReturnValidator ? { name : name} : {id: pokemonId}


      return {
        params: paramsReturn ,
        props: { 
          name, 
          url, 
          descripcion: entry ? entry.flavor_text.replace(/\n/g, " ") : "Descripción no disponible",
          types,
          id : pokemonId,
          height : pokemonHeight,
          weight : pokemonWeight
        } 
      };
    })
  );

  return pokemonData;
  }catch(e){
   return [{
        params: {name : "pikachu"} ,
        props: { 
          name : "", 
          url : "", 
          descripcion: "Descripción no disponible",
          types:[],
          id : 1
        } 
      }];
  }
 
};