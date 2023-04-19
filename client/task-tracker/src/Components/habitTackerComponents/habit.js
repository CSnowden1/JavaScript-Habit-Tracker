import React from "react";
import "./habit.css";
import { Button } from 'semantic-ui-react';
import CircularProgressbar from '../habitTackerComponents/progressCircle';

function HabitBar({ habit, deleteFunction, editFunction, Add, Minus, completed }) {

  return (
    <>
      <div key={habit.id} habit={habit} className="flexRow">
        <div className="left">
          <Button class="btn-pad" icon="plus" onClick={() => Add(habit.id)} />
          <Button class="btn-pad" icon="minus" onClick={() => Minus(habit.id)} />
        </div>
        <div className="mid">
          <div>
            <img src={habit.image} alt={habit.name}/>
          </div>
          <div>
            <h2>{habit.name}</h2>
          </div>
          <div>
            <CircularProgressbar habit={habit} />
          </div>
        </div>
        <div className="right">
          <Button class="btn-pad" icon="edit" onClick={() => editFunction(habit.id)} />
          <Button class="btn-pad" icon="delete" onClick={() => deleteFunction(habit.id)} />
        </div>
      </div>
    </>
  );
}

export default HabitBar;