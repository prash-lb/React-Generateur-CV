import React from 'react';
import PropTypes from 'prop-types';

Filter.propTypes = {
    criteria: PropTypes.string.isRequired,
    setCriteria: PropTypes.func.isRequired
};
/**
 * Composant pour filter
 * @component
 * @param {Object} props -Les props du composant
 * @param {string} criteria - Le critere mis dans le filter
 * @param {function} setCriteria - pour mettre à jour criteria*/

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