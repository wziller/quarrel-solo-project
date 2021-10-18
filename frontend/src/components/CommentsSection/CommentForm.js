import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { createComment } from "../../store/comments";
import "./CommentForm.css";

const CommentForm = ({ userId, questionId, changeStateFunc }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [body, setBody] = useState("");
  const [user_id, setUser_id] = useState(userId);
  const [question_id, setquestion_id] = useState(questionId);
  const updateBody = (e) => setBody(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      question_id,
      user_id,
      body,
    };
    changeStateFunc(question_id)
    const createdComment = dispatch(createComment(newComment));
    if (createdComment) {
      setBody("");
      history.push(`/questions/${question_id}`);
    }
  };
  return (
    <form id="comment-form" onSubmit={handleSubmit}>
      <input
        id="commentInput"
        type="text"
        value={body}
        required
        placeholder="Enter your comment here"
        onChange={updateBody}
      />
      <button id="commentSubmit" type="submit">
        Create New Comment
      </button>
    </form>
  );
};

export default CommentForm;
