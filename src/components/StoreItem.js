import React from 'react';
import {Row, Col} from 'reactstrap';
import PropTypes from 'prop-types';

const StoreItem = (props) =>{
    return(
        <Row>
            <Col lg="5">{props.name}</Col>
            <Col lg="5">{props.address}</Col>
            <Col lg="2">Distance (m): {props.distance}</Col>
        </Row>
    )
}

StoreItem.propTypes = {
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    distance: PropTypes.number
}
export {StoreItem};