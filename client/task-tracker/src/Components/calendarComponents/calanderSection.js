import { useState } from "react";
import Subheading from "../reusableComponents/subHeading";
import Switch from "../reusableComponents/filter";
import CalanderContainer from "./calanderContainer";




function Calendarcontainer() {


    const [selectedOption, setSelectedOption] = useState("option1");

    const options = [
        { label: "All Day", value: "option1" },
        { label: "Morning", value: "option1" },
        { label: "Afternoon", value: "option2" },
        { label: "Night", value: "option3" },
    ];

    const handleOptionChange = (value) => {
      setSelectedOption(value);
    };


    const calendarStyles = {
        height: '100%'
    }


    return (
        <>
            <div style={calendarStyles} class="column">
                    <Subheading title="Calendar" />
                    <Switch
                        options={options}
                        selectedOption={selectedOption}
                        onChange={handleOptionChange}
                    />
                    <CalanderContainer />
            </div>
        </>
    );
}

export default Calendarcontainer;