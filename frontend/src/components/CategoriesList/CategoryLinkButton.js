import { NavLink } from "react-router-dom";
const CategoryLinkButton = ({id, name}) => {

    return (
        <NavLink to={`/questions/category/${id}`}>
        <button id={name} key={id}>
            <span>{name}</span>
        </button>
        </NavLink>
    )
}

export default CategoryLinkButton;
