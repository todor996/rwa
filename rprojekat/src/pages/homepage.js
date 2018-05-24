import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/products';
import ProductListing from '../features/product-listing'

class HomePage extends Component{
componentDidMount(){
this.props.fetchProducts();
}

render() {
        
    
    if(this.props.products !==[]) {
        return <div>
        <h2>HomePage</h2>
        <ProductListing products={this.props.products} />
    </div>
    }
}
}



const mapStateToProps = state => {
    return {
        products: state.products.products,
        loading: state.products.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProducts: () => dispatch(actions.fetchProducts())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomePage);
