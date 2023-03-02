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
        handleTurn(turn, e);
        setTurn("enemy");
        e.target.innerText = "Next turn";
        break;
      case "Next turn":
        handleTurn(turn, e);
        break;
      case "Catch":
        props.addToColection(props.pokemon.name);
        if (!usersPokemons.includes(props.pokemon.name))
          setUsersPokemons([...usersPokemons, props.pokemon.name]);
        break;
    }
  };
  const getStats = (opponent, current) => {
    let ATTACK, HP, DAMAGE, DEFENSE, CRITCHANCE;
    CRITCHANCE = Math.floor(Math.random() * (255 - 217)) + 217;
    ATTACK =
      document.querySelector(`#${current}>.pokemon-attack`).firstChild
        .textContent * 1;
    DEFENSE =
      document.querySelector(`#${opponent}>.pokemon-defense`).firstChild
        .textContent * 1;
    HP = document.querySelector(`#${opponent}>progress`).value * 1;
    DAMAGE =
      ((((2 / 5 + 2) * ATTACK * 60) / DEFENSE / 50 + 2) * CRITCHANCE) / 255;
    document.querySelector(`#${opponent}>progress`).value = HP - DAMAGE;
    return HP - DAMAGE;
  };

  const handleTurn = (turn, e) => {
    let HP_LEFT;

    switch (turn) {
      case "enemy":
        HP_LEFT = getStats("player", "enemy");
        document.querySelector(`#player>.pokemon-hp`).firstChild.innerText =
          Math.floor(HP_LEFT) > 0 ? Math.floor(HP_LEFT) : 0;
        setTurn("player");
        break;
      case "player":
        HP_LEFT = getStats("enemy", "player");
        document.querySelector(`#enemy>.pokemon-hp`).firstChild.innerText =
          Math.floor(HP_LEFT) > 0
            ? Math.floor(HP_LEFT)
            : (() => {
                e.target.innerText = "Catch";
                return 0;
              })();
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
