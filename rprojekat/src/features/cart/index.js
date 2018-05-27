import React from 'react'
import {connect } from 'react-redux'
import * as actions from '../../store/actions/actionType'
function sr(a,b){
    return a.id<b.id
    
    
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
                props.cart.sort(sr).map(item=><tr>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>
                        <button className="btn btn-default btn-sm"
                        onClick={(e)=>props.addToCart(item)}
                        ><span class="glyphicon glyphicon-plus"></span> 

                        </button>
                    </td>
                    <td><button className="btn btn-default btn-sm"
                        onClick={(e)=>props.removeFromCart(item)}
                        ><span class="glyphicon glyphicon-minus"></span> 

                        </button></td>
                    <td>
                        <button className="btn btn-default btn-sm"
                        onClick={()=>props.removeAllFromCart(item)}
                        ><span className="glyphicon glyphicon-remove"></span> </button>
                    </td>
                   
                </tr>
                
            
            )
           }  <tr>
                
                <td>
                       <button className="btn btn-default btn-md" 
                        onClick={()=>props.checkOut(props.cart)}>
                       CheckOut</button> 
                </td>
                
            </tr>
          
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
        },
        checkOut:(item)=>{
            dispatch({type:actions.BUY_PRODUCTS,payload:item})
        }
    }

}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)
