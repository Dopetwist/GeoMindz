import { useEffect, useState } from "react";

function Timer() {

    // const now = new Date().toLocaleTimeString();

    const [ count, setCount ] = useState(20);

    useEffect(() => {
        const decrease = () => {
            setCount(count - 1);
        }

        decrease();
    }, [])

    // function decrease() {
    //     // const currentTime = new Date().toLocaleTimeString();
    //     setCount(count - 1);
    // }

    // setInterval(decrease, 1000);

    return (
        <div>
            <h1> {count} </h1>
        </div>
    )
}

export default Timer;