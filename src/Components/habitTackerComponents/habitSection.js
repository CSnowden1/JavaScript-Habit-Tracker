import { useState, useEffect } from "react";
import Subheading from "../reusableComponents/subHeading";
import CustomButton from "../reusableComponents/submitBtn";
import HabitForm from "./addHabitModel";
import HabitContainer from "../habitTackerComponents/habitContainer";
import SearchBar from "../reusableComponents/search";
import { useAuth } from "../../Context/authContext";

function HabitSection({ onHabitsChange, theme }) {
  const [open, setOpen] = useState(false);
  const [habits, setHabits] = useState([]);
  //const storedHabits = JSON.parse(localStorage.getItem('habits')) || [];
  const [editingHabit, setEditingHabit] = useState(null);
    const { user } = useAuth();
    const userId = user ? user.user._id : null;


  useEffect(() => {
    console.log("CalendarSection mounted.");
  }, []);




  useEffect(() => {
        if (user) {
          const habitsData = user.user.habits;
          console.log(habitsData)
          setHabits(habitsData);
          onHabitsChange();
        } else {
          console.error("Failed to fetch habits from the server");
        }
    }, [user]
  );



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
  

  const handleDelete = async (userId, habitId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this habit?");
    
    if (confirmDelete) {
      try {
        // Send a DELETE request to delete the habit on the server
        const response = await fetch(`http://localhost:5000/users/${userId}/habits/${habitId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error(`Failed to delete habit: ${response.statusText}`);
        }
  
        const updatedHabits = await fetchHabitsFromServer(userId);
        setHabits(updatedHabits);

        
      } catch (error) {
        console.error("Error deleting habit:", error);
        window.alert("Failed to delete habit. Please try again.");
      }
    }
  };


  const handleAdd = async (userId, habitId) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}/habits/${habitId}/increment`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
  
      if (response.ok) {
        const updatedHabits = await fetchHabitsFromServer(userId);

        setHabits(updatedHabits);
        onHabitsChange();
      } else {
        console.error("Failed to update habit on the server");
      }
    } catch (error) {
      console.error(error);
    }
  };


  async function fetchHabitsFromServer(userId) {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const habits = await response.json();
        console.log(habits);
        const habitData = habits.user.habits
        return habitData;
      } else {
        console.error("Failed to fetch habits from the server");
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  

  const handleMinus = async (userId, habitId) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}/habits/${habitId}/decrement`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
  
      if (response.ok) {
        // Fetch updated habits from the server
        const updatedHabits = await fetchHabitsFromServer(userId);
        setHabits(updatedHabits);
        onHabitsChange();
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
        <Subheading theme={theme} title="Habits" />
        <SearchBar />
        <HabitContainer theme={theme} habits={habits} deleteFunction={handleDelete} editFunction={handleEdit} Add={handleAdd} Minus={handleMinus} />
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