import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function CustomCircularProgressbar(props) {
  const percentage = 100;
  const circleStyles = buildStyles({
    pathColor: props.color,
    trailColor: 'rgba(0, 0, 0, 0.1)',
    strokeLinecap: 'butt',
    pathTransitionDuration: 0.5,
  });



  const boxStyles = {
    width: '5rem',
    height: "5rem",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}


  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginRight: '1rem' }}>
        <img src={props.imageUrl} alt="habit icon" style={{ width: '3rem', height: '3rem' }} />
      </div>
      <div style={{ flexGrow: 1 }}>
        <h2>{props.title}</h2>
        <div style={boxStyles}>
          <CircularProgressbarWithChildren value={percentage} strokeWidth={10} styles={circleStyles}>
            {[...Array(7)].map((_, i) => (
              <div key={i} style={{ width: '10px', height: '10px', backgroundColor: props.color, transform: `rotate(${i * (360 / 7)}deg) translate(60%, -50%)` }}></div>
            ))}
          </CircularProgressbarWithChildren>
        </div>
      </div>
    </div>
  );
}

export default CustomCircularProgressbar;