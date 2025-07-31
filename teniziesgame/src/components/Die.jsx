export default function Die(props) {
  const styles = { backgroundColor: props.isHeld ? "#59E391" : "white" };

  return (
    <>
      <button
        onClick={props.hold}
        style={styles}
        aria-label={`Die with a value ${props.value} and is being ${
          props.isHeld ? "held" : "not held"
        }`}
        aria-pressed={props.isHeld}
      >
        {" "}
        {props.value}{" "}
      </button>
    </>
  );
}
