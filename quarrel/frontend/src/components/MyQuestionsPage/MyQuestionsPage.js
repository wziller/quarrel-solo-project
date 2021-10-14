
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { getOneUserCompletedQuestions } from "../../store/questions";
import { getOneUserActiveQuestions } from "../../store/questions";
import { getOneUserPendingQuestions } from "../../store/questions";
import { getUsers } from '../../store/users';
import { getVotes } from "../../store/votes";
import DeleteQuestionModal from "../DeleteQuestionModal";
import ResponseFormModal from "../ResponseFormModal";
import "./MyQuestionsModal.css";

function MyQuestionsPage() {
  const dispatch = useDispatch();
  const votes = useSelector((state) => state.votes.list)
  const questions = useSelector((state) => state.questions.list);
  const sessionUser = useSelector((state) => state.session.user);
  const {id} = useSelector((state) => state.session.user)
  const completedQuestions = useSelector((state) => state.questions.completed);
  const activeQuestions = useSelector((state) => state.questions.active);
  const pendingQuestions = useSelector((state) => state.questions.pending);

  questions.forEach(question =>{
    const id  = question.id
    votes.forEach(vote => {
      if(vote.question_id === id && vote.user1_vote === true) question.user1_upvotes += 1
      if(vote.question_id === id && vote.user2_vote === true) question.user2_upvotes += 1
    })
  })


  useEffect(() => {
    dispatch(getOneUserCompletedQuestions(id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOneUserActiveQuestions(id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOneUserPendingQuestions(id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getVotes());
  }, [dispatch]);

  useEffect(()=> {
    dispatch(getUsers())
  },[dispatch])

  return completedQuestions && activeQuestions && pendingQuestions?(
    <div>
      <div><h1>My Questions</h1></div>
      <h2>Pending Questions</h2>
      {pendingQuestions.map(question=>(
          <div key={question.id}>
            <div className="MQPendingQuestionCard">
              <h3>{question.question_name}</h3>
              <button>respond</button>
              <h5>Question Description:</h5>
              <p>{question.question}</p>
            </div>
          </div>
          ))}
      <h2>Active Questions</h2>
        {activeQuestions.map(question=>(
          <div key={question.id}>
            <div className="MQActiveQuestionCard">
              <h3>{question.question_name}</h3>
              <ResponseFormModal questionId={question.id} />
              <DeleteQuestionModal questionId={question.id} />
              <h5>Question Description:</h5>
              <p>{question.question}</p>
            </div>
          </div>
        ))}
      <h2>Completed Questions</h2>
      {completedQuestions.map(question=>(
          <div key={question.id}>
            <div className="MQCompletedQuestionCard">
              <h3>{question.question_name}</h3>
              <button>edit</button>
              <button>delete</button>
              <h5>Question Description:</h5>
              <p>{question.question}</p>
            </div>
          </div>
          ))}
    </div>
  ) : (<div>
    <p>User Questions Not Found</p>
  </div>)
}

export default MyQuestionsPage;
