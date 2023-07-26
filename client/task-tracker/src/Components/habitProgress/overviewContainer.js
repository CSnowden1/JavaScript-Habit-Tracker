import { Container } from "semantic-ui-react";
import { useEffect, useState } from "react";
import ProgressBar from "./progressBar";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function Overview() {
    const [habits, setHabits] = useState([]);

  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    setHabits(storedHabits);
  }, []);

    const containerStyles = {
        background: "rgba(49, 21, 219, .03)",
        boxShadow: "inset 4px 4px 4px rgba(87, 87, 87, 0.07)",
        borderRadius: "10px",
        width:"100vw",
        height:"10rem",
        display:"flex",
        alignContent:"center",
        alignItems:"center",
        overflowX:"scroll"
    }

    return (
        <>
            <div style={containerStyles}>
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

