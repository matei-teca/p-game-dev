import React from 'react'

export default function SearchBar(props) {
  return (
    <div>
        <input list="search-bar--datalist" id="search-bar--input" type="text" placeholder="pokemon search"/>
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
