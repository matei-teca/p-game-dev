export default function StarterPage() {
  return (
    <div>
      <img
        src={"https://media.tenor.com/fSsxftCb8w0AAAAi/pikachu-running.gif"}
      />
      <p className="loadingMessage">The pokemons are beeing fetched</p>
      <p className="loadingBar">"0/520"</p>
      <progress id="file" max="520" value="0"></progress>
    </div>
  );
}
