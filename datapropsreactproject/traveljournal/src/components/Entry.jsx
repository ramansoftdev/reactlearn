export default function Entry(props) {

  // console.log(props)
  return (
    <article className="journal-entry ">
      <div className="main-image-container">
        <img src={props.img.src} className="main-image" alt={props.img.alt} />
      </div>

      <div className="info-container">
        <img className="marker" src="/src/assets/marker.png" alt="marker" />
        <span className="country"> {props.country}</span>
        <a href={props.googleMapsLink}>View on GoogleMaps</a>

        <h2 className="entry-title"> {props.title}</h2>
        <h3 className="trip-dates">{props.dates}</h3>
        <p className="entry-text">{props.text}</p>
      </div>
    </article>
  );
}
