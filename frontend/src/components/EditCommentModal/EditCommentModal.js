import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editComment } from "../../store/comments";
import "./EditCommentModal.css";

function EditCommentButton({ showModal, commentId, existingCommentBody, changeStateFunc }) {

  const dispatch = useDispatch();
  const [body, setBody] = useState(existingCommentBody);
  const [comment_id] = useState(commentId);
  const updateBody = (e) => setBody(e.target.value);

  const handleCancelClick = (e) => {
    e.preventDefault();
    showModal(false);
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    changeStateFunc(commentId.id)
    const updatedComment = {
      comment_id,
      body,
    };
    showModal(false)
    dispatch(editComment({ updatedComment }));
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
