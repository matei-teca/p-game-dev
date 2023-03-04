import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import CarouselColumn from "./CarouselColumn";
import { useAtom } from "jotai";
import state from "./test";
import { useEffect } from "react";


export default function PokemonsColection() {
  const [userPokemons, setUserPokemons] = useAtom(state.userPokemons)
  const [pokemonCollection, setPokemonCollection] = useAtom(state.pokemonCollection)
  

  const handleSelectClick = (e) => {
    
    if (Object.keys(userPokemons).length < 3 && !Object.keys(userPokemons).includes(e.target.id)) {
      setUserPokemons({...userPokemons, [e.target.id]:null})
      e.target.parentElement.classList.add("cardSelected");
    } else if (Object.keys(userPokemons).indexOf(e.target.id) !== -1) {
      e.target.parentElement.classList.remove("cardSelected");
      setUserPokemons(Object.fromEntries(Object.entries(userPokemons).filter(([key]) => key !== e.target.id)))
    }
  };


  let slides = [];
  for (let i = 0; i < 516; i += 12) {
    slides.push(pokemonCollection.slice(i, i + 12));
  }
  
  return (
    <div className="main-carousel-div">
      <>{console.log(userPokemons)}</>
      <Carousel style={{ width: "150vw" }}>
        {slides?.map((slide, index) => (
          <Carousel.Item key={index} interval={5000}>
            <div className="main-carousel-itervals">
              {(() => {
                let columnsArr = [];
                for (let i = 0; i < slide.length; i += 3) {
                  columnsArr.push(slide.slice(i, i + 3));
                }
                return columnsArr?.map((column, index) => (
                  <CarouselColumn
                    key={index}
                    column={column}
                    handleSelectClick={handleSelectClick}
                  />
                ));
              })()}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
