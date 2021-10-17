import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { getQuestions } from "../../store/questions";
import { getUsers } from '../../store/users';
import { getVotes } from "../../store/votes";
import UpvotesDisplay from "../Upvotes";
import "./CategoryQuestionsBox.css";

function MainQuestionsBox() {
  const users = useSelector((state) => state.users.list)
  const dispatch = useDispatch();
  const votes = useSelector((state) => state.votes.list)
  const questions = useSelector((state) => state.questions.list);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getVotes());
  }, [dispatch]);
  useEffect(()=> {
    dispatch(getUsers())
  },[dispatch])

  return Array.isArray(questions) && questions ? (
    <div id="mainQuestionsContainer">
      <h2>Questions</h2>
      <div>
        {questions?.map((question) => {
          if (question.user2_response)
            return (
              <div key={question.id}>
                <NavLink  to={`/questions/${question.id}`}>
                  <div key={question.id} className="questionCard">
                    <h3>{question.question_name}</h3>
                    <h4 id="descriptiontitle">Question Description</h4>
                    <p>{question.question}</p>
                    <div className="responses">
                      <div className="user_1Response">
                        <p>{`${
                          users?.find((user) => user.id === question.user1_id)
                            ?.username
                        } argues:`}</p>
                        {question.user1_response}
                      </div>
                      <div className="user_2Response">
                        <p>{`${
                          users?.find((user) => user.id === question.user2_id)
                            ?.username
                        } argues:`}</p>
                        {question.user2_response}
                      </div>
                    </div>
                  </div>
                </NavLink>
                {sessionUser ? <UpvotesDisplay questionId={question.id} userId={sessionUser.id} /> : <p>Login to see voting</p>}
              </div>
            );
        })}
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default MainQuestionsBox;
