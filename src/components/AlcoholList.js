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
        this.state = {
            listType: "alcoholItem",
            loadedItems: []
        };
        this.buildListItem = this.buildListItem.bind(this)
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
                data.result.forEach(this.buildListItem);
            }
        });
    };

    /**
     * Abstract factory that either creates an AlcoholItem 
     * or a StoreItem based on this.state.listType
     * @param {Object} data - all data relating to a
     * particular object that is returned from LCBO query
     * @return {Function} - a React functional component.
     */
    buildListItem(data){
        const buildAlcoholItem = (data) => {
            let newLoadedItems = this.state.loadedItems.slice();
            newLoadedItems.push(
                <AlcoholItem key={data.id} name={data.name} thumb={data.image_thumb_url}/>
            );
            this.setState(Object.assign({}, {loadedItems: newLoadedItems}));
        };
        if (data.hasOwnProperty("price_in_cents")){
            buildAlcoholItem(data);
        }
    };
    componentDidMount(){
        this.getItems();
    }
    render () {
        return (
            <div>{this.state.loadedItems}</div>
        );
    };
};

const AlcoholItem = (props) =>{
    return(
        <Row className="item">
            <Col lg="1"><img src={props.thumb} className="booze-thumbnail"/></Col>
            <Col className="alcohol-text">{props.name}</Col>
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