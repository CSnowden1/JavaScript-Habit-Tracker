import { useState } from "react";


export default function Greeting({name, day, time}) {


    return (
        <>
            <div>
                <h2>Hello, {name}.  We hope you are enjoying your {day} {time}.</h2>
            </div>
        </>
    )
}