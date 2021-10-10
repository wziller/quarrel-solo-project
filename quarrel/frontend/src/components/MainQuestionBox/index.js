import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { getQuestions } from "../../store/questions";
import "./MainQuestionsBox.css";

function MainQuestionsBox() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.list);
  const sessionUser = useSelector((state) => state.session.user);
  console.log("questions++++++>",questions)
  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);
  return (
    <div id="mainQuestionsContainer">
        <h2>Questions</h2>
        <div>
        {questions.map((question) => (
        <div className="questionCard">
            <h3>{question.question_name}</h3>
            <h4 id="descriptiontitle">Question Description</h4>
            <p>{question.question}</p>
            <div className="responses">
                <div className="user_1Response">
                    {question.user1_response}
                    <p>{`Up Votes: ${question.user1_upvotes}`}</p>
                </div>
                <div className="user_2Response">
                    {question.user2_response}
                    <p>{`Up Votes: ${question.user2_upvotes}`}</p>
                </div>
            </div>
        </div>
        ))}
        </div>
    </div>
  );
}

export default MainQuestionsBox;
