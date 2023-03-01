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
      <div>
        <div className="pokemon_encounter-stats pokemon_encounter-stats-left">
          <h2>{pokemonDetails.name.toUpperCase()}</h2>
          <h3 className="pokemon-HP">{pokemonDetails.stats[0].base_stat}HP</h3>
          <h3 className="pokemon-attack">
            {pokemonDetails.stats[1].base_stat}Attack
          </h3>
          <h3 className="pokemon-defense">
            {pokemonDetails.stats[2].base_stat}Defense
          </h3>
        </div>
        <div
          className="pokemon_encounter-stats pokemon_encounter-stats-left"
          style={{
            backgroundImage: `url(${pokemonDetails.sprites.back_default})`,
            position: "absolute",
          }}
        ></div>
      </div>
    )
  );
}
