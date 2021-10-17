import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import usersReducer from './users';
import sessionReducer from './session';
import questionReducer from './questions';
import commentsReducer from './comments';
import votesReducer from './votes'
import { createPortal } from 'react-dom';

const rootReducer = combineReducers({
    session: sessionReducer,
    questions: questionReducer,
    comments:commentsReducer,
    users:usersReducer,
    votes:votesReducer
  });

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };

  export default configureStore;
