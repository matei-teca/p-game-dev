import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import state from "./test";
import { useAtom } from "jotai";

export default function PokemonCard({ handleSelectClick, name, className }) {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [userPokemons, setUserPokemons] = useAtom(state.userPokemons);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemonDetails(data);
      })
      .catch((e) => setPokemonDetails("error"));
  }, []);
  return (
    pokemonDetails &&
    (pokemonDetails === "error" ? (
      <Card className={"card-error"}>
        <h2>{name.toUpperCase()}</h2>
        <h3>Not Available</h3>
      </Card>
    ) : (
      <Card className={className ? className : ""}>
        <h4>{pokemonDetails.name.toUpperCase()}</h4>
        <h5>
          {userPokemons[pokemonDetails.name]
            ? userPokemons[pokemonDetails.name]
            : pokemonDetails.stats[0].base_stat}
          HP
        </h5>
        <h5>{pokemonDetails.stats[1].base_stat}Attack</h5>
        <h5>{pokemonDetails.stats[2].base_stat}Defense</h5>
        <div
          id={pokemonDetails.name}
          style={{
            backgroundImage: `url(${pokemonDetails.sprites.front_default})`,
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: 1,
            backgroundSize: "65%",
            backgroundRepeat: " no-repeat",
            backgroundPosition: "right",
          }}
          onClick={handleSelectClick}
        ></div>
      </Card>
    ))
  );
}
