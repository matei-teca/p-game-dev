import { useState } from "react";
import PokemonEncounter from "./PokemonEncounter";
import CollectionCarousel from "./CollectionCarousel";
import Level from "./Level";
import Potions from "./Potions";
import state from "./test";
import { useAtom } from "jotai";

export default function Battleground() {
  const [turn, setTurn] = useState("Player");
  const [ifEnemyLost, setIfEnemyLost] = useAtom(state.ifEnemyLost);
  const [pokemonSelected, setPokemonSelected] = useAtom(state.pokemonSelected);
  const [userPokemons, setUserPokemons] = useAtom(state.userPokemons);
  const [level, setLevel] = useAtom(state.level);
  const [enemyPokemon, setEnemyPokemon] = useAtom(state.enemyPokemon);



  const handleAttackClick = (e) => {
    switch (e.target.innerText) {
      case "Attack":
        handleTurn(turn, e);
        break;
      case "Catch":
        alert("You catched it");
        setEnemyPokemon(null);
        setUserPokemons({ ...userPokemons, [enemyPokemon.name]: null });
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
          // document.querySelector(`#${pokemonSelected}`).parentElement.parentElement.parentElement.remove()
          setUserPokemons(
            Object.fromEntries(
              Object.entries(userPokemons).filter(
                ([key]) => key !== pokemonSelected
              )
            )
          );
          setPokemonSelected(null);
        } else {
          setUserPokemons({ ...userPokemons, [pokemonSelected]: HP_LEFT });
        }
        setTurn("Player");
        break;
      case "Player":
        HP_LEFT = getStats("Enemy", "Player");
        document.querySelector(`#Enemy>.pokemon-hp`).firstChild.innerText =
          HP_LEFT;
          if (HP_LEFT === 0) {
            e.target.innerText = "Catch";
          setLevel({ ...level, exp: level.exp + getExperience() });
          setIfEnemyLost(true);
        }
        setTurn("Enemy");
        break;
    }
  };
  
  const getExperience = () => {
    const getStat = (stat) => {
      return (
        document.querySelector(`#Enemy>.pokemon-${stat}`).firstChild
        .textContent * 1
      );
    };
    const attack = getStat("attack");
    const hp = document.querySelector("#Enemy>progress").max * 1;
    const defense = getStat("defense");

    return Math.floor(((attack + hp + defense) / 3) * 3);
  };
  
  return enemyPokemon === "No pokemons found" ? (
    <div>
      <h1>This location doesn't seem to have any pokémon</h1>
      <button onClick={() => setEnemyPokemon(null)}>Back</button>
      <>{console.log(userPokemons)}</>
    </div>
  ) : (
    <div className="pokemons-battleground">
      <Level />
      <div className="Test">
        <Potions />
        <PokemonEncounter
          id="Enemy"
          name={enemyPokemon.name}
          position={"right"}
          side={"front"}
          enemyLost={ifEnemyLost}
        />

        <div>
          {pokemonSelected ? (
            <>
              <h1 className="turn-title">
                {ifEnemyLost ? "" : `${turn}'s turn`}
              </h1>
              <button id="start-battle" onClick={handleAttackClick}>
                Attack
              </button>
              <PokemonEncounter
                id="Player"
                name={pokemonSelected}
                position={"left"}
                side={"back"}
              />
            </>
          ) : Object.keys(userPokemons).length === 0 ? (
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
              <button onClick={()=> setEnemyPokemon(null)}>Back</button>
              <h1 className="select-a-pokemon-text">
                Select a pokemon to fight!
              </h1>
            </div>
          )}
        </div>
        <CollectionCarousel />
      </div>
    </div>
  );
}
