import React, {Component} from 'react';
import {Container, Row} from 'reactstrap';
import {SearchBarRow} from './components/SearchBar'
import {AlcoholList} from './components/AlcoholList'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {searchStr: null};
        this.getSearchOnEnter = this.getSearchOnEnter.bind(this);
    };

    /**
     * Callback used to store user input to state.
     * @param {KeyboardEvent} e
     */
    getSearchOnEnter(e){
        this.setState({searchStr: e.target.value})
    };

    render(){
        return (
            <Container>
                <SearchBarRow eventHandler={this.getSearchOnEnter}/>
                <AlcoholList searchStr={this.state.searchStr}></AlcoholList>
            </Container>
        );
    }
};

export {App}