import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './ResponseForm.css'
import {updateUser2Response} from "../../store/questions"

function ResponseForm({propQuestion, showModal}) {

  const dispatch = useDispatch();
  const [response, setResponse] = useState("");
  const question = propQuestion.question;
  const id = question.id
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser2Response({id, response}))
    showModal(false);
    };

  return (
    <div>
      <h2>{question.question_name}</h2>
      <h3>Question Description</h3>
      <p>{question.question}</p>
      <h3>Opponent's Response</h3>
      <p>{question.user1_response}</p>
      <form onSubmit={handleSubmit}>
        <label>
          What is your argument?
          <input
            type="text"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit Response</button>
      </form>
    </div>
  );
}

export default ResponseForm;
