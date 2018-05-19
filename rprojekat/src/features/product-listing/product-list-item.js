import React from 'react'
import AddProduct from './add-product'
import RemoveProduct from './remove-product'
export default function ProductListItem(props){
    return <div className="product-list-item">
    <h3>{props.product.name}</h3>
    <img  height={100}
    title={props.product.name}
    src={`/products/${props.product.image}`} />
    <div>{props.product.description} </div>
    <div> ${props.product.price}</div>
    <div>
       <AddProduct 
       cartItem={props.cartItem} 
       product={props.product} 
       addToCart={props.addToCart}/>
    {
        props.cartItem
        ? <RemoveProduct
        cartItem={props.cartItem} 
        product={props.product} 
        removeFromCart={props.removeFromCart}/>
        :null
    }
       
    </div>
    </div>

}