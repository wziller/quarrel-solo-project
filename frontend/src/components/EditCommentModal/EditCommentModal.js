import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { editComment } from "../../store/comments";
import { useHistory } from "react-router";
import "./EditCommentModal.css";

function EditCommentButton({ showModal, commentId, existingCommentBody }) {

  const dispatch = useDispatch();
  const history = useHistory();
  const [body, setBody] = useState(existingCommentBody);
  const [comment_id, setcomment_id] = useState(commentId);
  const updateBody = (e) => setBody(e.target.value);

  const handleCancelClick = (e) => {
    e.preventDefault();
    showModal(false);
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    const updatedComment = {
      comment_id,
      body,
    };
    return dispatch(editComment({ updatedComment }));
  };

  return (
    <div>
      <h2>Enter your new comment below</h2>
      <input
        id="commentInput"
        type="text"
        value={body}
        required
        onChange={updateBody}
      />
      <button onClick={handleEditClick}>Submit</button>
      <button onClick={handleCancelClick}>Cancel</button>
    </div>
  );
}

export default EditCommentButton;
