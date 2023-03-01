import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import UsersPokemons from "./UsersPokemons";

export default function Pokemon(props) {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonSelected, setPokemonSelected] = useState(null);

  useEffect(() => {
    fetch(props.pokemon.url)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, []);

  const handleUsersPokemonClick = (e) => {
    setPokemonSelected(e.target.id);
    document.querySelectorAll(".users-pokemons-card").forEach((element) => {
      element.classList.remove("cardSelected");
    });
    e.target.parentElement.classList.add("cardSelected");
  };

  return props.pokemon === "No pokemons found" ? (
    <div>
      <h1>This location doesn't seem to have any pokémon</h1>
      <button onClick={props.onClick}>Back</button>
    </div>
  ) : (
    pokemon && (
      <div>
        <div className="pokemon_encounter-stats pokemon_encounter-stats-right">
          <h2>{pokemon.name.toUpperCase()}</h2>
          <h3 className="pokemon-HP">{pokemon.stats[0].base_stat}HP</h3>
          <h3 className="pokemon-attack">{pokemon.stats[1].base_stat}Attack</h3>
          <h3 className="pokemon-defense">
            {pokemon.stats[2].base_stat}Defense
          </h3>
          </div>
          <div
            className="pokemon_encounter-stats pokemon_encounter-stats-right"
            style={{ backgroundImage: `url(${pokemon.sprites.front_default})`,
            position:"absolute"
          }}
          ></div>
        
        <div>
          {pokemonSelected ? (
            <UsersPokemons name={pokemonSelected} />
          ) : (
            <h1 className="select-a-pokemon-text">
              Select a pokemon to fight!
            </h1>
          )}
        </div>
        {/* <button onClick={props.onClick}>Back</button> */}
        <div className="users-pokemons">
          {props.usersPokemons.map((pokemonName, index) => (
            <PokemonCard
              key={index}
              name={pokemonName}
              className="users-pokemons-card"
              onClick={handleUsersPokemonClick}
            />
          ))}
        </div>
      </div>
    )
  );
}
