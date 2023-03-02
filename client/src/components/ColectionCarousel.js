import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import React, { useEffect } from "react";
import PokemonCard from "./PokemonCard";
import { useState } from "react";
export default function ColectionCarousel(props) {
  const [colectionSlides, setColectionSlides] = useState(null);

  useEffect(() => {
    setColectionSlides(() => {
      let arr = [];
      for (let i = 0; i < Object.keys(props.usersPokemons).length; i += 3) {
        arr.push(Object.keys(props.usersPokemons).slice(i, i + 3));
      }
      return arr;
    });
  }, [props.usersPokemons]);
  console.log(colectionSlides);
  return (
    <Carousel className="colection-slide">
      {colectionSlides &&
        colectionSlides.map((slide, index) => (
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
