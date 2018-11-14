import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';

class SearchBar extends Component {
    render(){
        return (
                <Row className="SearchBarContainer sticky-top">
                    <Col className="children-along-bot">
                        <h1 className="title-header">
                            The Liquor Journal
                        </h1>
                    </Col>
                </Row>
        );
    }
};

export {SearchBar};