import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PokemonCard from "./PokemonCard";
import "../App.css";

export default function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      // size="md"
      // contentClassName="custom-modal-style"
    >
      {/* <Modal.Header closeButton style={{backgroundColor: "black"}}>

      </Modal.Header> */}
      <Modal.Body >
        <div style={{backgroundColor:"black", height: "380px"}}>
        <div style= {{width: "80%", height: "700px", marginLeft: "10%", paddingTop: "5%"}}>
          <PokemonCard name={props.name} key={1} onClick={() => {}} />
        </div>

        <div style= {{width: "20%", marginLeft: "45%", marginTop: "-85%"}} >
        <Button variant="outline-success" onClick={props.handleModalClick}>{props.usersPokemons.includes(props.name) ? "Remove" : "Add"} </Button>
        </div>
        </div>
      </Modal.Body>

      {/* <Modal.Footer style={{ display: "flex", justifyContent: "center", backgroundColor: "black"}}>
      </Modal.Footer> */}
    </Modal>
  );
}
