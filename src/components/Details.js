import React, { Component } from 'react';
import {ProductConsumer} from '../Context';
import {Link} from 'react-router-dom';
import {ButtonContainer} from './Button';
import {ButtonModal} from './ButtonModal';

class Details extends Component {
    render() {
        return (
            <ProductConsumer>
                { value => {
                    // hanya memanggil detailProduct karena di file contect kita sudah mendefinisikan details productnya
                    const {id,company,img,info,price,title,inCart} = value.detailProduct; 
                    return (
                        <div className="container py-5">
                            <div className="row">
                                <div className="col-10 mx-auto col-md-6 my-3 text-center">
                                    <img src={img} className="img-fluid" alt="Product" />
                                </div>
                                <div className="col-10 mx-auto text-center text-slanted text-capitalize text-blue my-5">
                                    <h1>{title}</h1>
                                    <h4 className="text-title text-uppercase text-mute mt-3 mb-2">made by 
                                    <span className="text-uppercase">  
                                        {company}
                                    </span>
                                    </h4>
                                    <h4 className="text-blue"><strong>price : <span>$</span>{price} </strong></h4>
                                    <p className="text-capitalize font-weight-bold mt-3 mb-0">some info about product :</p>
                                    <p className="text-muted font-description">{info}</p>
                                    <div>
                                        <Link to="/">
                                            <ButtonContainer className="btn-detail">Back to Product</ButtonContainer>
                                        </Link>
                                        <ButtonContainer
                                            className="btn-detail-cart"
                                            cart
                                            disabled = { inCart ? true :false}
                                            onClick={() => {
                                                value.addToCart(id);
                                                value.openModal(id);
            
                                            }}
                                        >
                                        { inCart ? "in Cart" :"Add to Cart"}
                                        </ButtonContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </ProductConsumer>
        );
    }
}

export default Details;