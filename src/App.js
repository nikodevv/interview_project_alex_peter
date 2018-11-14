import React, {Component} from 'react';
import {Container, Row} from 'reactstrap';
import {SearchBarRow} from './components/SearchBar'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {searchStr: null};
        this.getSearchOnEnter = this.getSearchOnEnter.bind(this);
    };

    /**
     * Stores input string to state.
     * @param {KeyboardEvent} e
     */
    getSearchOnEnter(e){
        this.setState({searchStr: e.target.value})
    };

    render(){
        return (
            <Container>
                <SearchBarRow eventHandler={this.getSearchOnEnter}/>
                <Row>{this.state.searchStr}</Row>
            </Container>
        );
    }
};

export {App}