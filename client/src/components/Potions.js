import { useState } from "react";
import Modal from "./Modal";

export default function Potions(props) {
  const [modalShow, setModalShow] = useState(false);
  const [potionsShow, setPotionsShow] = useState(true);
  const [userPokemons, setUsersPokemons] = useState(props.userPokemons);

  const handleModalClick = (e) => {
    // alert("pokemon healed")
    const pokemonToHeal = e.target.previousSibling.lastChild.id;

    props.modifyUsersPokemons({
      ...userPokemons,
      [pokemonToHeal]: userPokemons[pokemonToHeal] + 10,
    });
    setUsersPokemons({
        ...userPokemons,
        [pokemonToHeal]: userPokemons[pokemonToHeal] + 10,
      })
    console.log(userPokemons[pokemonToHeal], pokemonToHeal);
    setModalShow(false);
  };

  return userPokemons && (
    <>
      <button onClick={() => setModalShow(true)}>Potions</button>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        potionsShow={potionsShow}
        handleModalClick={handleModalClick}
        userPokemons={userPokemons}
      />
    </>
  );
}
