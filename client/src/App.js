import "./App.css";
import React, { useEffect, useState } from "react";
import Locations from "./components/Locations";
import Pokemon from "./components/Pokemon";
let x = 0;
function App() {
  const [locations, setLocations] = useState(null);
  const [pokemon, setPokemon] = useState(null);
  const [pokemonColection, setPokemonColection] = useState(null);
  useEffect(() => {
    let arr = [];
    let loadigbar = document.querySelector(".loadingBar");
    let progressBar = document.querySelector("progress");
    for (let i = 1; i <= 528; i++) {
      fetch(`https://pokeapi.co/api/v2/evolution-chain/${i}/`)
        .then((res) => res.json())
        .then((data) => {
          console.log(x);
          loadigbar.innerText = `${Math.floor(i / 2) + x}/520`;
          progressBar.value = Math.floor(i / 2) + x;
          arr.push(data.chain.species.name);
          if (i === 528) {
            x = 256;
          }
        })
        .catch((e) => {});
    }
    setTimeout(() => {
      setPokemonColection(arr);
    }, 3000);

    fetch("https://pokeapi.co/api/v2/location")
      .then((res) => res.json())
      .then((data) => setLocations(data));
  }, []);

  const handleLocationClick = (e) => {
    fetch(
      `https://pokeapi.co/api/v2/location-area/${
        e.target.parentElement.id * 1 + 1
      }/`
    )
      .then((res) => res.json())
      .then((data) => {
        let pokemonArray = data.pokemon_encounters;
        pokemonArray.length === 0
          ? setPokemon("No pokemons found")
          : setPokemon(
              pokemonArray[Math.floor(Math.random() * pokemonArray.length)]
                .pokemon
            );
      });
  };

  const handleBackClick = () => {
    setPokemon(null);
  };

  return (
    <div className="App">
      {pokemonColection ? (
        pokemon ? (
          <Pokemon pokemon={pokemon} onClick={handleBackClick} />
        ) : (
          <>
            {locations &&
              locations.results.map((location, index) => (
                <Locations
                  key={index}
                  name={location.name}
                  id={index}
                  onClick={handleLocationClick}
                />
              ))}
          </>
        )
      ) : (
        <div>
          <img
            src={"https://media.tenor.com/fSsxftCb8w0AAAAi/pikachu-running.gif"}
          />
          <p className="loadingMessage">The pokemons are beeing fetched</p>
          <p className="loadingBar">"0/520"</p>
          <progress id="file" max="520" value="0"></progress>
        </div>
      )}
    </div>
  );
}

export default App;
