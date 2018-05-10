import React from 'react'
import ProductListing from '../features/product-listing'
import data from '../data/products.json'


export default function HomePage(props){
    return <div>
        <h2>HomePage</h2>
        <ProductListing products={data.products} />
    </div>
}