import {  Button } from 'semantic-ui-react';
import CircularProgressbar from '../habitTackerComponents/progressCircle';
import { useAuth } from "../../Context/authContext";
import "./habit.css"





function HabitBar({ habit, deleteFunction, editFunction, Add, Minus, completed,  habitId}) {

  const { user } = useAuth();
const userId = user ? user.user._id : null;


  const animations = {
    backgroundColor: habit.count >= habit.goal ? 'gold' : 'transparent',
    transition: 'background-color 0.5s ease-in-out',
    animation: habit.count >= habit.goal ? 'flash 1s 5s' : 'none',
    animationDelay: habit.count >= habit.goal ? '0.5s' : 'none',
  };







  return (
    <>
      <div key={habit._id} habit={habit}  class="flex-row" style={{...animations}}>
        <div className="left-styles">
          <Button icon="plus" onClick={() => Add( userId, habit._id) } />
          <Button icon="minus" onClick={() => Minus(userId, habit._id)} />
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
          <Button icon="edit" onClick={() => editFunction(habitId)} />
          <Button icon="delete" onClick={() => deleteFunction(habitId)}/>
        </div>
      </div>
    </>
  );
}

export default HabitBar;