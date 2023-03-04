import "bootstrap/dist/css/bootstrap.css";
import PokemonCard from "./PokemonCard";

export default function CarouselColumn({handleSelectClick, column}) {
  return (
    <div className="d-inline card--container">
      {column.map((pokemonName, index) => (
        <>
          <PokemonCard name={pokemonName} key={index} handleSelectClick={handleSelectClick}/>
        </>
      ))}
    </div>
  );
}
