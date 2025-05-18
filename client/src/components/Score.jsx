import React, { useState } from "react";

function Score(props) {

    return <p className="count">Score: {props.total}</p>;
}

export default Score;