import { useState } from "react";

export default function UsersPokemons(props) {
  const [pokemonDetails, setPokemonDetails] = useState(null);

  fetch(`https://pokeapi.co/api/v2/pokemon/${props.name}`)
    .then((res) => res.json())
    .then((data) => {
      setPokemonDetails(data);
    })
    .catch((e) => {});
    
  return (
    pokemonDetails && (
      <>
        <div
          id={props.id}
          className={`pokemon_encounter-stats pokemon_encounter-stats-${props.position}`}
        >
          <h2>{pokemonDetails.name.toUpperCase()}</h2>
          <progress
            max={pokemonDetails.stats[0].base_stat}
            value={
              props.UsersPokemons
                ? props.UsersPokemons[pokemonDetails.name] !== null
                  ? props.UsersPokemons[pokemonDetails.name]
                  : pokemonDetails.stats[0].base_stat
                : pokemonDetails.stats[0].base_stat
            }
          />
          <div className="pokemon-hp">
            <strong>
              {props.UsersPokemons
                ? props.UsersPokemons[pokemonDetails.name] !== null
                  ? props.UsersPokemons[pokemonDetails.name]
                  : pokemonDetails.stats[0].base_stat
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
          className={`pokemon_encounter-stats pokemon_encounter-stats-${props.position}`}
          style={{
            backgroundImage: `url(${
              pokemonDetails.sprites[`${props.side}_default`]
                ? pokemonDetails.sprites[`${props.side}_default`]
                : pokemonDetails.sprites.front_default
            })`,
            position: "absolute",
          }}
        ></div>
      </>
    )
  );
}
