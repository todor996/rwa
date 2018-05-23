import React from 'react'

export default function RemoveProduct(props){
    return  <button className="btn btn-danger"

    onClick={()=> props.removeFromCart(props.cartItem)}
    > Remove from cart </button>
}