"use client";

import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function Shop() {
  // Product data
  const products: Product[] = [
    {
      id: 1,
      name: "Headphones",
      price: 1999,
      image: "🎧",
    },
    {
      id: 2,
      name: "Keyboard",
      price: 2999,
      image: "⌨️",
    },
    {
      id: 3,
      name: "Mouse",
      price: 1499,
      image: "🖱️",
    },
    {
      id: 4,
      name: "Monitor",
      price: 12999,
      image: "🖥️",
    },
  ];

  // Cart state (LIFTED STATE)
  const [cart, setCart] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);

  // Add to cart
  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  // Total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Shop</h1>

        {/* CART */}
        <button
          onClick={() => setShowCart(true)}
          className="relative font-semibold"
        >
          🛒 Cart: {cart.length}
        </button>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white text-black p-6 rounded-lg flex flex-col items-center"
          >
            <div className="text-5xl mb-4">
              {product.image}
            </div>

            <h2 className="text-xl font-semibold">
              {product.name}
            </h2>

            <p className="font-medium mt-2">
              ₹{product.price}
            </p>

            <button
              onClick={() => addToCart(product)}
              className="mt-4 px-4 py-2 bg-black text-white rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* CART MODAL (BONUS) */}
      {showCart && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white text-black w-[90%] max-w-md p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                Cart Items
              </h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <p>No items in cart.</p>
            ) : (
              <>
                <ul className="space-y-2">
                  {cart.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between"
                    >
                      <span>{item.name}</span>
                      <span>₹{item.price}</span>
                    </li>
                  ))}
                </ul>

                <hr className="my-4" />

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
