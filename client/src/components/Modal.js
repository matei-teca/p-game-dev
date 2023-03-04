import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PokemonCard from "./PokemonCard";
import "../App.css";

import { useAtom } from "jotai";
import state from "./test";

export default function MyVerticallyCenteredModal({show, onHide, handleModalClick, name, potionsShow}) {
  const [userPokemons, setUserPokemon] = useAtom(state.userPokemons)


  return userPokemons && (potionsShow ? (
    <Modal show={show}  
    onHide={onHide}
    aria-labelledby="contained-modal-title-vcenter"
    centered
    size="sm">
      <Modal.Body style={{ backgroundColor: "black" }}>
          <div
          className="potions-cards"
            style={{
              width: "80%",
              marginLeft: "10%",
              paddingTop: "5%",
            }}
          >

            {Object.keys(userPokemons).map((pokemonName, index) => (
              <>
              <PokemonCard name={pokemonName}  key={index} />
            <Button variant="outline-success" onClick={handleModalClick}>
              Heal
            </Button>
              </>
            ))}
          </div>
        </Modal.Body>

    </Modal>
  ) : 
  (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="sm"
    >
        <Modal.Body style={{ backgroundColor: "black" }}>
          <div
            style={{
              width: "80%",
              height: "700px",
              marginLeft: "10%",
              paddingTop: "5%",
            }}
          >
            <PokemonCard name={name} key={1} onClick={() => {}} />
          </div>

          <div style={{ width: "20%", marginLeft: "45%", marginTop: "-85%" }}>
            <Button variant="outline-success" onClick={handleModalClick}>
              {Object.keys(userPokemons).includes(name)
                ? "Remove"
                : "Add"}
            </Button>
          </div>
        </Modal.Body>
    </Modal>
  ));
}
