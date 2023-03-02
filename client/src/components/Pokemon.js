import { useEffect, useState } from "react";
import UsersPokemons from "./UsersPokemons";
import ColectionCarousel from "./ColectionCarousel";
let x = 0;
export default function Pokemon(props) {
  const [pokemonSelected, setPokemonSelected] = useState(null);
  const [usersPokemons, setUsersPokemons] = useState(props.usersPokemons);
  const [turn, setTurn] = useState("player");

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
        if (!Object.keys(usersPokemons).includes(props.pokemon.name))
          setUsersPokemons({ ...usersPokemons, [props.pokemon.name]: null });
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
    return Math.floor(HP - DAMAGE) > 0 ? Math.floor(HP - DAMAGE) : 0;
  };

  const handleTurn = (turn, e) => {
    let HP_LEFT;

    switch (turn) {
      case "enemy":
        HP_LEFT = getStats("player", "enemy");
        document.querySelector(`#player>.pokemon-hp`).firstChild.innerText =
          HP_LEFT;

        if (HP_LEFT === 0) {
          document.querySelector(`#${pokemonSelected}`).parentElement.remove();
          props.removeFromCollection(pokemonSelected);
          delete usersPokemons[pokemonSelected];
          setPokemonSelected(null);
          setUsersPokemons(usersPokemons);
        } else {
          setUsersPokemons({
            ...usersPokemons,
            [pokemonSelected]: HP_LEFT,
          });
          props.modifyUsersPokemons({
            ...usersPokemons,
            [pokemonSelected]: HP_LEFT,
          });
        }
        setTurn("player");
        break;
      case "player":
        HP_LEFT = getStats("enemy", "player");
        document.querySelector(`#enemy>.pokemon-hp`).firstChild.innerText =
          HP_LEFT;
        if (HP_LEFT === 0) e.target.innerText = "Catch";
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
              UsersPokemons={usersPokemons}
            />
          </>
        ) : (
          <h1 className="select-a-pokemon-text">Select a pokemon to fight!</h1>
        )}
      </div>
      <ColectionCarousel
        handleUsersPokemonClick={handleUsersPokemonClick}
        usersPokemons={usersPokemons}
      />
    </div>
  );
}
