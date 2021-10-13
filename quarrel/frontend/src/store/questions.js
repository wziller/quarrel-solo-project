import { bindActionCreators } from "redux";
import { csrfFetch } from './csrf';

const LOAD = "questions/LOAD";
const ADD_ONE = "questions/ADD_ONE";
const LOAD_CATEGORIES = "questions/LOAD_CATEGORIES"

const load = (list) => ({
  type: LOAD,
  list,
});

const loadCategories = categories => ({
  type: LOAD_CATEGORIES,
  categories:categories,
});

const addOneQuestion = question => ({
  type: ADD_ONE,
  question,
});

export const createQuestion = (newQuestion) => async dispatch => {
  const response = await csrfFetch(`/api/questions/`,{
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(newQuestion)
  });

  if (response.ok) {
    const newQuestion = await response.json();
    dispatch(addOneQuestion(newQuestion));
    return newQuestion
  }
}


export const getQuestions = () => async (dispatch) => {
  const response = await fetch(`/api/questions`);
  if (response.ok) {
    const allQuestionsList = await response.json();

    dispatch(load(allQuestionsList));
  }
};

export const getOneQuestion = (id) => async (dispatch) => {
  const response = await fetch(`/api/questions/${id}`);
  if (response.ok) {
    const question = await response.json();
    dispatch(load(question));
  }
};

export const getCategories = () => async (dispatch) => {
  const response = await fetch(`/api/categories`);
  if (response.ok) {
    console.log("categories thunk")
  const data = await response.json()
  dispatch(loadCategories(data));
  }
};

const initialState = {
  list: [],
  categories: [],
};

const sortList = (list) => {
  return list
    .sort((questionA, questionB) => {
      return questionA.createdAt - questionB.createdAt;
    })
    .map((question) => question.id);
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      return {
        ...state,
        list:action.list,
      };
    }
    case LOAD_CATEGORIES: {
      return {
        ...state,
        categories: action.categories,
      };
    }
    case ADD_ONE: {
      if (!state[action.question.id]) {
        const newState = {
          ...state,
          [action.question.id]: action.question,
        };
        const questionList = newState.list.map((id) => newState[id]);
        questionList.push(action.question);
        newState.list = sortList(questionList);
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
