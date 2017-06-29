import { compose, createStore } from 'redux';
import persistState from 'redux-localstorage';

import rootReducer from './reducers/index';

const enhancer = compose(
  persistState(),
);

export default createStore(rootReducer, enhancer);
