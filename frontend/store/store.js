import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from '../reducers/root_reducer';


const configureStore = (preloadedState = {}) => {
  const middlewareEnhancer = applyMiddleware(thunk,logger);
  const composedEnhancer=composeWithDevTools(middlewareEnhancer);

return(
  createStore(
    rootReducer,
    preloadedState,
    composedEnhancer
  )
)
  };

export default configureStore;
