/* @flow */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import url from 'url';

import SearchInput from './components/SearchInput';
import ResultsTable from './components/ResultsTable';
import * as clientActions from './redux/actions/githubClient';
import * as API from './GithubAPI';
import './css/App.css';

class App extends React.Component {
  componentWillMount() {
    this.props.actions.client.storeClientHandle(null);
    const parsedUrl = url.parse(window.location.href);
    console.log(parsedUrl);
    if (parsedUrl.pathname === '/auth') {
      console.log('log in');
      API.auth(parsedUrl.query);
    }
  }
  render() {
    return (
      <div className="container">
        <SearchInput />
        <ResultsTable />
      </div>
    );
  }
}


App.propTypes = {
  actions: PropTypes.shape({
    results: PropTypes.objectOf(PropTypes.func),
    client: PropTypes.objectOf(PropTypes.func),
  }).isRequired,
};

function mapStateToProps(store) {
  return {
    results: store.githubResults,
    client: store.githubClient,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      client: bindActionCreators(clientActions, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

