import "./App.css";
import React, { useEffect, useState } from "react";
import Locations from "./components/Locations";
import Pokemon from "./components/Pokemon";

function App() {
  const [locations, setLocations] = useState(null);
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
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
        console.log(pokemonArray)
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
      {pokemon ? (
        <Pokemon pokemon={pokemon} onClick={handleBackClick} />
      ) : (
        locations &&
        locations.results.map((location, index) => (
          <Locations
            key={index}
            name={location.name}
            id={index}
            onClick={handleLocationClick}
          />
        ))
      )}
    </div>
  );
}

export default App;
