/* @flow */

import github from 'octonode';
import qs from 'querystring';
import config from './githubConfig';

import store from './redux/store';
import * as clientActions from './redux/actions/githubClient';
import * as resultsActions from './redux/actions/githubResults';

export function initClient() {
  const client = github.client(config);
  store.dispatch(clientActions.storeClientHandle(client));
}

export function login() {
  const url = github.auth
    .config(config)
    .login([]);
  const token = url.match(/&state=([0-9a-z]{32})/i);
  store.dispatch(clientActions.setStateToken(token[1]));
  store.dispatch(clientActions.toggleAccessTokenUsed(false));
  window.location.href = url;
}

function getUserInfo(token) {
  fetch(`http://localhost:3001/api/auth/${token}`)
    .then(res => res.json())
    .then((json) => {
      console.log(json);
      if (!json.result) {
        alert(`Error while updating profile data: ${json.error}`);
      } else {
        store.dispatch(clientActions.setUserID(json.result.id));
        store.dispatch(clientActions.setUserName(json.result.login));
      }
    });
}

export function auth(query) {
  const queryValues = qs.parse(query);
  if (typeof queryValues.state !== 'undefined'
    && queryValues.state === store.getState().githubClient.stateToken
    && !store.getState().githubClient.accessTokenUsed) {
    store.dispatch(clientActions.setAccessToken(queryValues.code));
    store.dispatch(clientActions.toggleAccessTokenUsed(true));
    getUserInfo(queryValues.code);
  }
}

export function search(query /* : string */) {
  if (!store.getState().githubClient.client) {
    initClient();
  }
  store.getState()
    .githubClient
    .client
    .search()
    .repos({
      q: query,
      per_page: 100,
    }, (error, results) => {
      if (!error) {
        store.dispatch(resultsActions.saveResults(Object.values(results.items)));
        store.dispatch(resultsActions.setTotalCount(results.total_count));
        store.dispatch(resultsActions.setPage(1));
        store.dispatch(resultsActions.setSorting('', 'desc'));
      } else {
        console.log(error);
      }
    });
}
