import { useState } from "react";

function Restart(props) {

    const { click, displayedCountry } = props;

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
            onClick={click}
            style={{
                backgroundColor: isMoused ? "darkred" : "red",
                color: "white",
                cursor: isMoused && "pointer"
            }}
            onMouseOver={mousedOver}
            onMouseOut={mousedOut}
            >Restart Quiz
            </button>

            <div className="correct-ans">
                <div className="ans-con">
                    <h3> The Correct answer is <span id="answer"> {displayedCountry ? displayedCountry.capital : "...."} </span> </h3>
                </div>
            </div>
        </div>
    )
}

export default Restart;