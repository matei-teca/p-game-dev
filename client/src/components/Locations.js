export default function Locations(props) {
  return (
    <div
      id={props.id}
      onClick={props.onClick}
      className={`location--item-small ${props.locationID}`}
    >
      <p style={{maxWidth: "100%"}}>{props.name.split("-").join(" ")}</p>
    </div>
  );
}
