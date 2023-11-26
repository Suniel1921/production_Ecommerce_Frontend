import {createContext, useContext, useEffect, useState} from 'react';

const CartContext = createContext();
const CartProvider = ({children})=>{
    const [cart, setCart] = useState([]);

    //localstroge initial value if refresh page then not remove cart 
    useEffect(()=>{
        let exitingCartItem = localStorage.getItem('cart');
        if(exitingCartItem) setCart(JSON.parse(exitingCartItem));
    },[])

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}

//custom hooks
const useCart = ()=> useContext(CartContext);

export {useCart, CartProvider};