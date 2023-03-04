import React, { useState } from "react";
import Modal from "./Modal";
import Button from "react-bootstrap/Button";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import state from "./test";
import { useAtom } from "jotai";

export default function SearchBar(props) {
  const [pokemon, setPokemon] = useState(null);
  const [modalShow, setModalShow] = useAtom(state.modalShow);
  const [pokemonCollection] = useAtom(state.pokemonCollection);
  const [userPokemons, setUserPokemons] = useAtom(state.userPokemons);
  const [locations, setLocations] = useAtom(state.locations);

  const loadMap = () => {
    fetch("https://pokeapi.co/api/v2/location")
      .then((res) => res.json())
      .then((data) => setLocations(data));
  };

  let pokemonName;
  const handleSearchClick = () => {
    pokemonName = document.querySelector("#search-bar--input");
    if (pokemonCollection?.includes(pokemonName.value)) {
      setPokemon(pokemonName.value);
      setModalShow(true);
    } else {
      alert("Please insert a correct pokemon");
    }
    pokemonName.value = "";
  };

  const handleModalClick = (e) => {

    switch (e.target.innerText) {
      case "Add":
        setModalShow(false);
        setUserPokemons({ ...userPokemons, [pokemon]: null });
        document
        .querySelector(`#${pokemon}`)
        .parentElement.classList.add("cardSelected")
        

        break;

      case "Remove":
        setModalShow(false);
        document
        .querySelector(`#${pokemon}`)
        .parentElement.classList.remove("cardSelected")
        setUserPokemons(
          Object.fromEntries(
            Object.entries(userPokemons).filter(([key]) => key !== pokemon)
          )
        );
        break;
    }
  };

  const handlePokemonsSelectedClick = () => {
    alert(
      `${
        Object.keys(userPokemons).length > 0
          ? `Your selected pokemons are: ${Object.keys(userPokemons).join(
              ", "
            )}`
          : "No pokemons selected"
      }`
    );
  };

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        style={{ display: "flex", justifyContent: "center", width: "100vw" }}
      >
        <Container fluid>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link onClick={loadMap}>Go to Map</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <div className="search-bar--container">
              <Form.Control
                list="search-bar--datalist"
                id="search-bar--input"
                type="search"
                placeholder="pokemon search"
                style={{ width: "13vw" }}
              />

              <Button
                variant="outline-success"
                onClick={handleSearchClick}
                style={{ marginLeft: "1vw" }}
              >
                Search
              </Button>
              <Button
                variant="outline-success"
                onClick={handlePokemonsSelectedClick}
                style={{ width: "13vw", marginLeft: "1vw" }}
              >
                Pokemons Selected
              </Button>
            </div>
          </Form>
        </Container>
      </Navbar>

      <datalist id="search-bar--datalist">
        {pokemonCollection?.map((pokemon, index) => (
          <option value={pokemon} key={index}></option>
        ))}
      </datalist>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        name={pokemon}
        handleModalClick={handleModalClick}
      />
    </>
  );
}
