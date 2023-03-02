import React from "react";
import Modal from "./Modal";

export default function SearchBar(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [pokemon, setPokemon] = React.useState("");

  // React.useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setModalShow(true)
  //   }, 2000)

  //   return () => clearTimeout(timer)
  // }, [pokemon])
  let pokemonName;
  const handleSearchClick = () => {
    pokemonName = document.querySelector("#search-bar--input");
    if (props.pokemonColection?.includes(pokemonName.value)) {
      setPokemon(pokemonName.value);
      setModalShow(true);
    } else {
      alert("Please insert a correct pokemon");
    }
    pokemonName.value = ""
  };

  const handleModalClick = (e) => {
    switch (e.target.innerText) {
      case "Add":
        document
          .querySelector(`#${pokemon}`)
          .parentElement.classList.add("cardSelected");

        setModalShow(false);
        props.addToColection(pokemon);

        break;

      case "Remove":
        document
          .querySelector(`#${pokemon}`)
          .parentElement.classList.remove("cardSelected");
        setModalShow(false);
        props.removeFromCollection(pokemon)
        break;
    }
  };

  const handlePokemonsSelectedClick = () => {
    alert(
      `${
        props.usersPokemons.length > 0
          ? `Your selected pokemons are: ${props.usersPokemons.join(", ")}`
          : "No pokemons selected"
      }`
    );
  };

  return (
    <div>
      <input
        list="search-bar--datalist"
        id="search-bar--input"
        type="text"
        placeholder="pokemon search"
        // onChange={e => setPokemon(e.target.value)}
      />
      <datalist id="search-bar--datalist">
        {props.pokemonColection?.map((pokemon, index) => 
         <option value={pokemon}></option>
        )}
      </datalist>
      <button onClick={handleSearchClick}>Search</button>
      <button onClick={handlePokemonsSelectedClick}>Pokemons Selected</button>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        name={pokemon}
        handleModalClick={handleModalClick}
        usersPokemons={props.usersPokemons}
      />
    </div>
  );
}
