import { bindActionCreators } from "redux";
import { csrfFetch } from "./csrf";

const LOAD = "questions/LOAD";
const LOAD_ONE = "questions/LOAD_ONE";
const LOAD_COMPLETED = "questions/LOAD_COMPLETED";
const LOAD_ACTIVE = "questions/LOAD_ACTIVE";
const LOAD_PENDING = "questions/LOAD_PENDING";
const ADD_ONE = "questions/ADD_ONE";
const LOAD_CATEGORIES = "questions/LOAD_CATEGORIES";
const LOAD_NEW_QUESTION_TOTALS = "questions/LOAD_NEW_QUESTION_TOTALS"

const load = (list) => ({
  type: LOAD,
  list,
});

const loadOne = (payload) => ({
  type: LOAD_ONE,
  payload,
});

const loadCompleted = (list) => ({
  type: LOAD_COMPLETED,
  list,
});

const loadActive = (list) => ({
  type: LOAD_ACTIVE,
  list,
});

const loadPending = (list) => ({
  type: LOAD_PENDING,
  list,
});

const loadCategories = (categories) => ({
  type: LOAD_CATEGORIES,
  categories: categories,
});

const addOneQuestion = (question) => ({
  type: ADD_ONE,
  question,
});
const loadNewQuestionTotals=(payload) =>({
  type: LOAD_NEW_QUESTION_TOTALS,
  payload
})


export const createQuestion = (newQuestion) => async (dispatch) => {
  const response = await csrfFetch(`/api/questions/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newQuestion),
  });

  if (response.ok) {
    const newQuestion = await response.json();
    dispatch(addOneQuestion(newQuestion));
    return newQuestion;
  }
};

export const deleteQuestion = (id) => async (dispatch) => {
  let deleteId = id.questionId;
  const response = await csrfFetch(`/api/questions/${deleteId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const deletedQuestion = await response.json();
    return deletedQuestion;
  }
};

export const updateUser2Response = (questionId, update) => async (dispatch) => {


  const {id} = questionId;
  const arg = questionId.response;
  const response = await csrfFetch(`/api/questions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({arg}),
  });
  if (response.ok) {
    const newQuestion = await response.json();
    dispatch(addOneQuestion(newQuestion));
    return newQuestion
  }
};

export const getQuestions = (id) => async (dispatch) => {
  const response = await fetch(`/api/questions/all/${id}`);
  if (response.ok) {
    const allQuestionsList = await response.json();
    dispatch(load(allQuestionsList));
  }
};

export const getQuestionsByCategory = (id) => async (dispatch) => {
  const response = await fetch(`/api/questions/category/${id}`);
  if (response.ok) {

    const allQuestionsList = await response.json();

    dispatch(load(allQuestionsList));
  }
};

export const getOneUserCompletedQuestions = (id) => async (dispatch) => {
  const response = await fetch(`/api/myquestions/user/${id}/completed`);
  if (response.ok) {
    const userQuestionsList = await response.json();

    dispatch(loadCompleted(userQuestionsList));
  }
};

export const updateVoteTotals = () => async (dispatch) => {
  const response = await csrfFetch(`/api/updates/updateTotals/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const newQuestionsList = await response.json();

    // dispatch(load(newQuestionsList));
  }
};

export const updateOneQuestionVoteTotals = (questionId) => async (dispatch) => {
  const response = await csrfFetch(`/api/updates/updateTotals/${questionId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const updatedQuestion = await response.json();
    dispatch(loadNewQuestionTotals(updatedQuestion))
  }
};

export const getOneUserActiveQuestions = (id) => async (dispatch) => {
  const response = await fetch(`/api/myquestions/user/${id}/active`);
  if (response.ok) {
    const userQuestionsList = await response.json();

    dispatch(loadActive(userQuestionsList));
  }
};

export const getOneUserPendingQuestions = (id) => async (dispatch) => {
  const response = await fetch(`/api/myquestions/user/${id}/pending`);
  if (response.ok) {
    const userQuestionsList = await response.json();

    dispatch(loadPending(userQuestionsList));
  }
};

export const getOneQuestion = (questionId, userId) => async (dispatch) => {
  const response = await fetch(`/api/questions/question/${questionId}/user/${userId}`);
  if (response.ok) {
    const question = await response.json();
    const res = [question]
    dispatch(loadOne(res));
  }
};

export const getCategories = () => async (dispatch) => {
  const response = await fetch(`/api/categories`);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadCategories(data));
  }
};

const initialState = {
  list: [],
  categories: [],
};


const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      return {
        ...state,
        list: action.list,
      };
    }
    case LOAD_ONE: {
      let currentState = {...state}
      let currentQuestion = currentState.list.find(question=>question.id === action.payload.id)
      console.log("hit==================>",currentQuestion)
      currentQuestion = action.payload
      return{
        ...currentState
      }
    }
    case LOAD_COMPLETED: {
      return {
        ...state,
        completed: action.list,
      };
    }
    case LOAD_ACTIVE: {
      return {
        ...state,
        active: action.list,
      };
    }
    case LOAD_PENDING: {
      return {
        ...state,
        pending: action.list,
      };
    }
    case LOAD_CATEGORIES: {
      return {
        ...state,
        categories: action.categories,
      };
    }
    case LOAD_NEW_QUESTION_TOTALS: {
      let currentState = {...state}

      let currentQuestion = currentState.list.find(question=>question.id === action.payload.id)
      currentQuestion.upVotes.total1 = currentQuestion.user1_upvotes
      currentQuestion.upVotes.total2 = currentQuestion.user2_upvotes
      return{
        ...currentState
      }
    }
    case ADD_ONE: {
      if (!state[action.question.id]) {
        const newState = {
          ...state,
          [action.question.id]: action.question,
        };
        const questionList = newState.list.map((id) => newState[id]);
        questionList.push(action.question);
        // newState.list = sortList(questionList);
        return newState;
      }
      return {
        ...state,
        [action.question.id]: {
          ...state[action.question.id],
          ...action.question,
        },
      };
    }
    default:
      return state;
  }
};
export default questionReducer;
