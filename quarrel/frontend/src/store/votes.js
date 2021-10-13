import { bindActionCreators } from "redux";

const LOAD = "votes/LOAD";
const LOAD_ONE = "votes/LOAD_ONE"
const ADD_ONE = "votes/ADD_ONE";

const load = (list) => ({
    type: LOAD,
    list,
  });
  const initialState = {
    list: [],
  };
  export const getVotes = () => async (dispatch) => {

    const response = await fetch(`/api/votes`);
    if (response.ok) {
      const allVotesList = await response.json();
      dispatch(load(allVotesList));
    }
  };

  const votesReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD: {
        return {
          ...state,
          list:action.list,
        };
      }
      default:
        return state;
    }
  };
  export default votesReducer;
