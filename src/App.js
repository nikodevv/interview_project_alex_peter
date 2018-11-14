import React, {Component} from 'react';
import {Container, Row} from 'reactstrap';
import {SearchBarRow} from './components/SearchBar'

class App extends Component {
    render(){
        return (
            <Container>
                <SearchBarRow/>
                <div className="test-sizing"></div>
            </Container>
        );
    }
};

export {App}