import { Container } from "semantic-ui-react"
import { useEffect, useState } from "react";
import ProgressBar from "./progressBar";
export default function Overview() {
    const [habits, setHabits] = useState([]);
    const storedHabits = JSON.parse(localStorage.getItem('habits')) || [];

    useEffect(() => {
      setHabits(storedHabits);
    }, [storedHabits]);

    return (
        <>
        <Container style={{width:"100%", border:"solid black 1px", height:"5rem", borderRadius:"1rem", display: "flex"}}>
        {habits.map((habit) => (
            <ProgressBar key={habit.id} habit={habit} />
          ))}
        </Container>
        </>
    )
}