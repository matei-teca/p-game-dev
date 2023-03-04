import { useState } from "react";
import state from "./test";
import { useAtom } from "jotai";

export default function PokemonEncounter({ id, name, position, side }) {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [userPokemons] = useAtom(state.userPokemons);
  const [ifEnemyLost] = useAtom(state.ifEnemyLost);

  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((res) => res.json())
    .then((data) => {
      setPokemonDetails(data);
    })
    .catch((e) => {});

  return (
    pokemonDetails &&
    (ifEnemyLost ? (
      <h1 className="enemy-defeated">Enemy defeated, you can catch it now!</h1>
    ) : (
      <>
        <div
          id={id}
          className={`pokemon_encounter-stats pokemon_encounter-stats-${position}`}
        >
          <h2 className="pokemon-encountered-name">
            {pokemonDetails.name.toUpperCase()}
          </h2>
          <progress
            max={pokemonDetails.stats[0].base_stat}
            value={
              userPokemons[pokemonDetails.name]
                ? userPokemons[pokemonDetails.name]
                : pokemonDetails.stats[0].base_stat
            }
          />
          <div className="pokemon-hp">
            <strong>
              {userPokemons[pokemonDetails.name]
                ? userPokemons[pokemonDetails.name]
                : pokemonDetails.stats[0].base_stat}
            </strong>
          </div>
          <h3 className="pokemon-attack">
            {pokemonDetails.stats[1].base_stat}Attack
          </h3>
          <h3 className="pokemon-defense">
            {pokemonDetails.stats[2].base_stat}Defense
          </h3>
        </div>
        <div
          className={`pokemon_encounter-stats pokemon_encounter-stats-${position}`}
          style={{
            backgroundImage: `url(${
              pokemonDetails.sprites[`${side}_default`]
                ? pokemonDetails.sprites[`${side}_default`]
                : pokemonDetails.sprites.front_default
            })`,
            position: "absolute",
          }}
        ></div>
      </>
    ))
  );
}
