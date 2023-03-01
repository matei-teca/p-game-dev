import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from "./Modal"

export default function PopupPokemon(props) {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <div className={props.className}>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Launch vertically centered modal
        </Button>
  
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    )
}