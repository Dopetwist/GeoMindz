import { useEffect, useState } from "react";

function Timer() {

    const [ countDownStarted, setCountDown ] = useState(true);
    const [ count, setCount ] = useState(20);

    useEffect(() => {

        const countDownInterval = setInterval(() => {

            if (countDownStarted) {
                function remainingTime() {
                    setCount(count - 1);
                }

                remainingTime();

                if (count <= 0) {
                    clearInterval(countDownInterval);
                    alert("Time Up!");
                }
        
            }
        }, 1000);

        return () => clearInterval(countDownInterval);
    }, [count])

    return (
        <div>
            <h1> {count} </h1>
        </div>
    )
}

export default Timer;