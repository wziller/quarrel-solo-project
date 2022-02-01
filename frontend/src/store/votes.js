import { bindActionCreators } from "redux";
import { csrfFetch } from "./csrf";

const LOAD = "votes/LOAD";
const LOAD_ONE = "votes/LOAD_ONE";
const ADD_ONE = "votes/ADD_ONE";
const LOAD_USER_VOTE = "votes/LOAD_USER_VOTE"
const REMOVE_VOTE = "votes/REMOVE_VOTE";
const UPDATE_VOTE = "votes/UPDATE_VOTE";
const LOAD_UPVOTES = "votes/LOAD_UPVOTES"

const load = (sorted, list) => ({
  type: LOAD,
  list,
  sorted
});
const initialState = {
  list: [],
};

const remove = (voteId) => ({
  type: REMOVE_VOTE,
  voteId
});

const update = (vote) => ({
  type: UPDATE_VOTE,
  vote,
});

const loadUserVote = (vote) => ({
  type: LOAD_USER_VOTE,
  vote,
})

const addOneVote = (vote) => ({
  type: ADD_ONE,
  vote,
});

const loadUpvotes = (payload) => ({
  type: LOAD_UPVOTES,
  payload,
})

export const getVotes = () => async (dispatch) => {
  const response = await fetch(`/api/votes`);
  if (response.ok) {
    const allVotesList = await response.json();
    const newVotesList = {};
    allVotesList?.forEach((vote) => {
      !newVotesList[vote.question_id] ? (newVotesList[vote.question_id] = {
          user1: 0,
          user2: 0,
        }) && (newVotesList[vote.question_id][vote.vote] = 1) : newVotesList[vote.question_id][vote.vote] += 1;
    });
    await dispatch(load(newVotesList, allVotesList));
  }
};

export const getUpvotes = (questionId, userId) => async (dispatch) =>{
  const response = await csrfFetch(`/api/upvotes/question/${questionId}/user/${userId}`)
  const upVotesData = await response.json()
  dispatch(loadUpvotes(upVotesData));
}

export const createVote = (newVote) => async (dispatch) => {
  const response = await csrfFetch(`/api/votes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newVote),
  });

  if (response.ok) {
    const newVote = await response.json();
    dispatch(addOneVote(newVote));
    return newVote;
  }
};

export const getUserVote = (questionId, userId) => async (dispatch) => {
  const response = await fetch(`/api/votes/question/${questionId}/user/${userId}`);
  if (response.ok) {
    const vote = await response.json();
    dispatch(loadUserVote(vote[0]));
  }
};

export const updateVote = (vote) => async (dispatch) => {
  vote.vote === 'user1' ? vote.vote = 'user2' : vote.vote = 'user1'

  const response = await csrfFetch(`/api/votes/${vote.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vote),
  });
  if (response.ok) {
    const newVote = await response.json();
    dispatch(update(newVote));
    return newVote
  }
};

export const deleteVote = (id) => async (dispatch) => {

  const response = await fetch(`/api/votes/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const deletedVote = await response.json();
    dispatch(remove( deletedVote));
  }
};

const votesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      return {
        ...state,
        list: action.list,
        sorted: action.sorted
      };
    }
    case REMOVE_VOTE: {
      const newState = { ...state };
      delete newState[action.voteId];
      return newState;
    }
    case UPDATE_VOTE: {
      return {
        ...state,
        [action.vote.id]: action.vote,
      };
    }
    case LOAD_USER_VOTE: {
      return {
        ...state,
        userVote: action.vote,
      };
    }
    case LOAD_UPVOTES: {
      return{
        ...state,
        currentUpvotes: action.payload
      }
    }
    case ADD_ONE: {
      if (!state[action.vote.id]) {
        const newState = {
          ...state,
          [action.vote.id]: action.vote,
        };
        const voteList = newState.list.map((id) => newState[id]);
        voteList.push(action.vote);
        return newState;
      }
      return {
        ...state,
        [action.vote.id]: {
          ...state[action.vote.id],
          ...action.vote,
        },
      };
    }
    default:
      return state;
  }
};
export default votesReducer;
