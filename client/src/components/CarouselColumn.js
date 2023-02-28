import "bootstrap/dist/css/bootstrap.css";
import PokemonCard from "./PokemonCard";

export default function CarouselColumn(props) {
  return (
    <div className="d-inline card--container">
      {props.column.map((pokemonName, index) => (
        <>
          <PokemonCard name={pokemonName} key={index} />
        </>
      ))}
    </div>
  );
}
