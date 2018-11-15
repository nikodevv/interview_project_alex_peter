import React from 'react';
import {Row, Col} from 'reactstrap';
import PropTypes from 'prop-types';
import { AlcoholList } from './AlcoholList';

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
        <Row onClick={props.onClick}>
            <Col lg="1"><img src={props.thumb} className="booze-thumbnail item"/></Col>
            <Col lg="10" className="alcohol-text item">{props.name}</Col>
            <Col lg="auto" className="alcohol-text">{formatPrice(props.price)}</Col>
        </Row>
    )
};

AlcoholItem.propTypes ={
    thumb: PropTypes.string, // link to thumbnail image
    name: PropTypes.string.isRequired, // name of product
    price: PropTypes.number.isRequired, //price of product in cents
}

export {AlcoholItem};