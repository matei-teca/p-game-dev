export default function Locations(props) {
  return (
    <div id={props.id} onClick={props.onClick} className={"location--item"}>
      <p>{props.name}</p>
    </div>
  );
}
