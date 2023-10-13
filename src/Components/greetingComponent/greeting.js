import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/authContext";

const getTimeOfDay = () => {
  const currentHour = new Date().getHours();
  const currentDay = new Date().getDay();

  const getDayString = (day) => {
    switch (day) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        return "";
    }
  };

  const dayString = getDayString(currentDay);

  if (currentHour >= 4 && currentHour < 10) {
    return `${dayString}, morning`;
  } else if (currentHour >= 11 && currentHour < 15) {
    return `${dayString}, afternoon`;
  } else if (currentHour >= 16 && currentHour < 19){
    return `${dayString}, evening`;
  } else {
    return `${dayString}, night`;
  }
};

export default function Greeting() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("Hello");
  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay());

  useEffect(() => {
    // Update time of day when component mounts
    setTimeOfDay(getTimeOfDay());
  }, []);

  useEffect(() => {
    if (user) {
      // If the user is logged in, update the greeting with their first name
      setGreeting(`Hello, ${user.user.firstName}`);
    } else {
      // If the user is not logged in, revert to the default greeting
      setGreeting("Hello");
    }
  }, [user]);

  return (
    <div>
      <h2>
        {greeting}. We hope you have a great {timeOfDay}.
      </h2>
    </div>
  );
}
