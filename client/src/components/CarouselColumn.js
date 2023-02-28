import "bootstrap/dist/css/bootstrap.css";
import PokemonCard from "./PokemonCard";

import "../App.css";

export default function CarouselColumn(props) {
  return (
    <div className="d-inline card--container">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        }}
      >
        {props.column.map((pokemonName, index) => (
            <>
            <p>{console.log(pokemonName)}</p>
          <PokemonCard name={pokemonName} key={index}  />
            </>
        ))}
      </div>
    </div>
  );
}
