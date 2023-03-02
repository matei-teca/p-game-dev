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
      size="sm"
      // contentClassName="custom-modal-style"
      // style={{backgroundColor: "black"}}
    >
      {/* <Modal.Header closeButton style={{backgroundColor: "black"}}>

      </Modal.Header> */}
      <Modal.Body style={{backgroundColor: "black"}}>
        {/* <div style={{backgroundColor:"black", height: "380px", width: "500px", borderRadius: "30px"}}> */}
        <div style= {{width: "80%", height: "700px", marginLeft: "10%", paddingTop: "5%"}}>
          <PokemonCard name={props.name} key={1} onClick={() => {}} />
        </div>

        <div style= {{width: "20%", marginLeft: "45%", marginTop: "-85%"}} >
        <Button variant="outline-success" onClick={props.handleModalClick}>{Object.keys(props.usersPokemons).includes(props.name) ? "Remove" : "Add"} </Button>
        </div>
        {/* </div> */}
      </Modal.Body>


    </Modal>
  );
}
