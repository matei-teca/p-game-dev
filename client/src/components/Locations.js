export default function Locations(props) {
  return (
    <div
      id={props.id}
      onClick={props.onClick}
      className={`location--item-small ${props.locationID}`}
    >
      <p>{props.name}</p>
    </div>
  );
}
