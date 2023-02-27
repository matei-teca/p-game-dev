import { useEffect, useState } from "react";

export default function Pokemon(props) {
  const [pokemon, setPokemon] = useState(null);
  useEffect(() => {
    fetch(props.pokemon.url)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, []);

  return props.pokemon === "No pokemons found" ? (
    <div>
      <h1>This location doesn't seem to have any pokémon</h1>
      <button onClick={props.onClick}>Back</button>
    </div>
  ) : (
    pokemon && (
      <div>
        <h1>{console.log(pokemon.stats)}</h1>
        <div
          className="pokemon_encounter-stats"
          style={{ backgroundImage: `url(${pokemon.sprites.front_default})` }}
        >
          <h2>{pokemon.name.toUpperCase()}</h2>
          <h3>{pokemon.stats[0].base_stat}HP</h3>
          <h3>{pokemon.stats[1].base_stat}Attack</h3>
          <h3>{pokemon.stats[2].base_stat}Defense</h3>

        </div>
        {/* <img className="pokemon-sprite" src={pokemon.sprites.front_default} /> */}
        <button onClick={props.onClick}>Back</button>
      </div>
    )
  );
}
