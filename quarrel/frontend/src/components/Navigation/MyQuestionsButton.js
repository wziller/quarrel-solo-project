import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';



const MyQuestionsButton = () => {
    const {id} = useSelector((state) => state.session.user)

    return(
    <NavLink to={`/MyQuestions/${id}`}>
        <button className="MyQuestionsButton">My Questions</button>
    </NavLink>
    )
}
export default MyQuestionsButton;
