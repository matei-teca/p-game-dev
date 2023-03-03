import "./App.css";
import React, { useEffect, useState } from "react";
import Locations from "./components/Locations";
import Pokemon from "./components/Pokemon";
import "bootstrap/dist/css/bootstrap.css";
import PokemonsColection from "./components/PokemonsColection";
import StarterPage from "./components/StarterPage";
import SearchBar from "./components/SearchBar";
import state from "./components/test";
import { useAtom } from 'jotai'



let x = 0;
function App() {
  const [locations, setLocations] = useState(null);
  const [pokemon, setPokemon] = useState(null);
  const [pokemonColection, setPokemonColection] = useState(null);
  const [userPokemons, setUserPokemons] = useAtom(state.userPokemons)
  
  useEffect(() => {
    let arr = [];
    let loadigbar = document.querySelector(".loadingBar");
    let progressBar = document.querySelector("progress");
    for (let i = 1; i <= 528; i++) {
      fetch(`https://pokeapi.co/api/v2/evolution-chain/${i}/`)
        .then((res) => res.json())
        .then((data) => {
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
  }, []);

  const loadMap = () => {
    fetch("https://pokeapi.co/api/v2/location")
      .then((res) => res.json())
      .then((data) => setLocations(data));
  };

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
  const modifyUsersPokemons = (newUsersPokemons) => {
    setUsersPokemons(newUsersPokemons)
  } 

  const handleBackClick = () => {
    setPokemon(null);
  };
  
  const handleSelectClick = (e) => {
    if (Object.keys(userPokemons).length < 3 && !Object.keys(userPokemons).includes(e.target.id)) {
      setUserPokemons({...userPokemons, [e.target.id]:null})
      e.target.parentElement.classList.add("cardSelected");
    } else if (Object.keys(userPokemons).indexOf(e.target.id) !== -1) {
      e.target.parentElement.classList.remove("cardSelected");
      delete userPokemons[e.target.id];
      setUserPokemons({...userPokemons, })
    }
  };

  const addToColection = (newPokemon) => {
    if (!Object.keys(usersPokemons).includes(newPokemon))
      setUsersPokemons({...usersPokemons, [newPokemon]:null});
  };

  const removeFromCollection = (oldPokemon) => {
    delete usersPokemons[oldPokemon]
    setUsersPokemons(usersPokemons)
  }

  return (
    <div className="App">
      {pokemonColection ? (
        locations ? (
          pokemon ? (
            <div>
              <Pokemon
                pokemon={pokemon}
                handleOnClick={handleBackClick}
                usersPokemons={usersPokemons}
                addToColection={addToColection}
                modifyUsersPokemons = {modifyUsersPokemons}
                removeFromCollection={removeFromCollection}
                // handleLevel={handleLevel}
                // level={level}
              />
            </div>
          ) : (
            <div className="locations-app">
              <div className="locations--container">
                {locations.results.map((location, index) => (
                  <Locations
                    key={index}
                    name={location.name}
                    id={index}
                    locationID={`location${index}`}
                    onClick={handleLocationClick}
                  />
                ))}
              </div>
            </div>
          )
        ) : (
          <>
          <div className = "nav-bar--container">

            <SearchBar
              pokemonColection={pokemonColection}
              addToColection={addToColection}
              removeFromCollection={removeFromCollection}
              usersPokemons={usersPokemons}
              loadMap={loadMap}
            />
          </div>  
            <PokemonsColection
              pokemonColection={pokemonColection}
              onClick={handleSelectClick}
            />
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
