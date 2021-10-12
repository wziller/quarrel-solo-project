import { bindActionCreators } from "redux";

const LOAD = "comments/LOAD";
const LOAD_ONE = "comments/LOAD_ONE"
const ADD_ONE = "comments/ADD_ONE";

const load = (comments) => ({
    type: LOAD,
    comments,
  });

  export const getComments = (id) => async (dispatch) => {
    const response = await fetch(`/api/comments/${id}`);
    if (response.ok) {
      const allCommentsList = await response.json();

      dispatch(load(allCommentsList));
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
