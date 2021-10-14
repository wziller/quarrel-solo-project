import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import {deleteQuestion} from "../../store/questions"

function DeleteQuestionButton({showModal, questionId}) {
  console.log("questionIdButton",questionId)
  const dispatch = useDispatch();

  const handleDeleteClick = (e) => {
    e.preventDefault();

    return (dispatch(deleteQuestion({questionId})))
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    showModal(false);
  };

  return (
    <div>
      <h2>Are you sure you want to DELETE this question?</h2>
      <h3>Deleting Questions is permanent!</h3>
      <button onClick={handleDeleteClick}>DELETE</button>
      <button onClick={handleCancelClick}>Cancel</button>
    </div>
  )
}

export default DeleteQuestionButton;
