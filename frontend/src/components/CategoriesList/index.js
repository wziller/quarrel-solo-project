import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/questions";
import CategoryLinkButton from "./CategoryLinkButton";
import "./index.css";

function CategoriesList() {
    const questionCategories = useSelector(state => state.questions.categories);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
      }, [dispatch]);
 return (
    <div id="CategoriesListContainer">
        <h2>Categories List</h2>
        {questionCategories.map(category =>(
            <CategoryLinkButton key={category.name} name={category.name} id={category.id} />
        ))}
    </div>
 );
}

export default CategoriesList;
