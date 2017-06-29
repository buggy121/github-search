/* @flow */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { orderBy } from 'lodash';

import * as resultsActions from '../redux/actions/githubResults';
import ResultsTH from './ResultsTH';
import RenderResults from './RenderResults';
import PaginationBlock from './PaginationBlock';


class ResultsTable extends React.Component {
  constructor() {
    super();
    (this/* :any */).sortBy = this.sortBy.bind(this);
  }
  sortBy(e) {
    e.preventDefault();
    const id = e.currentTarget.getAttribute('data-id');
    let order;
    if (id === this.props.results.sortBy && this.props.results.sortOrder === 'desc') {
      order = 'asc';
    } else {
      order = 'desc';
    }
    switch (id) {
      case 'owner':
        this.props.actions.results
          .saveResults(orderBy(this.props.results.items, i => i.owner.login, order));
        this.props.actions.results
          .setSorting(id, order);
        break;
      default:
        this.props.actions.results
          .saveResults(orderBy(this.props.results.items, id, order));
        this.props.actions.results
          .setSorting(id, order);
        break;
    }
  }
  render() {
    return (
      <div className="results-table">
        <Table responsive>
          <thead>
            <tr>
              <ResultsTH id="id" title="ID" onClick={this.sortBy} />
              <ResultsTH id="name" title="Repo Title" onClick={this.sortBy} />
              <ResultsTH id="owner" title="Owner" onClick={this.sortBy} />
              <ResultsTH id="stargazers_count" title="Stars" onClick={this.sortBy} />
              <ResultsTH id="created_at" title="Created at" onClick={this.sortBy} />
            </tr>
          </thead>
          <RenderResults />
        </Table>
        <PaginationBlock />
      </div>
    );
  }
}

ResultsTable.propTypes = {
  results: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  actions: PropTypes.shape({
    results: PropTypes.objectOf(PropTypes.func),
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
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsTable);
