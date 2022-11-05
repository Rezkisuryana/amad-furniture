import React, { Component } from 'react';
import styled from 'styled-components';
import {ProductConsumer} from '../Context';
// import {ButtonContainer} from './Button';
import { ButtonModal } from './ButtonModal';
import {Link} from 'react-router-dom'

class Modal extends Component {
    render() {
        return (
           <ProductConsumer>
               {(value)=>{
                   const {modalOpen,closeModal} = value;
                   const {img,title,price} = value.modalProduct;
                   
                   if(!modalOpen){
                       return null;
                   } else {
                       return (
                        
                        <ModalContainer>
                            <div className="container">
                                <div className="row">
                                    <div id="modal" className="col-8 mx-auto py-2 col-md-6 col-lg-4 text-center text-capitalize">
                                        <h5>Item Added to the cart</h5>
                                        <img src={img} className="img-fluid mb-4" alt="product" />
                                        <h4 className='text-bold-title'>{title}</h4>
                                        <h5 className="text-muted mb-4 text-bold">${price.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h5>
                                        <Link to="/" className="mr-2 mb-3 d-flex border-none">
                                            <ButtonModal onClick={()=> closeModal()}>
                                                Continue Shopping
                                            </ButtonModal>
                                        </Link>
                                        <Link to="/cart">
                                            <ButtonModal cart onClick={()=> closeModal()}>
                                                Go to cart
                                            </ButtonModal>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </ModalContainer>
                       
                       );
                   }
               }}
           </ProductConsumer>
        );
    }
}

export default Modal;
const ModalContainer = styled.div`
    position : fixed;
    top : 0;
    left : 0;
    right : 0;
    bottom : 0;
    background : rgba(0,0,0,0.3);
    display : flex;
    align-items : center;
    justify-content : center;
    #modal{
        background : var(--mainWhite);
    }
`;