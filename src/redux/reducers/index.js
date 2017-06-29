import { combineReducers } from 'redux';

import githubResults from './githubResults';
import githubClient from './githubClient';

export default combineReducers({
  githubResults,
  githubClient,
});
