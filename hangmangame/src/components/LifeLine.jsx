export default function LifeLine(props) {

  const lifeLostPath = "/src/assets/skull.png";  
  const lifePath = "/src/assets/heart.png";  
  const lives = Array(props.totalLives).fill("");

  const lifeLines = lives.map((item, index) => {
    const imagepath = (props.usedLives >= (index+1))? lifeLostPath : lifePath;
    return <img key={index+1} src={imagepath} />;
  });

  return <>{lifeLines}</>;
}
