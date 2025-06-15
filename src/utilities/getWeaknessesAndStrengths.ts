import type { WeaknessesStrengths } from "src/interfaces/weaknesses-strengths";

const pokemonTypes: string[] = [
  "normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost",
  "steel", "fire", "water", "grass", "electric", "psychic", "ice", "dragon",
  "dark", "fairy", "stellar"
];

const getWeaknessesAndStrengths = async (): Promise<
  { type: string; weaknesses: string[]; strengths: string[] }[]
> => {
  try {
    const promises = pokemonTypes.map(async (type) => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const data: WeaknessesStrengths = await response.json();
        
        return {
          type,
          weaknesses: data.damage_relations.double_damage_from.map(t => t.name),
          strengths: data.damage_relations.double_damage_to.map(t => t.name)
        };
      } catch (error) {
        console.error(`Error al obtener datos para ${type}:`, error);
        return null;
      }
    });

    const weaknessesStrengthsData = (await Promise.all(promises))
    .filter((data): data is { type: string; weaknesses: string[]; strengths: string[] } => data !== null);
    return weaknessesStrengthsData;
  } catch (error) {
    console.error("Error al obtener todos los datos:", error);
    return [];
  }
};

export const filterByType = async (types: string[]): Promise<
  { type: string; weaknesses: string[]; strengths: string[] }[]
> => {
  const data = await getWeaknessesAndStrengths();

  return (data ?? []).filter(d => types.includes(d.type));
};