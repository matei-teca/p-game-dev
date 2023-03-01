import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import PokemonCard from "./PokemonCard";

export default function ColectionCarousel(props) {
  return (
    <Carousel className="colection-slide">
      {props.colectionSlides.map((slide, index) => (
        <Carousel.Item interval={10000} style={{ height: "700px" }}>
          <div className="users-pokemons" style={{ top: "3px" }}>
            {slide.map((pokemonName, index) => (
              <PokemonCard
                key={index}
                name={pokemonName}
                className="users-pokemons-card"
                onClick={props.handleUsersPokemonClick}
              />
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
