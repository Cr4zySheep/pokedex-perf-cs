import padStart from "lodash/padStart";
import { PokemonResponse } from "../api/pokemon";

export function getPokemonId(pokemon: PokemonResponse) {
  return `#${pokemon.id.toString().padStart(4, "0")}`;
}
