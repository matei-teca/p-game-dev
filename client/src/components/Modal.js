import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PokemonCard from "./PokemonCard";

export default function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Pokemon Card
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PokemonCard name={props.name} key={1} onClick={() => {}} />
      </Modal.Body>

      <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
        
          <Button onClick={props.handleModalClick}>{Object.keys(props.usersPokemons).includes(props.name) ? "Remove" : "Add"}</Button>
        
      </Modal.Footer>
    </Modal>
  );
}
