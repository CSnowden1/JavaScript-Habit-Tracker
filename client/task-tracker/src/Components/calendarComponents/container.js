import { useState } from "react";
import Subheading from "../reusableComponents/subHeading";
import CustomContainer from "../reusableComponents/container";
import Switch from "../reusableComponents/filter";




function Calendarcontainer() {


    const [selectedOption, setSelectedOption] = useState("option1");

    const options = [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
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
                    <CustomContainer />
            </div>
        </>
    );
}

export default Calendarcontainer;