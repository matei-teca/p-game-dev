import React from "react";
import Modal from "./Modal";
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

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

  // return (
  //   <div className="search-bar--container">
  //     <div className="search-bar--buttons">
  //     <input
  //       list="search-bar--datalist"
  //       id="search-bar--input"
  //       type="text"
  //       placeholder="pokemon search"
  //       // onChange={e => setPokemon(e.target.value)}
  //     />

  //     <button onClick={handleSearchClick} id="search-bar--searchBttn">Search</button>
  //     <button onClick={handlePokemonsSelectedClick} id="search-bar--selected">Pokemons Selected</button>
  //     </div>

  //     <datalist id="search-bar--datalist">
  //       {props.pokemonColection?.map((pokemon, index) => 
  //        <option value={pokemon}></option>
  //       )}
  //     </datalist>
  //     <Modal
  //       show={modalShow}
  //       onHide={() => setModalShow(false)}
  //       name={pokemon}
  //       handleModalClick={handleModalClick}
  //       usersPokemons={props.usersPokemons}
  //     />
  //   </div>
  // );

  return (
    <>
    <Navbar bg="dark" variant="dark" expand="lg" style={{display: "flex", justifyContent: "center", width: "100vw"}}>
      <Container fluid>
        {/* <Navbar.Brand href="#">Navbar scroll</Navbar.Brand> */}
        {/* <Navbar.Collapse id="navbarScroll"> */}
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link onClick={props.loadMap}>Go to Map</Nav.Link>

            {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown> */}

          </Nav>
          <Form className="d-flex">
            {/* <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            > */}
            {/* <input
                list="search-bar--datalist"
                id="search-bar--input"
                type="search"
                placeholder="pokemon search"
                className="me-2"
            /> */}
          <div className="search-bar--container">
            <Form.Control 
                list="search-bar--datalist"
                id="search-bar--input"
                type="search"
                placeholder="pokemon search"
                className="me-2"
                style={{width: "13vw", marginLeft: "1vw"}}
             />

            <Button variant="outline-success" onClick={handleSearchClick}>Search</Button>
            <Button variant="outline-success" onClick={handlePokemonsSelectedClick} style={{width: "13vw", marginLeft: "1vw"}}>Pokemons Selected</Button>
          </div>
          </Form>
        {/* </Navbar.Collapse> */}
      </Container>
    </Navbar>

    <datalist id="search-bar--datalist">
        {props.pokemonColection?.map((pokemon, index) => 
         <option value={pokemon}></option>
        )}
    </datalist>

    <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      name={pokemon}
      handleModalClick={handleModalClick}
      usersPokemons={props.usersPokemons}
    />
    </>
  );
}
