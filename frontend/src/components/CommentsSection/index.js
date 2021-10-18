import CommentForm from "./CommentForm";
import CommentsSection from "./CommentsSection";
import './CommentsSection.css'

const CommentsBox = ({ userId, questionId,changeStateFunc }) => {
  return (
    <div id='mainCommentContainer'>
      <div id="commentInputContainer">
        <CommentForm userId={userId} questionId={questionId} changeStateFunc={changeStateFunc} />
      </div>
      <div id='commentSectionContainer'>
        <CommentsSection userId={userId} questionId={questionId} />
      </div>
    </div>
  );
};

export default CommentsBox;
