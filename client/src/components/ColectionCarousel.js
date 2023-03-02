import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import React from "react";
import PokemonCard from "./PokemonCard";

export default function ColectionCarousel(props) {
  return (
    <Carousel className="colection-slide">
      {props.colectionSlides.map((slide, index) => (
        <Carousel.Item key={index} style={{ height: "700px" }}>
          <div className="users-pokemons" style={{ top: "3px" }}>
            {slide.map((pokemonName, index) => (
              <PokemonCard
                key={index}
                name={pokemonName}
                className="users-pokemons-card"
                onClick={props.handleUsersPokemonClick}
                usersPokemons={props.usersPokemons}
              />
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
