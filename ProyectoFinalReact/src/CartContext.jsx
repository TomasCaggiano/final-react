import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = (props) => {
    const [cart, setCart] = useState([]);

    const addToCart = (cantidad, item, setIsAdded) => {
        const itemInCart = { cantidad, ...item };

        const newCart = [...cart];
        const inCart = newCart.find((producto) => producto.id === itemInCart.id);

        if (!inCart) {
            if (cantidad <= item.stock) {
                newCart.push(itemInCart);
                setCart(newCart);
            }
        } else {
            if (inCart.cantidad + cantidad <= item.stock) {
                inCart.cantidad += cantidad;
                setCart(newCart);
            }
            else {console.log("No queda stock suficiente")}
        }
        setIsAdded(true)
    };
    

    const addToCartFast = (cantidad, item) => {
        const itemInCart = { cantidad, ...item };
    
        const newCart = [...cart];
        const inCart = newCart.find((producto) => producto.id === itemInCart.id);
    
        if (!inCart) {
            if (cantidad <= item.stock) {
                newCart.push(itemInCart);
                setCart(newCart);
            }
        } else {
            if (inCart.cantidad + cantidad <= item.stock) {
                inCart.cantidad += cantidad;
                setCart(newCart);
            }
            else {console.log("No queda stock suficiente")}
        }
    };
    

    const updateCantCart = (cantidad, item) => {
        const itemInCart = { cantidad, ...item };

        const newCart = [...cart];
        const inCart = newCart.find((producto) => producto.id === itemInCart.id);

        if (inCart) {
            inCart.cantidad = cantidad;
        } else {
            newCart.push(itemInCart);
        }
        setCart([...newCart]);
    };

    const quantityInCart = () => {
        return cart.reduce((acc, prod) => acc + prod.cantidad, 0);
    };

    const totalPrice = () => {
        return cart.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
    }

    const removeItem = (prodId) => {
        const index =cart.findIndex(producto => producto.id === prodId)
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
        console.log('Producto eliminado');
    }

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, quantityInCart, totalPrice, clearCart, updateCantCart, removeItem, addToCartFast, setCart }}>
            {props.children}
        </CartContext.Provider>
    )

};