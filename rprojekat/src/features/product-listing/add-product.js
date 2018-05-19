import React from 'react'

export default function AddProduct(props){
    return  <button
    onClick={()=> props.addToCart(props.product)}
    > Add to cart  ({
         (props.cartItem&&props.cartItem.quantity)||0
    })</button>
}