import React from "react";

function Country(props) {

    if (!props.countries) return <p>Loading country...</p>;

    return <p className="country">{props.countries.country}</p>
}

export default Country;