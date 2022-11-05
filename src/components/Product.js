import React, { Component } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {ProductConsumer} from '../Context';
import PropTypes from 'prop-types';
import checkmark from '../checkmark.gif';

class Product extends Component {
    render() {
        const {id,title,img,price,inCart} = this.props.product;
        // this.props.product => diambil dari file ProductList.js
        return (
            <ProductWraper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
                <div className="card">
                    {/* alasan menggunakan product Consumer adalah untuk menggunakan / memanggil handel detail */}
                    <ProductConsumer>
                        {value => (
                            <div className="img-container p-2" onClick={() => 
                            value.handleDetail(id)
                            }>
                            <Link to="/details">
                                <div className="img-figure">
                                    <img src={img} alt="product" className="card-img-top"/>
                                </div>
                            </Link>
                            {/* Pruduct Footer  */}
                            <div className="card-footer justify-content-between">
                                <Link to="/details" className="border-none">
                                    <h5 className="align-self-center mb-10 text-bold-title">{title}</h5>
                                </Link>
                                <h6 className="text-blue text-bold font-italic mb-0">
                                    <span className="mr-1">$</span>{price.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                                </h6>
                            </div>     
                            <button className="cart-btn" disabled={inCart ? true : false}
                                onClick={() => {
                                    value.addToCart(id);
                                    value.openModal(id);

                                }}
                            >
                            {inCart ? (
                                <>
                                    <div className="d-flex justify-content-center">
                                        <img src={checkmark} alt="product" className="checkmark"/>
                                        <p className="text-capitalize mb-0 text-button" disabled>{" "} in cart</p>
                                    </div>
                                </>
                            ):(
                                <p className="text-capitalize mb-0 text-button" disabled>{" "} Add to Cart</p>
                            )}
                            </button>
                        </div>    
                        )}
                        
                    </ProductConsumer>
                       
                </div>
            </ProductWraper>
        );
    }
}

export default Product;
// fungsinya untuk memberi tipe data
Product.propTypes = {
    product : PropTypes.shape({
        id : PropTypes.number,
        img : PropTypes.string,
        title : PropTypes.string,
        price : PropTypes.number,
        inCart : PropTypes.bool,  
    }).isRequired
}

const ProductWraper = styled.div`
    .card {
        border-color :1px solid #ddd;
        transition : all 1s linear;
    }
    .card-footer {
        background : transparent;
        border-top: transparent;
        transition : all 1s linear;
    }
    &:hover {
        .card {
            border : 0.04rem solid rgba(0,0,0,0.2);
            box-shadow:2px 2px 5px 0px rgba(0,0,0,0.2);
        }
        .card-footer {
            background : rgba(247,247,247);
        }
    }
    .img-container {
        position : relative;
        overflow:hidden;
    }
    .img-figure {
        overflow:hidden;
    }
    .card-img-top {
        transition : all 1s linear;
    }
    .cart-btn {
        bottom : 0;
        background-color: #fbb710;;
        border : none;
        color : var(--mainWhite);
        font-size : 1.4rem;
        border-radius: 7px;
        width: 100%;
        padding: 0 7px;
        height: 40px;
    }
    .add-to-cart-btn {
        bottom : 0;
        background-color: #131212;;
        border : none;
        color : var(--mainWhite);
        font-size : 1.4rem;
        border-radius: 7px;
        width: 100%;
        padding: 0 7px;
        height: 40px;
    }
    .img-container:hover .cart-btn {
        transform : translate(0,0);
    }
    .cart-btn:hover {
        color : var(--mainBlue);
        cursor : pointer;
    }
    .checkmark {
        width:30px;
        height:auto;
        margin-right:10px;
    }
`;