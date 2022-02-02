import { useState } from "react";
import { NavLink } from "react-router-dom";

const CategoryLinkButton = ({categoryId, name, userId}) => {

    return (
        <NavLink to={`/questions/category/${categoryId}/user/${userId}`}>
        <button id={name} key={categoryId}>
            <span>{name}</span>
        </button>
        </NavLink>
    )
}

export default CategoryLinkButton;
