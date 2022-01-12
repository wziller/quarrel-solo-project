import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneQuestion } from "../../store/questions";
import { getUsers } from "../../store/users";
import UpvotesDisplay from "../Upvotes";
import CommentsBox from "../CommentsSection";
import "./IndividualQuestionBox.css";

function IndividualQuestionBox() {
  const questionId = useParams().id;
  const dispatch = useDispatch();
  const questions = useSelector((state) => state?.questions?.list)
  const question = questions.find((question) => { return question.id == questionId})
  const sessionUser = useSelector((state) => state.session.user);
  const user_id = sessionUser.id;
  const [stateChangedId, setStateChangedId ] = useState('')
  useEffect(async () => {
    dispatch(getOneQuestion(questionId));
  }, [dispatch, stateChangedId]);

  useEffect(async() => {
    dispatch(getUsers());
  }, [dispatch, stateChangedId]);

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
      {sessionUser ? <UpvotesDisplay question={question} userId={sessionUser.id}  /> : <p>Login to see voting</p>}
      <CommentsBox userId={user_id} questionId={questionId} changeStateFunc={setStateChangedId} />
    </div>
  ) : (<div><p>Error question not found</p></div>);
}

export default IndividualQuestionBox;
