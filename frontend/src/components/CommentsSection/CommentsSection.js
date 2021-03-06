import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneQuestion } from "../../store/questions";
import { getUsers } from "../../store/users";
import { getComments } from "../../store/comments";
import DeleteCommentModal from "../DeleteCommentModal";
import EditCommentModal from "../EditCommentModal";
import "./CommentsSection.css";

function CommentsSection({id, questionId}) {

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);
  const comments = useSelector((state) => state.comments.comments);
  const question = useSelector((state) => state.questions.list);
  const sessionUser = useSelector((state) => state.session.user);
  const [commentRemovedByID, setCommentRemovedByID] = useState(0)
  useEffect(() => {
    dispatch(getOneQuestion(questionId));
  }, [dispatch, commentRemovedByID, questionId]);

  useEffect(() => {
    dispatch(getComments(questionId));
  }, [dispatch, commentRemovedByID, questionId]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, commentRemovedByID]);

   return question ? (
      <div>
        {comments.map(comment=>(
          <div key={comment?.id} className="commentCard">
            <div className="commentbody">
              <p>Posted By:</p>
              <p>{users?.find(user=>user?.id === comment.user_id)?.username}</p>
              <p>{comment.body}</p>
              {comment.user_id === sessionUser.id ? <DeleteCommentModal commentId={comment.id} changeStateFunc={setCommentRemovedByID} /> : <div></div>}
              {comment.user_id === sessionUser.id ? <EditCommentModal commentId={comment.id} commentBody={comment.body} changeStateFunc={setCommentRemovedByID} /> : <div></div>}
            </div>
          </div>
        ))}
      </div>
  ) : (<div><p>Error question not found</p></div>);
}

export default CommentsSection;
