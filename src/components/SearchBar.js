import React, {Component} from 'react';
import {Row, Col, Form, Input, Label} from 'reactstrap';

class SearchBarRow extends Component {
    render(){
        return (
                <Row className="SearchBarContainer sticky-top">
                    <Col lg="6"className="children-along-bot">
                        <h1 className="title-header">
                            The Liquor Journal
                        </h1>
                    </Col>
                    <Col lg="1"/>
                    <Col lg="5" className="children-along-bot">
                        <h1><SearchBar></SearchBar></h1>
                    </Col>
                </Row>
        );
    }
};
const SearchBar = () => {
    return (
        <Form>
            <Input placeholder="Search for Alcohol"/>
        </Form>
    )
}
export {SearchBarRow};