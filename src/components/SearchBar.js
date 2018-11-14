import React from 'react';
import {Row, Col, Input} from 'reactstrap';
import PropTypes from 'prop-types';

/**
* The navbar-like component @ top of page which contains
* the searchbar itself.
*/
const SearchBarRow = (props) => {
    return (
            <Row className="SearchBarContainer sticky-top">
                <Col lg="6"className="children-along-bot">
                    <h1 className="title-header">
                        The Liquor Journal
                    </h1>
                </Col>
                <Col lg="1"/>
                <Col lg="5" className="children-along-bot">
                    <h1><SearchBar eventHandler={props.eventHandler}></SearchBar></h1>
                </Col>
            </Row>
    );
};

const SearchBar = (props) => {
    
    /**
     * A wrapper that calls callback only on
     * certain keypresses.
     * @param {KeyboardEvent} event 
     */
    const callEventHandler = (event) => {
        if (event.key =="Enter"){
            props.eventHandler(event);
        };
    };

    return (
        <Input placeholder="Search for Alcohol" onKeyPress={callEventHandler}/>
    );
};

SearchBarRow.propTypes = {
    /** callback function passed to SearchBar */
    eventHandler: PropTypes.func.isRequired
};

SearchBar.propTypes = {
    /**
     * Callback function that is used to read
     * input box value by parent components.
     */
    eventHandler: PropTypes.func.isRequired
};

export {SearchBarRow};