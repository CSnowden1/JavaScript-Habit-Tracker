import { Container } from "semantic-ui-react";
import { useEffect, useState } from "react";
import ProgressBar from "./progressBar";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { useAuth } from "../../Context/authContext";

export default function Overview({ habitsChanged, onHabitsChange }) {
  const { user } = useAuth();
  const userId = user ? user.user._id : null;
  const [habits, setHabits] = useState([]);

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
        const habitData = habits.user.habits;
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

  useEffect(() => {
    // Define an async function to fetch habits and update the state
    const fetchAndSetHabits = async () => {
      const habitsData = await fetchHabitsFromServer(userId);
      setHabits(habitsData);
      onHabitsChange();
    };

    // Check if habitsChanged prop changed, if it did, fetch new habits
    if (habitsChanged) {
      fetchAndSetHabits();
    }
  }, [habitsChanged, userId, onHabitsChange]);

  const containerStyles = {
    background: "rgba(49, 21, 219, .03)",
    boxShadow: "inset 4px 4px 4px rgba(87, 87, 87, 0.07)",
    borderRadius: "10px",
    width: "100vw",
    height: "10rem",
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    overflowX: "scroll",
  };

  return (
    <>
      <div style={containerStyles}>
        <Container
          style={{
            width: "auto",
            border: "solid black 1px",
            height: "5rem",
            borderRadius: "1rem",
            display: "flex",
            marginLeft: "2rem",
            marginRight: "2rem",
          }}
        >
          <BarChart width={700} height={100} data={habits}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              style={{
                border: "solid black 2px",
                backgroundColor: "gold",
                width: "1rem",
              }}
              dataKey="count"
              fill="gold"
            />
          </BarChart>
        </Container>
      </div>
    </>
  );
}
