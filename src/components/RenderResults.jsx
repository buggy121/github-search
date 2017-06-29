/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'moment';


function RenderResults(props) {
  let items = [];
  if (props.results.items.length === 0) {
    return null;
  }
  for (let item = (props.results.itemsPerPage * props.results.page) - props.results.itemsPerPage;
       item < props.results.itemsPerPage * props.results.page;
       item += 1
  ) {
    if (typeof props.results.items[item] === 'undefined') {
      break;
    }
    const obj = props.results.items[item];
    items = [
      ...items,
      <tr key={obj.id} className={props.client.userID === obj.owner.id ? 'active' : ''}>
        <td>{obj.id}</td>
        <td><a href={obj.html_url} target="_blank" rel="noopener noreferrer">{obj.name}</a></td>
        <td>{obj.owner.login}</td>
        <td>{obj.stargazers_count}</td>
        <td>{Moment(obj.created_at).format('YYYY-MM-DD')}</td>
      </tr>,
    ];
  }
  return (
    <tbody>
      {items}
    </tbody>
  );
}

RenderResults.propTypes = {
  results: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  client: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

function mapStateToProps(store) {
  return {
    results: store.githubResults,
    client: store.githubClient,
  };
}

export default connect(mapStateToProps)(RenderResults);
