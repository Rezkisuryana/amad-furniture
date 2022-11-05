import React from 'react';
import { Link } from 'react-router-dom';

export default function CartColumns({value}) {
    const {cartSubtotal, cartTax, cartTotal, clearCart} = value;
    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-end">
                        <Link to="/">
                            <button className="btn btn-black text-uppercase mb-3 px-5" type="button" onClick={()=> clearCart()}>
                                Clear Cart
                            </button>
                        </Link>
                        <h5>
                            <span className="text-title">subtotal :</span>
                            <strong>${cartSubtotal}</strong>
                        </h5>
                        <h5>
                            <span className="text-title">tax :</span>
                            <strong>${cartTax}</strong>
                        </h5>
                        <h5>
                            <span className="text-title">total :</span>
                            <strong>${cartTotal}</strong>
                        </h5>

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}