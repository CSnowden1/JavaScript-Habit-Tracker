import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



function CustomCircularProgressbar({ habit }) {
  const percentage = (habit.count / habit.goal) * 100;
  const color = percentage < 50 ? 'red' : percentage < 100 ? 'orange' : 'green';

  const circleStyles = buildStyles({
    pathColor: color,
    trailColor: 'rgba(0, 0, 0, 0.1)',
    strokeLinecap: 'butt',
    pathTransitionDuration: 0.5,
  });

  const boxStyles = {
    width: '5rem',
    height: '5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const statBox = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: '2rem',
  };

  const lineBox = {
    border: 'solid black .25px',
    width: '2rem',
    height: '1px',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ flexGrow: 1 }}>
        <div style={boxStyles}>
          <CircularProgressbarWithChildren value={percentage} strokeWidth={10} styles={circleStyles}>
            <div style={statBox}>
              <div>{habit.count}</div>
              <div style={lineBox}>
                <div></div>
              </div>
              <div>{habit.goal}</div>
            </div>
            {[...Array(7)].map((_, i) => (
              <div key={i} style={{ width: '10px', height: '10px', backgroundColor: color, transform: `rotate(${i * (360 / 7)}deg) translate(60%, -50%)` }}></div>
            ))}
          </CircularProgressbarWithChildren>
        </div>
      </div>
    </div>
  );
}

 

export default CustomCircularProgressbar;