export default function Locations(props) {
  return (
    <div id={props.id} onClick={props.onClick} className={"location--item-small"}>
      <p>{props.name}</p>
    </div>
  );
}
