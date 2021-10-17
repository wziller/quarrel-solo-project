import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { getOneQuestion } from "../../store/questions";
import { getUsers } from "../../store/users";
import commentsReducer, { getComments } from "../../store/comments";
import { getVotes } from "../../store/votes";
import DeleteCommentModal from "../DeleteCommentModal";
import EditCommentModal from "../EditCommentModal";
import "./CommentsSection.css";

function CommentsSection({id, questionId}) {

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);
  const comments = useSelector((state) => state.comments.comments);
  const question = useSelector((state) => state.questions.list);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getOneQuestion(questionId));
  }, [dispatch]);
  useEffect(() => {
    dispatch(getComments(questionId));
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getVotes());
  // }, [dispatch]);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

   return question ? (
      <div>
        {comments.map(comment=>(
          <div key={comment?.id} className="commentCard">
            <div className="commentbody">
              <p>Posted By:</p>
              <p>{users?.find(user=>user?.id === comment.user_id)?.username}</p>
              <p>{comment.body}</p>
              {comment.user_id === sessionUser.id ? <DeleteCommentModal commentId={comment.id} /> : <div></div>}
              {comment.user_id === sessionUser.id ? <EditCommentModal commentId={comment.id} commentBody={comment.body} /> : <div></div>}
            </div>
          </div>
        ))}
      </div>
  ) : (<div><p>Error question not found</p></div>);
}

export default CommentsSection;
