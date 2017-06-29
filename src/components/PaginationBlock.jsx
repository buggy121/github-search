/* @flow */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormGroup, FormControl, ControlLabel, Pagination, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import * as resultsActions from '../redux/actions/githubResults';
import * as clientActions from '../redux/actions/githubClient';
import * as API from '../GithubAPI';

const numberOptions = [5, 10, 15, 20];

function logIn(e) {
  e.preventDefault();
  API.login();
}

class PaginationBlock extends React.Component {
  constructor() {
    super();
    (this/* :any */).changeItemsPerPage = this.changeItemsPerPage.bind(this);
    (this/* :any */).logout = this.logout.bind(this);
  }
  changeItemsPerPage(e) {
    this.props.actions.results.setItemsPerPage(e.currentTarget.value);
  }
  logout() {
    this.props.actions.client.setUserID(-1);
  }
  render() {
    let pages = Math.ceil(this.props.results.items.length / this.props.results.itemsPerPage);
    if (pages === 0) {
      pages = 1;
    }
    return (
      <div id="pagination-block">
        <FormGroup className="pull-left">
          <ControlLabel>Rows per page</ControlLabel>
          <FormControl
            componentClass="select"
            value={this.props.results.itemsPerPage}
            onChange={this.changeItemsPerPage}
          >
            {numberOptions.map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </FormControl>
        </FormGroup>
        <Pagination
          className="pull-right"
          prev
          next
          first
          last
          boundaryLinks
          items={pages}
          activePage={this.props.results.page}
          onSelect={this.props.actions.results.setPage}
          maxButtons={5}
        />
        <Col sm={4} smOffset={2} className="text-center">
          {this.props.client.userID === -1 &&
          <button className="btn btn-github" onClick={logIn}>
            <img src="/img/github-logo.png" alt="github logo" />
            Log in with GitHub
          </button>
          }
          {this.props.client.userID !== -1 &&
          <div>
            Logged in as {this.props.client.userName}
            <button className="btn btn-primary" onClick={this.logout}>Logout</button>
          </div>
          }
        </Col>
      </div>
    );
  }
}

PaginationBlock.propTypes = {
  results: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  client: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
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
      results: bindActionCreators(resultsActions, dispatch),
      client: bindActionCreators(clientActions, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginationBlock);
