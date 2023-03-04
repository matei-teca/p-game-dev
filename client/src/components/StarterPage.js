import pika from "../images/pokemon-pikachu-running-fdcgna00aeogxcjz.gif";
import { useAtom } from "jotai";
import { useEffect } from "react";
import state from "./test";


export default function StarterPage() {
  const [pokemonCollection, setPokemonCollection] = useAtom(
    state.pokemonCollection
    );
let x = 0;
  
    useEffect(() => {
      let arr = [];
      let loadigbar = document.querySelector(".loadingBar");
      let progressBar = document.querySelector("progress");
      for (let i = 1; i <= 528; i++) {
        fetch(`https://pokeapi.co/api/v2/evolution-chain/${i}/`)
          .then((res) => res.json())
          .then((data) => {
            loadigbar.innerText = `${Math.floor(i / 2) + x}/520`;
            progressBar.value = Math.floor(i / 2) + x;
            arr.push(data.chain.species.name);
            if (i === 528) {
              x = 256;
            }
          })
          .catch((e) => {});
      }
      setTimeout(() => {
        setPokemonCollection(arr);
      }, 3000);
    }, []);


  
  return (
    <div className="locations-app">
      <div>
        <img style={{ width: "170%" }} src={pika} />
        <p className="loadingMessage">The pokemons are beeing fetched</p>
        <p className="loadingBar"></p>
        <progress id="file" max="520" value="0"></progress>
      </div>
    </div>
  );
}
