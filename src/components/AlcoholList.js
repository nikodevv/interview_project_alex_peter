import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import PropTypes from 'prop-types';
import $ from 'jquery';
import {API_KEY} from '../misc/API_KEY';
/**
 * A list of alcohol "Item"s.
 */
class AlcoholList extends Component{
    constructor(props){
        super(props);
        this.state = {loadedItems: []}
    };

    /**
     * Makes API call to LCBO for desired product.
     * and calls abstract factory function with
     * returned data to create appropriate list type.
     * @param {string} str_ - Search string for query
     */
    getItems(str_){
        $.ajax({
            url: `//lcboapi.com/products?name=${str_}`,
            type: 'get',
            dataType: "json",
            headers: {
                'Authorization': `Token token="${API_KEY}"`
            },
            async: true,
            success: (data) => {
                console.log(data)
                data.results.forEach(this.createAlcoholItem);
            }
        });
    };
    componentDidMount(){
        this.getItems()
    }
    createAlcoholItem(){
        let newLoadedItems = this.state.loadedItems.slice();
        this.setState(Object.assign({}, {loadedItems: newLoadedItems}));
    }
    render () {
        return (
            <div>{this.state.loadedItems}</div>
        );
    }
};

const AlcoholItem = (props) =>{
    return(
        <Row>
            <Col>props.name</Col>

        </Row>
    )
};

AlcoholList.propTypes = {
    /**
     * String used to generate API query string.
     * Initial prop is expected to be null.
     */
    searchStr: PropTypes.string
}

export {AlcoholList};