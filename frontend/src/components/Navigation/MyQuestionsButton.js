import { NavLink } from "react-router-dom";
import {useSelector } from 'react-redux';
import "./Navigation.css"




const MyQuestionsButton = () => {
    const {id} = useSelector((state) => state.session.user)

    return(
    <NavLink to={`/MyQuestions/${id}`}>
        <button className="MyQuestionsButton">My Questions</button>
    </NavLink>
    )
}
export default MyQuestionsButton;
