import React from 'react';
import PropTypes from 'prop-types';

/**
 * A list of alcohol "Item"s.
 */
const AlcoholList = (props) => {
    return (<p>{props.searchStr}</p>
    );
};

AlcoholList.propTypes = {
    /**
     * String used to generate API query string.
     * Initial prop is expected to be null.
     */
    searchStr: PropTypes.oneOfType([PropTypes.string, null]).isRequired
}

export {AlcoholList};