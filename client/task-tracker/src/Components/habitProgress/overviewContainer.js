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
            <div style={{width:"100%", backgroundColor: "grey", height:"10rem", display:"flex", alignContent:"center", alignItems:"center"}}>
                <Container style={{width:"auto", border:"solid black 1px", height:"5rem", borderRadius:"1rem", display: "flex", marginLeft:"2rem", marginRight:"2rem"}}>
                    <BarChart width={700} height={100} data={habits}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar style={{border: "solid black 2px", backgroundColor: "gold", width: "1rem" }} dataKey="count" fill="gold" />
                    </BarChart>
                </Container>
            </div>
        </>
    )
}

