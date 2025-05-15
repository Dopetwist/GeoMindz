import React, { useState } from "react";

function Score(props) {

    return <p className="count">Total score: {props.total}</p>;
}

export default Score;