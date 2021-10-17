import { bindActionCreators } from "redux";

const LOAD = "users/LOAD";

const load = (list) => ({
    type: LOAD,
    list,
  });
  const initialState = {
    list: [],
  };
  export const getUsers = () => async (dispatch) => {

    const response = await fetch(`/api/users/all`);
    if (response.ok) {
      const allUsersList = await response.json();


      dispatch(load(allUsersList));
    }
  };

  const usersReducer = (state = initialState, action) => {
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
  export default usersReducer;
