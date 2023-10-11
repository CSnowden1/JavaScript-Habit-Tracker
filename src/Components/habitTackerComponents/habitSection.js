import { useState, useEffect } from "react";
import Subheading from "../reusableComponents/subHeading";
import CustomButton from "../reusableComponents/submitBtn";
import HabitForm from "./addHabitModel";
import HabitContainer from "../habitTackerComponents/habitContainer";
import SearchBar from "../reusableComponents/search";


function HabitSection() {
  const [open, setOpen] = useState(false);
  const [habits, setHabits] = useState([]);
  //const storedHabits = JSON.parse(localStorage.getItem('habits')) || [];
  const [editingHabit, setEditingHabit] = useState(null);

  //useEffect(() => {
  //  setHabits(storedHabits);
 // }, [storedHabits]);

  useEffect(() => {
    console.log("CalendarSection mounted.");
  }, []);




  useEffect(() => {
    // Fetch habits from the server
    const fetchHabits = async () => {
      try {
        const response = await fetch("http://localhost:5000/habits/");
        if (response.ok) {
          const habitsData = await response.json();
          setHabits(habitsData);
        } else {
          console.error("Failed to fetch habits from the server");
        }
      } catch (error) {
        console.error("Error fetching habits:", error);
      }
    };

    fetchHabits();
  }, []);



  const handleOpen = () => {
    setOpen(true);
    console.log("BTN Clciked")
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async (newHabit) => {
     if (editingHabit) {
    try {
      const updatedHabits = habits.map((habit) =>
        habit._id === editingHabit._id ? { ...newHabit, _id: habit._id } : habit
      );
      localStorage.setItem("habits", JSON.stringify(updatedHabits));

      if (editingHabit._id) {
        // If the habit has a MongoDB _id, update it on the server
        await fetch(`http://localhost:5000/habits/${editingHabit._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newHabit),
        });
      } else {
        // If the habit doesn't have a MongoDB _id, save it to the server
        const response = await fetch("http://localhost:5000/habits", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newHabit),
        });

        if (response.ok) {
          const result = await response.json();
          const updatedHabitsWithId = updatedHabits.map((habit) =>
            habit === editingHabit ? { ...result, _id: result._id } : habit
          );
          localStorage.setItem("habits", JSON.stringify(updatedHabitsWithId));
        } else {
          window.alert("Failed to add a new habit.");
        }
      }

      setHabits(updatedHabits);
      setEditingHabit(null);
      handleClose();
    } catch (error) {
      window.alert(error.message);
    }
    } else {
      // Adding a new habit
      try {
        const response = await fetch("http://localhost:5000/habits", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newHabit), // Include the new habit data in the request body
        });
  
        if (response.status === 204) {
          // Successfully added the habit on the server
          setHabits([...habits, newHabit]);
          handleClose();
        } else {
          // Handle any error responses from the server
          window.alert("Failed to add a new habit.");
        }
      } catch (error) {
        window.alert(error.message);
      }
    }
  };
  

  const handleEdit = (habit) => {
    setEditingHabit(habit);
    handleOpen();
  };

  const handleCancelEdit = () => {
    setEditingHabit(null);
    handleClose();
  };
  
  const handleDelete = async (_id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this habit?");
    
    if (confirmDelete) {
      try {
        // Remove the habit from the local habits list
        const listItems = habits.filter((item) => item._id !== _id);
        localStorage.setItem('habits', JSON.stringify(listItems));
  
        // Send a DELETE request to delete the habit on the server
        await fetch(`http://localhost:5000/habits/${_id}`, {
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

  const handleAdd = async (_id) => {
    const habitData = {
      _id: _id,
      // Other properties as needed
    };
  
    try {
      // Add the 'await' keyword here
      const response = await fetch(`http://localhost:5000/habits/${id}/add`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(habitData),
      });
  
      if (response.ok) {
        const storedHabits = JSON.parse(localStorage.getItem("habits"));
        const updatedHabits = storedHabits.map((habit) => {
          if (habit._id === _id) {
            habit.count++;
            console.log("Add Clicked for Habit:", habit._id);
          }
          return habit;
        });
        localStorage.setItem("habits", JSON.stringify(updatedHabits));
        setHabits(updatedHabits);
      } else {
        console.error("Failed to update habit on the server");
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleMinus = async (_id) => {
    const habitData = {
      _id: _id,
      // Other properties as needed
    };
  
    try {
      // Add the 'await' keyword here
      const response = await fetch(`http://localhost:5000/habits/${id}/minus`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(habitData),
      });
  
      if (response.ok) {
        const storedHabits = JSON.parse(localStorage.getItem("habits"));
        const updatedHabits = storedHabits.map((habit) => {
          if (habit._id === _id) {
            habit.count--;
            console.log("Minus Clicked for Habit:", habit._id); // Corrected log message
          }
          return habit;
        });
        localStorage.setItem("habits", JSON.stringify(updatedHabits));
        setHabits(updatedHabits);
      } else {
        console.error("Failed to update habit on the server");
      }
    } catch (error) {
      console.error(error);
    }
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