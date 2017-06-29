/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/ResultsTH.css';


function ResultsTH(props) {
  return (
    <th>
      <a href="" data-id={props.id} onClick={props.onClick}>
        {props.title}
        {props.results.sortBy === props.id &&
        <div className={props.results.sortOrder === 'asc' ? 'asc' : 'desc'}>
          <img src="/img/chevron-up.png" alt="order" />
        </div>
        }
      </a>
    </th>
  );
}

ResultsTH.propTypes = {
  results: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

function mapStateToProps(store) {
  return {
    results: store.githubResults,
  };
}


export default connect(mapStateToProps)(ResultsTH);
