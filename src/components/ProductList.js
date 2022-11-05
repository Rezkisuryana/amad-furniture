import React, { Component } from 'react';
import Product from './Product';
import Title from './Title';
// import {storeProducts} from '../data'
import {ProductConsumer} from '../Context';

class ProductList extends Component {
    // state={
    //     products:storeProducts
    // }
    render() {
        // console.log(this.state.products);
        return (
            <React.Fragment>
                <div className="py-2">
                    <div className="container">
                        <Title name="Our" title="Products"/>
                        <div className="row">
                            <ProductConsumer>
                                {/* Ngetes dari file context.js => <ProductContext.Provider value="Hallo"> */}
                                {value => {
                                    // console.log(value); => hanya untuk ngetes sudha keluar atau belum datanya.
                                    return value.products.map(product => {
                                        return <Product key={product.id} product = {product}/>
                                    })
                                    // fungsi map() adalah untuk pengulangand data karna datanya lebih dari satu
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
            // <div>
            //    h3 Ini Halaman Product List
            // </div>
        );
    }
}

export default ProductList;