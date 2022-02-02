import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionsByCategory } from "../../store/questions";
import { getUsers } from '../../store/users';
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getVotes } from "../../store/votes";
import UpvotesDisplay from "../Upvotes";
import CategoryQuestionCard from "./CategoryQuestionCard";
import "./CategoryQuestionsBox.css";

function CategoryQuestionsBox() {
  const dispatch = useDispatch();
  const categoryId = useParams().id
  const users = useSelector((state) => state.users.list)
  const votes = useSelector((state) => state.votes.list)
  const questions = useSelector((state) => state.questions.list);
  const sessionUser = useSelector((state) => state.session.user);
  questions.forEach(question =>{
    const id  = question.id
    votes.forEach(vote => {
      if(vote.question_id === id && vote.user1_vote === true) question.user1_upvotes += 1
      if(vote.question_id === id && vote.user2_vote === true) question.user2_upvotes += 1
    })
  })

  useEffect(() => {
    dispatch(getQuestionsByCategory(categoryId, sessionUser.id));
  }, [dispatch, categoryId]);



  useEffect(()=> {
    dispatch(getUsers())
  },[dispatch, questions])

  return Array.isArray(questions) && questions ? (
    <div id="mainQuestionsContainer">
      <h2>Questions</h2>
        {questions?.map((question) => {
          if (question.category_id == categoryId && question.user2_response)
            return (
              <div className= "single_question_main" key={question.id}>
                <CategoryQuestionCard question={question}/>
                {sessionUser ? <UpvotesDisplay question={question} userId={sessionUser.id} /> : <p>Login to see voting</p>}
              </div>
            );
        })}
      </div>
  ) : (
    <div></div>
  );
}

export default CategoryQuestionsBox;
