import React, {Component} from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import {API_KEY} from '../misc/API_KEY';
import {AlcoholItem} from './AlcoholItem';
import {StoreItem} from './StoreItem';

/**
 * A list of alcohol and store items.
 */
class AlcoholList extends Component{
    constructor(props){
        super(props);
        this.state = {
            listType: "alcoholItem",
            loadedItems: []
        };
        this.buildListItem = this.buildListItem.bind(this);
    };
    
    /**
     * Abstract factory that either creates an AlcoholItem 
     * or a StoreItem based on this.state.listType
     * @param {Object} data - all data relating to a
     * particular object that is returned from LCBO query
     * @return {Function} - a React functional component.
     */
    buildListItem(data){
        //constructs an Alcohol Item and saves to state
        const buildAlcoholItem = (data) => {
            let newLoadedItems = this.state.loadedItems.slice();
            newLoadedItems.push(
                <AlcoholItem key={data.id} name={data.name} 
                thumb={data.image_thumb_url} price={data.price_in_cents} 
                onClick={()=>{this.onProductClick(data.id)}}/>
            );
            this.setState(Object.assign({}, {loadedItems: newLoadedItems}));
        };
    
        // constructs a StoreItem and saves to state
        const buildStoreItem = (data) => {
            let newLoadedItems = this.state.loadedItems.slice();
            newLoadedItems.push(
                <StoreItem/>
            )
            this.setState(Object.assign({}, {loadedItems: newLoadedItems}));
        }
        // figures out what kind of item should be constructed
        // based on property of data paramater
        if (data.hasOwnProperty("price_in_cents")){
            buildAlcoholItem(data);
        }
        else if (data.hasOwnProperty("latitude")){
            buildStoreItem(data)
        }
    };

    /**
     * Makes API call to LCBO for desired product.
     * and calls abstract factory function with
     * returned data to create appropriate list type.
     * @param {string} str_ - Search string for query
     */
    getItems(str_){
        $.ajax({
            url: `//lcboapi.com/products?q=${str_}`,
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

    setStoreItemData(id){
        
        $.ajax({
            url: `//lcboapi.com/stores?product_id=${id}&${this.getCoordQuery()}`,
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

    getCoordQuery(){
        let lat= "43.6543",  long = "-79.7132";
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) =>{
                lat = position.coords.latitude;
                long = position.coords.longtitude;
            });
        }
        else{
            alert("Geolocation not supported. Using Toronto core as your location");
        };
        return (`lat=${lat}`+`&lon=${long}`);
    };
    
    /**
     * On click handler that toggles on store list 
     * in this.state and clear list.
     */
    onProductClick(id){
        this.setState({loadedItems:[], listType:"storeList"});
        this.setStoreItemData(id);
    };

    componentDidUpdate(prevProps) {
        if (this.props.searchStr !== prevProps.searchStr) {
            this.getItems(this.props.searchStr);
            this.setState({loadedItems:[], listType: "alcoholItem"})
        };
    }

    render () {
        return (
            <div>{this.state.loadedItems}</div>
        );
    };
};

AlcoholList.propTypes = {
    /**
     * String used to generate API query string.
     * Initial prop is expected to be null.
     */
    searchStr: PropTypes.string
}

export {AlcoholList};