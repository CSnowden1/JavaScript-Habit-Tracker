import { useState, useEffect } from "react";
import Subheading from "../reusableComponents/subHeading";
import CustomButton from "../reusableComponents/submitBtn";
import HabitForm from "./addHabitModel";
import HabitContainer from "../habitTackerComponents/habitContainer";
import SearchBar from "../reusableComponents/search";


function HabitSection() {
  const [open, setOpen] = useState(false);
  const [habits, setHabits] = useState([]);
  const storedHabits = JSON.parse(localStorage.getItem('habits')) || [];
  const [editingHabit, setEditingHabit] = useState(null);

  useEffect(() => {
    setHabits(storedHabits);
  }, [storedHabits]);

  useEffect(() => {
    console.log("CalendarSection mounted.");
  }, []);


  const handleOpen = () => {
    setOpen(true);
    console.log("BTN Clciked")
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (newHabit) => {
    if (editingHabit) {
      // Editing an existing habit
      const updatedHabits = habits.map((habit) =>
        habit.id === editingHabit.id ? { ...newHabit, id: habit.id } : habit
      );
      localStorage.setItem("habits", JSON.stringify(updatedHabits));
      setHabits(updatedHabits);
      setEditingHabit(null);
    } else {
      // Adding a new habit
      setHabits([...habits, newHabit]);
    }
    handleClose();
  };

  const handleEdit = (habit) => {
    setEditingHabit(habit);
    handleOpen();
  };

  const handleCancelEdit = () => {
    setEditingHabit(null);
    handleClose();
  };
  
  const handleDelete = async (uuid) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this habit?");
    
    if (confirmDelete) {
      try {
        // Remove the habit from the local habits list
        const listItems = habits.filter((item) => item.uuid !== uuid);
        localStorage.setItem('habits', JSON.stringify(listItems));
  
        // Send a DELETE request to delete the habit on the server
        await fetch(`http://localhost:5000/habits/${uuid}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        setHabits(listItems);
      } catch (error) {
        window.alert(error.message);
      }
    }
  };

  
  const handleAdd = (id) => {
    const storedHabits = JSON.parse(localStorage.getItem("habits"));
    const updatedHabits = storedHabits.map((habit) => {
      if (habit.id === id) {
        habit.count++;
        console.log("Plus Clicked")
      }
      return habit;
    });
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
    setHabits(updatedHabits);
  };

  const handleMinus = (id) => {
    const storedHabits = JSON.parse(localStorage.getItem("habits"));
    const updatedHabits = storedHabits.map((habit) => {
      if (habit.id === id) {
        habit.count--;
        console.log("Plus Clicked")
      }
      return habit;
    });
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
    setHabits(updatedHabits);
  };

  return (
    <>
      <div style={containersStyles} className="column">
        <Subheading title="Habits" />
        <SearchBar />
        <HabitContainer habits={habits} deleteFunction={handleDelete} editFunction={handleEdit} Add={handleAdd} Minus={handleMinus} />
        <HabitForm
          open={open}
          onSave={handleSave}
          onClose={editingHabit ? handleCancelEdit : handleClose}
          editingHabit={editingHabit}
        />
        <button style={buttonStyles} onClick={handleOpen}>Create New Habit</button>
      </div>
    </>
  );
}


const containersStyles = {
  height: "auto",
  width: "100%"
};



const buttonStyles = {
  borderRadius: '1.2rem',
  backgroundColor: 'rgba(49, 21, 219, 0.72)',
  color: "white",
  width: '50%',
  height: '3rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '1rem',
  justifySelf: 'center',
  alignSelf: "center"
};



export default HabitSection;