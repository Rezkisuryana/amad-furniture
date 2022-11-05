import React, { Component } from 'react';
import {storeProducts,detailProduct} from './data';

const ProductContext = React.createContext();

//React.createContext(); / context => fungsinya untuk membaca state state yang ada di halaman lain.

class ProductProvider extends Component {
    // buat state untuk menampung store product dan juga detail productnya : state (data static)
    // bersifat constant
    state = {
        products:[],
        detailProduct:detailProduct,
        cart : [],
        modalOpen : false,
        modalProduct : detailProduct,
        cartSubtotal : 0,
        cartTax : 0,
        carti : 0

    }
    
    // funsgi yang akan dijaalan kan setelah webnya di render
    componentDidMount() {
        this.setProducts();
    }

    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts,singleItem];
        });

        // fungsinya untuk memberikan nilai
        this.setState(() => {
            return {products:tempProducts};
        });
    }

    //funsi dibawah ini untuk mendapatkan id ketika klik detail dan sesuai data
    getItem = id => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    }

    handleDetail = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return {detailProduct:product}
        })
    }
    addToCart = id => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(()=>{
            return {products:tempProducts,cart:[...this.state.cart,product]};
        },
        () => {
            this.addTotals();
        }
        )
    }
    openModal = id => {
        const product = this.getItem(id);
        this.setState(()=>{
            return {modalProduct:product, modalOpen:true}
        })
    }
    closeModal = id => {
        this.setState(()=>{
            return {modalOpen:false}
        })
    }
    increase = id => {
        // console.log("this increase penambahan jml produck");
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count + 1;
        product.total = product.count * product.price;

        this.setState(()=>{
            return {cart: [...tempCart]}
        },
        ()=> {
            this.addTotals()
        }
        )
    }
    decrease = id => {
        // console.log("dekresse pengurangan jml product");
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count - 1;
        if(product.count === 0){
            this.removeItem(id);
        }else {
            product.total = product.count * product.price;
            this.setState(()=>{
                return {cart: [...tempCart]}
            },
            ()=> {
                this.addTotals()
            })
        }
        
    }
    removeItem = id => {
        // console.log("remove");
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);  // untuk mendapatkan barang yang bukan kita pilih
        
        //fungsinya untuk menghapus data cart berdasarkan id
        const index = tempProducts.indexOf(this.getItem(id)); // fungsinya untuk mendapatkan id yang kita pilih 
        
        let removeProduct = tempProducts[index];
        removeProduct.inCart = false;
        removeProduct.count = 0;
        removeProduct.total = 0;

        this.setState(()=>{
            return {
                cart : [...tempCart],
                products : [...tempProducts]
            };
        },()=> {
            this.addTotals();
        })
    }
    clearCart = () => {
        // console.log("clear cart");
        this.setState(()=> {
            return {cart:[]};
        },()=> {
            this.setProducts();
            this.addTotals();
        }
        )
    }
    addTotals = () => {
        let subtotal =0;
        // map > fungsinya untuk mengeluarkan semua data dari cartnya
        this.state.cart.map(item => (subtotal += item.total));
        const tempTax = subtotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));// toFixed -> fungsinya untuk membulatkan angka di belakang koma
        const total = subtotal + tax;
        this.setState(()=>{
            return {
                cartSubtotal : subtotal,
                cartTax : tax,
                cartTotal : total
            }
        });
    }
    render() {
        return (
            // {{...this.state}} => membaca seluruh isi dalam data.js
            <ProductContext.Provider value={{...this.state, handleDetail:this.handleDetail, addToCart:this.addToCart, openModal:this.openModal, closeModal:this.closeModal,
            increase:this.increase, decrease:this.decrease, removeItem:this.removeItem, clearCart:this.clearCart}}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;
export {ProductProvider, ProductConsumer};