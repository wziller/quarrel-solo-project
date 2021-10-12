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
  console.log(questions)
  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);
  return (
    <div id="mainQuestionsContainer">
      {questions.map((question) => {
        <p key={question.id}>{question.question_name}</p>;
      })}
    </div>
  );
}

export default MainQuestionsBox;
