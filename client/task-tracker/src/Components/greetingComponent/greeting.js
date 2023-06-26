import { useState } from "react";


export default function Greeting({name, day, time}) {

    const greetingStyles = {
        width:"100%",
        height:"auto",
        display:"flex",
        alignContent:"center",
        alignItems:"center"
    }

    return (
        <>
            <div style={greetingStyles}>
                <h2>Hello, {name}.  We hope you are enjoying your {day} {time}.</h2>
            </div>
        </>
    )
}