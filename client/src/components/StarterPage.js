import pika from "../images/pokemon-pikachu-running-fdcgna00aeogxcjz.gif";

export default function StarterPage() {
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
