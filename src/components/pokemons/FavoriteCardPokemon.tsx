import { Show , createSignal, type Signal} from "solid-js"

import type { FavoritePokemon } from "src/interfaces/FavoritePokemon"

interface Props{
  pokemon : FavoritePokemon
  setPokemons : any
}

const deleteFavorite = (pokemonId : string) => {
  const storedFavorites = localStorage.getItem("favorites")
  let listFavorites : FavoritePokemon[] = storedFavorites ? JSON.parse(storedFavorites).favorites : []
  if(!listFavorites)return

  listFavorites = listFavorites.filter((fav : FavoritePokemon) => fav.pokemonId !== pokemonId)
  localStorage.setItem('favorites', JSON.stringify({ favorites: listFavorites }))
  
  return listFavorites
}

export const FavoriteCardPokemon = (props:Props) => {
  const [isFavorite , setIsFavorite ] = createSignal(true)

  return(
    <Show when={isFavorite()}>
      <div class="flex flex-col justify-center items-center p-2 ">
        <a href={`/pokemons/${props.pokemon.pokemonName}`}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.pokemon.pokemonId}.png`} alt={`Pokémon ${props.pokemon.pokemonName}`}  class="h-48 hover:scale-110 transition-all"/>

            <h2 class="text-2xl  text-center font-bold  capitalize bg-gradient-to-br from-slate-100 to-sky-400 bg-clip-text text-transparent">
              { props.pokemon.pokemonName} 
            </h2>
        </a>
        <button type="button" class="text-xl bg-sky-600 text-zinc-100 px-4 py rounded-md mt-2 cursor-pointer hover:bg-sky-800" onClick={() => {
         setIsFavorite(false) ; props.setPokemons(deleteFavorite(props.pokemon.pokemonId))}}> Borrar </button>
      </div>
    </Show>
  )
}