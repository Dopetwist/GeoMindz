import React, { useState } from "react";

function Button(props) {
    const [isMoused, setMoused] = useState(false);

    function mouseOver() {
       setMoused(true);
    }

    function mouseOut() {
       setMoused(false);
    }

    return <button 
        style={{
            backgroundColor: isMoused ? "black" : "white", 
            color: isMoused ? "white" : "black", 
            cursor: isMoused && "pointer"
        }}
        onClick={props.click}
        onMouseOver={mouseOver}
        onMouseOut={mouseOut}>
        Submit <span> {props.checkCorrect ? "Good" : "Bad"} </span>
    </button>
}

export default Button;