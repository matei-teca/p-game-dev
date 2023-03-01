import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PokemonCard from "./PokemonCard";


export default function MyVerticallyCenteredModal(props) {

  const handleClick = () => {
    document.querySelector(`#${props.name}`).parentElement.classList.add("cardSelected")
    
  }

    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <PokemonCard name={props.name} key={1} onClick={handleClick} />
        </Modal.Body>

        <Modal.Footer style={{display: "flex", justifyContent:"center"}}>
          <Button onClick={() => alert("clicked")}>Add</Button>
        </Modal.Footer>
      </Modal>
    );
  }