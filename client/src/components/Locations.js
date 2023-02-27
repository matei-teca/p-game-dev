export default function Locations(props) {
  return (
    <div id={props.id} onClick={props.onClick}>
      <p>{props.name}</p>
    </div>
  );
}
