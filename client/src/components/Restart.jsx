import { useState } from "react";

function Restart(props) {

    const [isMoused, setIsMoused] = useState(false);

    function mousedOver() {
        setIsMoused(true);
    }

    function mousedOut() {
        setIsMoused(false);
    }


    return (
        <div className="restart-con">
            <button 
            onClick={props.click}
            style={{
                backgroundColor: isMoused ? "darkred" : "red",
                color: "white",
                cursor: isMoused && "pointer"
            }}
            onMouseOver={mousedOver}
            onMouseOut={mousedOut}
            >Restart Quiz
            </button>
        </div>
    )
}

export default Restart;