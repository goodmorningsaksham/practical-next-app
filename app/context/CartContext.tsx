"use client"

import { createContext, useContext, useState } from "react"

type Product = {
    name: string,
    id: number,
    image: string,
    price: number
}

type CartItem = Product & {
    quantity: number
}

type CartContextType = {
    cart: CartItem[],
    addToCart: (product: Product) => void,
    decreaseQty: (id: number) => void,
    removeFromCart: (id: number) => void
}

const CartContext = createContext<CartContextType | null>(null);

export default function CartProvider({children} : {children: React.ReactNode}) {

    const [cart, setCart] = useState<CartItem[]>([])

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id)
            if(existing) {
                return prev.map((item) => (
                    item.id === product.id 
                    ? {...item, quantity: item.quantity + 1}
                    : item
                ));                
            }
            return [...prev, {...product, quantity: 1}]
        })
    }

    const decreaseQty = (id: number) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id))
    }

    return (
        <CartContext.Provider
            value={{ cart, addToCart, decreaseQty, removeFromCart }}
        >
            {children}
        </CartContext.Provider>
    )
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside CartProvider");
    return ctx;
}