import React from 'react'
import {connect } from 'react-redux'
import * as actions from '../../store/actions'
function sort(items){
    return items.sort((a,b)=>{
    a.id<b.id
    })
}


function Cart(props){
    return <table>
        <thead>
            <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th></th>
                <th></th>

            </tr>
        </thead>
        <tbody>
            {
                sort(props.cart).map(item=><tr>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>
                        <button
                        onClick={(e)=>props.addToCart(item)}
                        >+

                        </button>
                    </td>
                    <td><button
                        onClick={(e)=>props.removeFromCart(item)}
                        >-

                        </button></td>
                    <td>
                        <button
                        onClick={()=>props.removeAllFromCart(item)}
                        >Remove all</button>
                    </td>
                </tr>)
            }
        </tbody>
    </table>

        
}
function mapStateToProps(state){
    return {
        cart: state.cart
    }
}

function mapDispatchToProps(dispatch){
    return {
        addToCart: (item)=>{
            dispatch({type:actions.ADD,payload:item})
        },
        removeFromCart: (item)=>{
            dispatch({type:actions.REMOVE,payload:item})
        },
        removeAllFromCart: (item)=>{
            dispatch({type:actions.ALL,payload:item})
        }
    }

}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)
