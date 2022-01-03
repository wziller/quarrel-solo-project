import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneQuestion, getQuestions, updateVoteTotals } from "../../store/questions";
import { getUsers } from "../../store/users";
import { NavLink } from "react-router-dom";
import AutoComplete from "../Autocomplete/AutoComplete";
import UpvotesDisplay from "../Upvotes";
import QuestionCard from "./QuestionCard";
import "./MainQuestionsBox.css";

function MainQuestionsBox() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);

  const questions = useSelector((state) => state.questions.list.sort((a,b)=> a.createdAt - b.createdAt));
  const sessionUser = useSelector((state) => state.session.user);
  const [searchedQuestion, setSearchedQuestion] = useState("");
  const questionNames = [];
  questions.forEach((question) => {
    questionNames.push(question.question_name);
  });

  const updateSearchedQuestion =(acInput) =>{
    setSearchedQuestion(acInput)
  }
useEffect(()=> {
  dispatch(updateVoteTotals())
},[])


  useEffect(()=> {

  }, [searchedQuestion])

  useEffect(async() => {
    await dispatch(getUsers());
    await dispatch(getQuestions());
  }, [dispatch]);

  useEffect(async()=>{
    const questionId = await questions?.find(question=> question.question_name === searchedQuestion)
    questionId && dispatch(getOneQuestion(questionId.id))
  },[searchedQuestion]);

  return questions ? (
    <div id="mainQuestionsContainer">
      <AutoComplete
        suggestions={questionNames}
        placeholder="Search for a question here"
        changeStateFunc={updateSearchedQuestion}
      />
      {questions.map(question => (
        <div className='single_question_main'>
          <QuestionCard question = {question}/>
          {sessionUser ? <UpvotesDisplay question ={question} userId = {sessionUser.id}/> : <p>Login to see how users voted!</p>}
        </div>
      ))}
    </div>
  ): (<div>
  </div>)
}
export default MainQuestionsBox;
