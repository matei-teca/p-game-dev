import state from "./test";
import { useAtom } from "jotai";

export default function Locations(props) {
  const [enemyPokemon, setEnemyPokemon] = useAtom(state.enemyPokemon);
  const [locations] = useAtom(state.locations);
  const [ifEnemyLost, setIfEnemyLost] = useAtom(state.ifEnemyLost)
  const [pokemonSelected, setPokemonSelected] = useAtom(state.pokemonSelected)

  const handleLocationClick = (e) => {
    setPokemonSelected(null)
    setIfEnemyLost(false)
    fetch(
      `https://pokeapi.co/api/v2/location-area/${
        e.target.parentElement.id * 1 + 1
      }/`
    )
      .then((res) => res.json())
      .then((data) => {
        let pokemonArray = data.pokemon_encounters;
        pokemonArray.length === 0
          ? setEnemyPokemon("No pokemons found")
          : setEnemyPokemon(
              pokemonArray[Math.floor(Math.random() * pokemonArray.length)]
                .pokemon
            );
      });
  };

  return locations.results.map((location, index) => (
    <div
      key={index}
      id={index}
      onClick={handleLocationClick}
      className={`location--item-small ${`location${index}`}`}
    >
      <p style={{ maxWidth: "100%" }}>{location.name.split("-").join(" ")}</p>
    </div>
  ));
}
