import React from 'react'

export default function RemoveProduct(props){
    return  <button

    onClick={()=> props.removeFromCart(props.cartItem)}
    > Remove from cart </button>
}