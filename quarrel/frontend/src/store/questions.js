const LOAD = 'questions/LOAD';
const LOAD_VOTES = 'questions/LOAD_VOTES';
const ADD_ONE = 'questions/ADD_ONE';

    const load = list => ({
        type: LOAD,
        list,
    });

  const addOneQuestion = question => ({
    type: ADD_ONE,
    question,
  });

  export const getQuestions = () => async dispatch => {
    const response = await fetch(`/api/questions`);

    if (response.ok) {
      const allQuestionsList = await response.json();
      dispatch(load(allQuestionsList));
    }
  };

  export const getOneQuestion = (id) => async dispatch => {
    const response = await fetch(`/api/question/${id}`);

    if (response.ok) {
      const question = await response.json();
      dispatch(addOneQuestion(question));
    }
  };

  const initialState = {
    list: [],
    types: []
  };

  const sortList = (list) => {
    return list.sort((questionA, questionB) => {
      return questionA.createdAt - questionB.createdAt;
    }).map((question) => question.id);
  };

  const questionReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD: {
        const allQuestions = {};
        action.list.forEach(question => {
          allQuestions[question.id] = question;
        });
        return {
          ...allQuestions,
          ...state,
          list: sortList(action.list),
        };
      }
      case ADD_ONE: {
        if (!state[action.question.id]) {
          const newState = {
            ...state,
            [action.question.id]: action.question
          };
          const questionList = newState.list.map(id => newState[id]);
          questionList.push(action.question);
          newState.list = sortList(questionList);
          return newState;
        }
        return {
          ...state,
          [action.question.id]: {
            ...state[action.question.id],
            ...action.question,
          }
        };
      }
      default:
        return state;
    }
  }
  export default questionReducer;
