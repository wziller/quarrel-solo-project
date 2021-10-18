import { bindActionCreators } from "redux";
import { csrfFetch } from "./csrf";

const LOAD = "comments/LOAD";
const LOAD_ONE = "comments/LOAD_ONE"
const ADD_ONE = "comments/ADD_ONE";

const load = (comments) => ({
    type: LOAD,
    comments,
  });

  const addOneComment = (comments) => ({
    type: ADD_ONE,
    comments,
  });

  export const getComments = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${id}`);
    if (response.ok) {
      const allCommentsList = await response.json();

      dispatch(load(allCommentsList));
    }
  };

  export const createComment = (newComment) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    });

    if (response.ok) {
      const newComment = await response.json();
      dispatch(addOneComment(newComment));
      return newComment;
    }
  };

  export const deleteComment = (id) => async (dispatch) => {
    console.log(id)
    let deleteId = id.commentId;
    const response = await csrfFetch(`/api/comments/${deleteId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // const deletedComment = await response.json();
      // return deletedComment;
    }
  };

  export const editComment = ({updatedComment}) => async (dispatch) => {

    const comment_id = updatedComment.comment_id;
    const body = updatedComment.body;
    const response = await csrfFetch(`/api/comments/${comment_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({body}),
    });
    if (response.ok) {
      const newComment = await response.json();
      dispatch(addOneComment(newComment));
      return newComment
    }
  };

  const initialState = {
    comments: [],
  };

  const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD: {
        return {
          ...state,
          comments:action.comments,
        };
      }

      default:
        return state;
    }
  };
  export default commentsReducer;
