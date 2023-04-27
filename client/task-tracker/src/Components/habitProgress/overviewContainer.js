import { Container } from "semantic-ui-react"
import { useEffect, useState } from "react";
import ProgressBar from "./progressBar";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function Overview() {
    const [habits, setHabits] = useState([]);
    const storedHabits = JSON.parse(localStorage.getItem('habits')) || [];

    useEffect(() => {
      setHabits(storedHabits);
    }, [storedHabits]);

    return (
        <>
        <Container style={{width:"100%", border:"solid black 1px", height:"5rem", borderRadius:"1rem", display: "flex"}}>
            <BarChart width={50} height={50} data={habits}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="gold" />
            </BarChart>
        </Container>
        </>
    )
}