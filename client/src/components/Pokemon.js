import { useEffect, useState } from "react";
import UsersPokemons from "./UsersPokemons";
import ColectionCarousel from "./ColectionCarousel";
let x = 0;
export default function Pokemon(props) {
  const [pokemonSelected, setPokemonSelected] = useState(null);
  const [usersPokemons, setUsersPokemons] = useState(props.usersPokemons);
  const [turn, setTurn] = useState("Player");
  const [enemyLost, setEnemyLost] = useState(false);

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
        setTurn("Enemy");
        e.target.innerText = "Next turn";
        break;
      case "Attack":
        handleTurn(turn, e);
        break;
      case "Catch":
        alert("You catched it");
        props.handleOnClick();
        props.addToColection(props.pokemon.name);
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
      case "Enemy":
        HP_LEFT = getStats("Player", "Enemy");
        document.querySelector(`#Player>.pokemon-hp`).firstChild.innerText =
          HP_LEFT;

        if (HP_LEFT === 0) {
          document.querySelector(`#${pokemonSelected}`).parentElement.remove();
          props.removeFromCollection(pokemonSelected);
          delete usersPokemons[pokemonSelected];
          setPokemonSelected(null);
        } else {
          usersPokemons[pokemonSelected] = HP_LEFT;
          props.modifyUsersPokemons({
            ...usersPokemons,
            [pokemonSelected]: HP_LEFT,
          });
        }
        setTurn("Player");
        break;
      case "Player":
        HP_LEFT = getStats("Enemy", "Player");
        document.querySelector(`#Enemy>.pokemon-hp`).firstChild.innerText =
        HP_LEFT;
        if (HP_LEFT === 0) {
          e.target.innerText = "Catch";
          setEnemyLost(true);
        }
        setTurn("Enemy");
        break;
    }
  };

  return props.pokemon === "No pokemons found" ? (
    <div>
      <h1>This location doesn't seem to have any pokémon</h1>
      <button onClick={props.onClick}>Back</button>
    </div>
  ) : (
    <div className="pokemons-battleground">
      <UsersPokemons
        id="Enemy"
        name={props.pokemon.name}
        position={"right"}
        side={"front"}
        enemyLost={enemyLost}
      />

      <div>
        {pokemonSelected ? (
          <>
          <h1 className="turn-title">{`${turn}'s turn`}</h1>
            <button id="start-battle" onClick={handleAttackClick}>
              Attack
            </button>
            <UsersPokemons
              id="Player"
              name={pokemonSelected}
              position={"left"}
              side={"back"}
              UsersPokemons={usersPokemons}
            />
          </>
        ) : Object.keys(usersPokemons).length === 0 ? (
          <div>
            <h1>You Lost</h1>
            <button
              onClick={() => {
                window.location.reload();
              }}
            >
              Reset
            </button>
          </div>
        ) : (
          <div>
            <button onClick={props.handleOnClick}>Back</button>
            <h1 className="select-a-pokemon-text">
              Select a pokemon to fight!
            </h1>
          </div>
        )}
      </div>
      <ColectionCarousel
        handleUsersPokemonClick={handleUsersPokemonClick}
        usersPokemons={usersPokemons}
      />
    </div>
  );
}
