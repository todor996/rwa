import React from 'react'

export default function AddProduct(props){
    return  <button className="btn btn-primary"
    onClick={()=> props.addToCart(props.product)}
    > <span className="glyphicon glyphicon-shopping-cart"></span>  Add to cart  ({
         (props.cartItem&&props.cartItem.quantity)||0
    })</button>
}