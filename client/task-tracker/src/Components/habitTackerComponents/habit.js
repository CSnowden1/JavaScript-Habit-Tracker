import React from "react";
import "./habit.css";
import { Button } from 'semantic-ui-react';
import CircularProgressbar from '../habitTackerComponents/progressCircle';

function HabitBar({ habit, deleteFunction, editFunction, Add, Minus, completed }) {

  return (
    <>
      <div key={habit.id} habit={habit} className="flexRow">
        <div className="left">
          <Button class="ui fluid button" icon="plus" onClick={() => Add(habit.id)} />
          <Button class="ui fluid button" icon="minus" onClick={() => Minus(habit.id)} />
        </div>
        <div className="mid">
          <div class="ui">
            <img  class="fluid image" src={habit.image} alt={habit.name}/>
          </div>
          <div class="ui text">
            <h3>{habit.name}</h3>
          </div>
          <div class="">
            <CircularProgressbar habit={habit} />
          </div>
        </div>
        <div className="right">
          <Button class="ui  fluid button" icon="edit" onClick={() => editFunction(habit.id)} />
          <Button class="ui fluid button" icon="delete" onClick={() => deleteFunction(habit.id)} />
        </div>
      </div>
    </>
  );
}

export default HabitBar;