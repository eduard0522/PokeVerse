import { createSignal, For } from "solid-js"
import type { FavoritePokemon } from "src/interfaces/FavoritePokemon"
import { FavoriteCardPokemon } from "./FavoriteCardPokemon"

const getStoredPokemons = () : FavoritePokemon[] => {
  const storedFavorites = localStorage.getItem("favorites")
  const pokemonsList : FavoritePokemon[] = storedFavorites ? JSON.parse(storedFavorites).favorites : []
  return pokemonsList
}


export const FavoritePokemons = () => {
  const [pokemons, setPokemons] = createSignal(getStoredPokemons());
  return (
    <div>
      {pokemons().length === 0 && (
        <h2 class="text-4xl text-zinc-100 py-24 text-center">
          Aún no tienes pokémones favoritos. 🥲
        </h2>
      )}
      
      <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-2">
        <For each={pokemons()}>
          {(pokemon: FavoritePokemon) => <FavoriteCardPokemon pokemon={pokemon} setPokemons={setPokemons} />}
        </For>
      </div>
    </div>
  );
};