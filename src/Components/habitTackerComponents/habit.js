import {  Button } from 'semantic-ui-react';
import CircularProgressbar from '../habitTackerComponents/progressCircle';
import "./habit.css"

function HabitBar({ habit, deleteFunction, editFunction, Add, Minus, completed}) {

  const animations = {
    backgroundColor: habit.count >= habit.goal ? 'gold' : 'transparent',
    transition: 'background-color 0.5s ease-in-out',
    animation: habit.count >= habit.goal ? 'flash 1s 5s' : 'none',
    animationDelay: habit.count >= habit.goal ? '0.5s' : 'none',
  };







  return (
    <>
      <div key={habit.id} habit={habit}  class="flex-row" style={{...animations}}>
        <div className="left-styles">
          <Button icon="plus" onClick={() => Add(habit._id) } />
          <Button icon="minus" onClick={() => Minus(habit._id)} />
        </div>
        <div className='middle-styles'>
          <div>
            <img  alt="habit" src={habit.image}/>
          </div>
          <div>
            <p>{habit.name}</p>
          </div>
          <div>
            <CircularProgressbar habit={habit} />
          </div>
        </div>
        <div className="right-styles">
          <Button icon="edit" onClick={() => editFunction(habit._id)} />
          <Button icon="delete" onClick={() => deleteFunction(habit._id)}/>
        </div>
      </div>
    </>
  );
}

export default HabitBar;