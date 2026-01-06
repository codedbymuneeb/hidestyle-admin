import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, quantity = 1, selectedSize = "", selectedColor = "") => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex(
                (item) =>
                    item._id === product._id &&
                    item.selectedSize === selectedSize &&
                    item.selectedColor === selectedColor
            );

            if (existingItemIndex > -1) {
                const newCart = [...prevCart];
                newCart[existingItemIndex].quantity += quantity;
                return newCart;
            }

            return [...prevCart, { ...product, quantity, selectedSize, selectedColor }];
        });
    };

    const removeFromCart = (productId, selectedSize = "", selectedColor = "") => {
        setCart((prevCart) =>
            prevCart.filter(
                (item) =>
                    !(item._id === productId &&
                        item.selectedSize === selectedSize &&
                        item.selectedColor === selectedColor)
            )
        );
    };

    const clearCart = () => setCart([]);

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
