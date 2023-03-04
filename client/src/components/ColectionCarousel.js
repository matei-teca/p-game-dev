import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import React, { useEffect } from "react";
import PokemonCard from "./PokemonCard";
import { useState } from "react";
import { useAtom } from "jotai";
import state from "./test";
export default function ColectionCarousel() {
  const [colectionSlides, setColectionSlides] = useState(null);
  const [pokemonSelected, setPokemonSelected] = useAtom(state.pokemonSelected)
  const [userPokemons] = useAtom(state.userPokemons)

  useEffect(() => {
    setColectionSlides(() => {
      let arr = [];

      for (let i = 0; i < Object.keys(userPokemons).length; i += 3) {
        arr.push(Object.keys(userPokemons).slice(i, i + 3));
      }
      return arr;
    });
  }, [userPokemons]);

  const handleUsersPokemonClick = (e) => {
    setPokemonSelected(e.target.id);
    document.querySelectorAll(".users-pokemons-card").forEach((element) => {
      element.classList.remove("cardSelected");
    });
    e.target.parentElement.classList.add("cardSelected");
  };
  
  return (
    (<Carousel className="colection-slide">
      {colectionSlides &&
        colectionSlides.map((slide, index) => (
          <Carousel.Item key={index} style={{ height: "700px" }}>
            <div className="users-pokemons" style={{ top: "3px" }}>
              {slide.map((pokemonName, index) => (
                <PokemonCard
                  key={index}
                  name={pokemonName}
                  className="users-pokemons-card"
                  handleSelectClick={handleUsersPokemonClick}
                />
              ))}
            </div>
          </Carousel.Item>
        ))}
    </Carousel>)
  );
}
