import "./App.css";
import React, { useEffect, useState } from "react";
import Locations from "./components/Locations";
import Battleground from "./components/Battleground";
import "bootstrap/dist/css/bootstrap.css";
import PokemonsColection from "./components/PokemonsColection";
import StarterPage from "./components/StarterPage";
import Navbar from "./components/Navbar";
import state from "./components/test";
import { useAtom } from "jotai";

function App() {
  const [locations] = useAtom(state.locations);
  const [enemyPokemon] = useAtom(state.enemyPokemon);
  const [pokemonCollection] = useAtom(state.pokemonCollection)

  return (
    <div className="App">
      {pokemonCollection ? (
        locations ? (
          enemyPokemon ? (
            <div>
              <Battleground />
            </div>
          ) : (
            <div className="locations-app">
              <div className="locations--container">
                <Locations />
              </div>
            </div>
          )
        ) : (
          <>
            <div className="nav-bar--container">
              <Navbar />
            </div>
            <PokemonsColection />
          </>
        )
      ) : (
        <>
          <StarterPage />
        </>
      )}
    </div>
  );
}

export default App;
