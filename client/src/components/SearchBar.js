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
  const handleClick = () => {
    let pokemonName = document.querySelector("#search-bar--input").value;
    if (props.pokemonColection?.includes(pokemonName)) {
      setPokemon(pokemonName);
      setModalShow(true);
    } else {
      alert("Please insert a correct pokemon");
    }
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
        {props.pokemonColection?.map((pokemon, index) => {
          return <option value={pokemon}></option>;
        })}
      </datalist>
      <button onClick={handleClick}>Search</button>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        name={pokemon}
      />
    </div>
  );
}
