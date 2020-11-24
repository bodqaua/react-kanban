import React from "react";
import {Link} from "react-router-dom";

type props = {
    alias: string;
    name: string;
}

export const BoardLink = ({alias, name}: props) => {
    return (
        <div className={"board-link"}>
            <Link to={`/${alias}`}>{name}</Link>
        </div>)
}