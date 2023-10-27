import {  Button } from 'semantic-ui-react';
import CircularProgressbar from '../habitTackerComponents/progressCircle';
import { useAuth } from "../../Context/authContext";
import "./habit.css"





function HabitBar({ habit, deleteFunction, editFunction, Add, Minus, completed,  habitId, theme}) {

  const { user } = useAuth();
const userId = user ? user.user._id : null;


  const animations = {
    backgroundColor: habit.count >= habit.goal ? 'gold' : 'transparent',
    transition: 'background-color 0.5s ease-in-out',
    animation: habit.count >= habit.goal ? 'flash 1s 5s' : 'none',
    animationDelay: habit.count >= habit.goal ? '0.5s' : 'none',
    borderBottom: theme !== 'light' ? 'black' : 'white',
    color: theme !== "light" ? "white" : "black",

  };







  return (
    <>
      <div key={habit._id} habit={habit}  class="flex-row" style={{...animations}}>
        <div class="flex-column">
          <div class="title-row">
              {habit.name}
          </div>
          <div class="action-row">
              <div class="habit-img">
                <img alt="habit" src={habit.image}/>              
              </div>
              <div class="circ-box">
                <CircularProgressbar habit={habit} />           
              </div>
              <div class="middle">
              <Button icon="plus" onClick={() => Add( userId, habit._id) } />
              <Button icon="minus" onClick={() => Minus(userId, habit._id)} />
              <Button icon="edit" onClick={() => editFunction(userId, habit._id)} />
              <Button icon="delete" onClick={() => deleteFunction(userId, habit._id)}/>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HabitBar;