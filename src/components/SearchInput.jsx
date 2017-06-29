/* @flow */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormGroup, FormControl } from 'react-bootstrap';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';

import * as resultsActions from '../redux/actions/githubResults';
import * as clientActions from '../redux/actions/githubClient';
import * as API from '../GithubAPI';

class SearchInput extends React.Component {
  constructor() {
    super();
    (this/* :any */).search = debounce(this.search, 500);
    (this/* :any */).onChange = this.onChange.bind(this);
  }
  onChange(e) {
    const query = e.currentTarget.value;
    this.props.actions.results.setQuery(query);
    this.search(query);
  }
  search(query) { // eslint-disable-line class-methods-use-this
    if (query.length > 3) {
      API.search(query);
    }
  }
  render() {
    return (
      <FormGroup>
        <FormControl
          onChange={this.onChange}
          value={this.props.results.query}
        />
      </FormGroup>
    );
  }
}

SearchInput.propTypes = {
  results: PropTypes.shape({
    query: PropTypes.string.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    results: PropTypes.objectOf(PropTypes.func),
    client: PropTypes.objectOf(PropTypes.func),
  }).isRequired,
};

function mapStateToProps(store) {
  return {
    results: store.githubResults,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      results: bindActionCreators(resultsActions, dispatch),
      client: bindActionCreators(clientActions, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
