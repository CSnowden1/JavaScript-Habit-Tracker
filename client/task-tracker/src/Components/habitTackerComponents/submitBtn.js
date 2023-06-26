import CustomButton from "../reusableComponents/submitBtn";
import { useState} from "react";


function SubmitSection() {
const [open, setOpen] = useState(false);


const handleOpen = () => {
    console.log("The Model Open Coming This Log is coming from the habitSection component");
    setOpen(true);
  };

<CustomButton title="Create New Habit" onClick={handleOpen} />

}


export default SubmitSection

