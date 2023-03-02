export default function StarterPage() {
  return (
    <div className="locations-app">
      <div>
        <img
          style={{
            width: "40%",
          }}
          src={"../images/pokemon-pikachu-running-fdcgna00aeogxcjz.gif"}
        />
        <p className="loadingMessage">The pokemons are beeing fetched</p>
        <p className="loadingBar"></p>
        <progress id="file" max="520" value="0"></progress>
      </div>
    </div>
  );
}
