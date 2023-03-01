import React from 'react';
import PopupPokemon from "./PopupPokemon";

export default function SearchBar(props) {

    // const [currPokemonName, setCurrPokemonName] = useState(second)
    // onChange={(e) => setCurrPokemonName(e.target.value)} 
    // currPokemonName = {currPokemonName}

  return (
    <div>
        <input list="search-bar--datalist" id="search-bar--input" type="text" placeholder="pokemon search" />
        <datalist id="search-bar--datalist">
            {props.pokemonColection?.map((pokemon, index) => 
            {
                return <option value= {pokemon}></option>
            }

            )}
        </datalist>

    </div>
  )
}
