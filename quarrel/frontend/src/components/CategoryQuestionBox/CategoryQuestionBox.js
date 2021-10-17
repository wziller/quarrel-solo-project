import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { getQuestions } from "../../store/questions";
import { getUsers } from '../../store/users';
import { getVotes } from "../../store/votes";
import "./CategoryQuestionsBox.css";

function MainQuestionsBox() {
  const users = useSelector((state) => state.users.list)
  const dispatch = useDispatch();
  const votes = useSelector((state) => state.votes.list)
  const questions = useSelector((state) => state.questions.list);
  const sessionUser = useSelector((state) => state.session.user);

  questions.forEach(question =>{
    const id  = question.id
    votes.forEach(vote => {
      vote.question_id === id && vote.vote === "user1"? question.user1_upvotes += 1 : question.user2_upvotes += 1
    })
  })

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getVotes());
  }, [dispatch]);
  useEffect(()=> {
    dispatch(getUsers())
  },[dispatch])

  return users.length > 0 ? (
    <div id="mainQuestionsContainer">
        <h2>Questions</h2>
        <div>
        {questions.map((question) => question.user1_response && (
        <NavLink key={question.id} to={`/questions/${question.id}`}>
          <div key={question.id} className="questionCard">
              <h3>{question.question_name}</h3>
              <h4 id="descriptiontitle">Question Description</h4>
              <p>{question.question}</p>
              <div className="responses">
                  <div className="user_1Response">
                      <p>{`test's Argument'`}</p>
                      {question.user1_response}
                      <p>{`Up Votes: ${question.user1_upvotes}`}</p>
                  </div>
                  <div className="user_2Response">
                      {question.user2_response}
                      <p>{`Up Votes: ${question.user2_upvotes}`}</p>
                  </div>
              </div>
          </div>
        </NavLink>
        ))}
        </div>
    </div>
  ) : (<div></div>)
}

export default MainQuestionsBox;
