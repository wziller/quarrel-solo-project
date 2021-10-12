import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
// import * as sessionActions from "../../store/session";
import { getCategories } from "../../store/questions";
import "./index.css";

function CategoriesList() {
    const questionCategories = useSelector(state => state.questions.categories);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
      }, [dispatch]);
 return (
    <div id="mainQuestionsContainer">
        <h2>Categories List</h2>
        {questionCategories.map(category =>
            <p key={category.id}>{category.name}</p>
            )}
    </div>
 );
}

export default CategoriesList;
