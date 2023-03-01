import { useState } from "react";
import PokemonCard from "./PokemonCard";
import UsersPokemons from "./UsersPokemons";
import ColectionCarousel from "./ColectionCarousel";

export default function Pokemon(props) {
  const [usersPokemons, setUsersPokemons] = useState(props.usersPokemons);
  const [turn, setTurn] = useState("player");
  const [pokemonSelected, setPokemonSelected] = useState(null);

  let colectionSlides = [];
  for (let i = 0; i < usersPokemons.length; i += 3) {
    colectionSlides.push(usersPokemons.slice(i, i + 3));
  }

  const handleUsersPokemonClick = (e) => {
    setPokemonSelected(e.target.id);
    document.querySelectorAll(".users-pokemons-card").forEach((element) => {
      element.classList.remove("cardSelected");
    });
    e.target.parentElement.classList.add("cardSelected");
  };

  const handleAttackClick = (e) => {
    switch (e.target.innerText) {
      case "Start Battle":
        console.log(turn);
        handleTurn(turn, e);
        setTurn("enemy");
        e.target.innerText = "Next turn";
        break;
      case "Next turn":
        console.log(turn);
        handleTurn(turn, e);
        break;
      case "Catch":
        props.addToColection(props.pokemon.name);
        if (!usersPokemons.includes(props.pokemon.name))
          setUsersPokemons([...usersPokemons, props.pokemon.name]);
        break;
    }
  };

  const handleTurn = (turn, e) => {
    let attack, defense, hp, damage;
    let critChance = Math.floor(Math.random() * (255 - 217)) + 217;
    attack =
      document.querySelector(`#${turn}>.pokemon-attack`).firstChild
        .textContent * 1;
    switch (turn) {
      case "enemy":
        defense =
          document.querySelector(`#player>.pokemon-defense`).firstChild
            .textContent * 1;
        hp = document.querySelector(`#player>progress`).value * 1;
        damage =
          ((((2 / 5 + 2) * attack * 60) / defense / 50 + 2) * critChance) / 255;
        document.querySelector(`#player>progress`).value = hp - damage;
        document.querySelector(`#player>.pokemon-hp`).firstChild.innerText =
          Math.floor(hp - damage) > 0 ? Math.floor(hp - damage) : 0;

        console.log(attack, defense, hp, critChance);
        setTurn("player");
        break;
      case "player":
        defense =
          document.querySelector(`#enemy>.pokemon-defense`).firstChild
            .textContent * 1;
        hp = document.querySelector(`#enemy>progress`).value * 1;
        damage =
          ((((2 / 5 + 2) * attack * 60) / defense / 50 + 2) * critChance) / 255;
        document.querySelector(`#enemy>progress`).value = hp - damage;
        document.querySelector(`#enemy>.pokemon-hp`).firstChild.innerText =
          Math.floor(hp - damage) > 0
            ? Math.floor(hp - damage)
            : (() => {
                e.target.innerText = "Catch";
                return 0;
              })();
        console.log(attack, defense, hp, critChance);
        setTurn("enemy");
        break;
    }
  };

  return props.pokemon === "No pokemons found" ? (
    <div>
      <h1>This location doesn't seem to have any pokémon</h1>
      <button onClick={props.onClick}>Back</button>
    </div>
  ) : (
    <div>
      <UsersPokemons
        id="enemy"
        name={props.pokemon.name}
        position={"right"}
        side={"front"}
      />

      <div>
        {pokemonSelected ? (
          <>
            <button id="start-battle" onClick={handleAttackClick}>
              Start Battle
            </button>
            <UsersPokemons
              id="player"
              name={pokemonSelected}
              position={"left"}
              side={"back"}
            />
          </>
        ) : (
          <h1 className="select-a-pokemon-text">Select a pokemon to fight!</h1>
        )}
      </div>
      <ColectionCarousel
        colectionSlides={colectionSlides}
        handleUsersPokemonClick={handleUsersPokemonClick}
      />
    </div>
  );
}
