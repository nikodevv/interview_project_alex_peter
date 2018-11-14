import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import PropTypes from 'prop-types';
import $ from 'jquery';
import {API_KEY} from '../misc/API_KEY';
import { format } from 'util';
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
                <AlcoholItem 
                    key={data.id} name={data.name} thumb={data.image_thumb_url}
                    price={data.price_in_cents}    
                />
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
    /**
     * Formats price to $0.00
     * @param {String} price - Price of item in cents 
     */
    const formatPrice = (price) =>{
        price = String(price);
        let formattedPrice = "$"+price.substr(0,2) + "." + price.substr(2,price.length-1);
        while (formattedPrice.length<6){
            formattedPrice += "0"
        };
        return formattedPrice
    };
    
    return(
        <Row>
            <Col lg="1"><img src={props.thumb} className="booze-thumbnail item"/></Col>
            <Col lg="10" className="alcohol-text item">{props.name}</Col>
            <Col lg="auto" className="alcohol-text">{formatPrice(props.price)}</Col>
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