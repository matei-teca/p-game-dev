import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

export default function PokemonCard(props) {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${props.name}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemonDetails(data);
      })
      .catch((e) => {});
  }, []);
  return (
    pokemonDetails && (
      <Card
        style={{
          backgroundImage: `url(${pokemonDetails.sprites.front_default})`,
        }}
        onClick={(e) => {}}
      >
        <h4>{pokemonDetails.name.toUpperCase()}</h4>
        <h5>{pokemonDetails.stats[0].base_stat}HP</h5>
        <h5>{pokemonDetails.stats[1].base_stat}Attack</h5>
        <h5>{pokemonDetails.stats[2].base_stat}Defense</h5>
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: 0,
          }}
          onClick={(e) => {
            e.target.parentElement.classList.add("cardSelected");
          }}
        ></div>
      </Card>
    )
  );
}
