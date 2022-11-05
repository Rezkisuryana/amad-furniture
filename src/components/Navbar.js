import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from '../logo.png';
import cart from '../cart.png';
import styled from 'styled-components';
import {ButtonContainer} from './Button'
class Navbar extends Component {
    render() {
        return (
            <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
                <div className="container">
                <Link to="/">
                    <img src={logo} alt="store" className="navbar-brand logo"/>
                </Link>
                <ul className="navbar-nav align-items-center">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            Products
                        </Link>
                    </li>
                    <li className="nav-item ml-10">
                        <Link to="/cart" className="ms-auto">
                            <ButtonContainer>
                                <span className="me-2">
                                    <img src={cart} alt="store" className="cart-nav"/>
                                </span>
                                CART
                            </ButtonContainer>
                        </Link>
                    </li>
                </ul>
                </div>
            </NavWrapper>
        );
    }
}

export default Navbar;

const NavWrapper = styled.nav`
    background : var(--navbarWhite);
    position: sticky;
    top: 0;
    z-index: 1;
    .nav-link {
        color : #131212 !important;
        font-size:1.3rem;
        text-transform:capitalize;
    }
    .logo {
        height: auto;
        width: 100%;
    }
    cart-nav {
        display: block;
        text-transform: uppercase;
        font-size: 16px;
        padding: 15px 0;
        color: #131212;
        line-height: 1;
    }
`;