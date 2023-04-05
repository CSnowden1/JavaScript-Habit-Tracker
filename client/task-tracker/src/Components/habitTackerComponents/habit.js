import {  Button } from 'semantic-ui-react';
import CircularProgressbar from '../habitTackerComponents/progressCircle';
import "./habit.css"

function HabitBar({ habit, deleteFunction, editFunction, Add, Minus, completed}) {

  const flexRow = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    backgroundColor: habit.count >= habit.goal ? 'gold' : 'transparent',
    transition: 'background-color 0.5s ease-in-out',
    animation: habit.count >= habit.goal ? 'flash 1s 5s' : 'none',
    animationDelay: habit.count >= habit.goal ? '0.5s' : 'none',
    marginBottom: '.5rem',
    borderBottom: 'solid white 5px',
    padding: "1rem"
  };







  return (
    <>
      <div key={habit.id} habit={habit} style={{ ...flexRow,}}>
        <div class="leftStyles">
          <Button icon="plus" onClick={() => Add(habit.id) } />
          <Button icon="minus" onClick={() => Minus(habit.id)} />
        </div>
        <div  class="middleStyles">
          <div>
            <img src={habit.image}/>
          </div>
          <div>
            <p>{habit.name}</p>
          </div>
          <div>
            <CircularProgressbar habit={habit} />
          </div>
        </div>
        <div class="rightStyles">
          <Button icon="edit" onClick={() => editFunction(habit.id)} />
          <Button icon="delete" onClick={() => deleteFunction(habit.id)}/>
        </div>
      </div>
    </>
  );
}

export default HabitBar;