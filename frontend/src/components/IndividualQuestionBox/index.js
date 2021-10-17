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
import UpvotesDisplay from "../Upvotes";
import CommentsBox from "../CommentsSection";
import "./IndividualQuestionBox.css";

function IndividualQuestionBox() {
  const { id } = useParams();
  const questionId = id;
  const dispatch = useDispatch();
  const votes = useSelector((state) => state.votes.list);
  const users = useSelector((state) => state.users.list);
  const currentQuestion = useSelector((state) => state?.questions?.list)
  const question = currentQuestion[0]
  const sessionUser = useSelector((state) => state.session.user);
  const user_id = sessionUser.id;
  useEffect(() => {
    dispatch(getOneQuestion(questionId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

   return question? (
    <div id="IndividualQuestionContainer">
      <h2>Question</h2>
      <div key={question?.id} className="questionCard">
        <div >
          <h3>{question.question_name}</h3>
          <h4 id="descriptiontitle">Question Description</h4>
          <p>{question.question}</p>
          <div className="responses">
            <div className="user_1Response">
              {question.user1_response}
            </div>
            <div className="user_2Response">
              {question.user2_response}
            </div>
          </div>
        </div>
      </div>
      <h2 id="commenttitle">Comments</h2>
      {sessionUser ? <UpvotesDisplay questionId={question.id} userId={sessionUser.id} /> : <p>Login to see voting</p>}
      <CommentsBox userId={user_id} questionId={questionId} />
    </div>
  ) : (<div><p>Error question not found</p></div>);
}

export default IndividualQuestionBox;
