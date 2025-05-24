import React from "react";
import HighlightRoundedIcon from '@mui/icons-material/HighlightRounded';

function Header() {
    return (
        <header>
            <HighlightRoundedIcon style={{
                fontSize: "4rem", 
                marginRight: "0.6rem",
                color: "white"
            }} />
            <h1>
            Quizix
            </h1>
        </header>
    )
}

export default Header;