import React, {Component} from 'react';
import {Container, Row} from 'reactstrap';
import {SearchBar} from './components/SearchBar'

class App extends Component {
    render(){
        return (
            <Container>
                <SearchBar></SearchBar>
                <div className="test-sizing"></div>
            </Container>
        );
    }
};

export {App}