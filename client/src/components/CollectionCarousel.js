import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import React, { useEffect, useState , useRef } from "react";
import PokemonCard from "./PokemonCard";
import { useAtom } from "jotai";
import state from "./test";
export default function CollectionCarousel() {
  const [collectionSlides, setCollectionSlides] = useState([]);
  // const [makeNewSlides, setMakeNewSlides] = useState(false)
  const [pokemonSelected, setPokemonSelected] = useAtom(state.pokemonSelected);
  const [userPokemons] = useAtom(state.userPokemons);


  useEffect(()=> {  
    
    setCollectionSlides(() => {
        let arr = []
        for (let i = 0; i < Object.keys(userPokemons).length; i += 3) {
            arr.push(Object.keys(userPokemons).slice(i, i + 3))
          
          }
          return arr

      })
      
  }, [Object.keys(userPokemons).length]);

  const handleUsersPokemonClick = (e) => {
    setPokemonSelected(e.target.id);
    document.querySelectorAll(".users-pokemons-card").forEach((element) => {
      element.classList.remove("cardSelected");
    });
    e.target.parentElement.classList.add("cardSelected");
  };

  return (
    <Carousel className="colection-slide">
      {collectionSlides &&
        collectionSlides.map((slide, index) => (
          <Carousel.Item key={index} style={{ height: "700px" }}>
          <>
          <>{console.log()}</>
              </>
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
    </Carousel>
  );
}
