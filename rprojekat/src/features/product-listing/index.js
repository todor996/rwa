import React from 'react'
import ProductListItem from './product-list-item'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/actionType'

function ProductListing(props){
    return <div className="product-listing">
        {
            
        props.products.map(product=>
            <ProductListItem product={product}
            key={props.id}
            addToCart={props.addToCart}
            removeFromCart={props.removeFromCart}
            cartItem={props.cart.filter(cartItem=>cartItem.id===product.id)[0]}
            />)
        }
    </div>
}

function mapStateToProps(state) {
    return {
        cart: state.cart,
        products: state.products.products
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addToCart: (item)=>{
            dispatch({ type: actions.ADD, payload: item})
        },
        removeFromCart: (item)=>{
            dispatch({ type: actions.REMOVE, payload: item})
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductListing)