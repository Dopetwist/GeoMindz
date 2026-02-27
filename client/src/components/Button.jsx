import { useState } from "react";
import Zoom from '@mui/material/Zoom';

function Button(props) {
    const [isMoused, setMoused] = useState(false);

    // Function for button hover
    function mouseOver() {
       setMoused(true);
    }

    // Function for button non-hover
    function mouseOut() {
       setMoused(false);
    }

    return (
        <Zoom in={true}>
            <button 
                style={{
                    backgroundColor: isMoused ? "navy" : "blue", 
                    cursor: isMoused && "pointer"
                }}
                onClick={props.click}
                onMouseOver={mouseOver}
                onMouseOut={mouseOut}>
                Submit
            </button>
        </Zoom>
    )
}

export default Button;