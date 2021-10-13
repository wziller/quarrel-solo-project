import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { getOneQuestion } from "../../store/questions";
import { getQuestions } from "../../store/questions";
import { getUsers } from "../../store/users";
import commentsReducer, { getComments } from "../../store/comments";
import { getVotes } from "../../store/votes";
import "./IndividualQuestionBox.css";

function IndividualQuestionBox() {
  const { id } = useParams();
  const questionId = id;
  const dispatch = useDispatch();
  const votes = useSelector((state) => state.votes.list);
  const users = useSelector((state) => state.users.list);
  const comments = useSelector((state) => state.comments.comments);
  const question = useSelector((state) => state.questions.list)[0];
  const sessionUser = useSelector((state) => state.session.user);
    votes.forEach((vote) => {
      if (vote.question_id === questionId && vote.user1_vote === true)
        question.user1_upvotes += 1;
      if (vote.question_id === questionId && vote.user2_vote === true)
        question.user2_upvotes += 1;
    });

  useEffect(() => {
    dispatch(getOneQuestion(questionId));
  }, [dispatch]);
  useEffect(() => {
    dispatch(getComments(questionId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getVotes());
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
              <p>{`Up Votes: ${question?.user1_upvotes}`}</p>
            </div>
            <div className="user_2Response">
              {question.user2_response}
              <p>{`Up Votes: ${question?.user2_upvotes}`}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2>Comments</h2>
        {comments.map(comment=>(
          <div key={comment?.id} className="commentCard">
            <div className="commentbody">
              <p>Posted By:</p>
              <p>{users?.find(user=>user?.id === comment.user_id)?.username}</p>
              <p>{comment.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (<div><p>Error question not found</p></div>);
}

export default IndividualQuestionBox;
