import React, { useState } from "react";


function Input(props) {

    return (
        <input type="text" name="input" id="field" placeholder="Enter the Capital..." onChange={props.change} value={props.textValue} autoFocus/>
    )
}

export default Input;