import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PokemonCard from "./PokemonCard";
import "../App.css";

import { useEffect, useState } from "react";

export default function MyVerticallyCenteredModal(props) {
  const [userPokemons, setUsersPokemons] = useState(props.userPokemons)

  useEffect(() => {
    setUsersPokemons(props.userPokemons)
  },[props.userPokemons])

  return userPokemons && (props.potionsShow ? (
    <Modal show={props.show}
    onHide={props.onHide}
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
              <PokemonCard name={pokemonName}  key={index} usersPokemons={userPokemons}/>
            <Button variant="outline-success" onClick={props.handleModalClick}>
              Heal
            </Button>
              </>
            ))}
          {/* <div style={{ width: "20%", marginLeft: "45%", marginTop: "-85%" }}> */}
          {/* </div> */}
          </div>
        </Modal.Body>

    </Modal>
  ) : 
  (
    <Modal
      show={props.show}
      onHide={props.onHide}
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
            <PokemonCard name={props.name} key={1} onClick={() => {}} />
          </div>

          <div style={{ width: "20%", marginLeft: "45%", marginTop: "-85%" }}>
            <Button variant="outline-success" onClick={props.handleModalClick}>
              {Object.keys(props.usersPokemons).includes(props.name)
                ? "Remove"
                : "Add"}{" "}
            </Button>
          </div>
        </Modal.Body>
    </Modal>
  ));
}
