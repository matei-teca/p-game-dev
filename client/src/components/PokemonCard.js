import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

import "../App.css";

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
      >
        <h2>{pokemonDetails.name.toUpperCase()}</h2>
        <h3>{pokemonDetails.stats[0].base_stat}HP</h3>
        <h3>{pokemonDetails.stats[1].base_stat}Attack</h3>
        <h3>{pokemonDetails.stats[2].base_stat}Defense</h3>
      </Card>
    )
  );
}
