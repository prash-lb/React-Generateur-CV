import React from 'react';
import PropTypes from 'prop-types';

Filter.propTypes = {
    criteria: PropTypes.string.isRequired,
    setCriteria: PropTypes.func.isRequired
};

function Filter({criteria,setCriteria}) {
    return (
        <input
        className="form-control"
        placeholder="recherche"
        value={criteria}
        onChange={(e) => setCriteria(e.target.value)}/>
    );
}

export default Filter;