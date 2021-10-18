import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import {deleteComment} from "../../store/comments"

function DeleteCommentButton({showModal, commentId, changeStateFunc}) {
  const dispatch = useDispatch();

  const handleDeleteClick = (e) => {
    e.preventDefault();
    showModal(false);
    changeStateFunc(commentId.id)
    dispatch(deleteComment({commentId}))
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    showModal(false);
  };

  return (
    <div>
      <h2>Are you sure you want to DELETE this comment?</h2>
      <h3>Deleting comments is permanent!</h3>
      <button onClick={handleDeleteClick}>DELETE</button>
      <button onClick={handleCancelClick}>Cancel</button>
    </div>
  )
}

export default DeleteCommentButton;
