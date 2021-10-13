import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { getOneQuestion } from "../../store/questions";
import { getQuestions } from "../../store/questions";
import { getUsers } from "../../store/users";
import { getComments } from "../../store/comments";
import { getVotes } from "../../store/votes";
import "./IndividualQuestionBox.css";

function IndividualQuestionBox() {
  const { questionId } = useParams();
  const dispatch = useDispatch();
  const votes = useSelector((state) => state.votes.list);
  const questions = useSelector((state) => state.questions.list);
  const question = questions.find((question) => question.id === questionId);
  const sessionUser = useSelector((state) => state.session.user);
  questions.forEach((question) => {
    const id = question.id;
    votes.forEach((vote) => {
      if (vote.question_id === questionId && vote.user1_vote === true)
        question.user1_upvotes += 1;
      if (vote.question_id === questionId && vote.user2_vote === true)
        question.user2_upvotes += 1;
    });
  });

  useEffect(() => {
    console.log("right here")
    dispatch(getOneQuestion(questionId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getVotes());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div id="IndividualQuestionContainer">
      <h2>Question</h2>
      <div>
        <div key={question.id} className="questionCard">
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
      </div>
    </div>
  );
}

export default IndividualQuestionBox;
