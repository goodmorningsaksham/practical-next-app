"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

const products = [
  { id: 1, name: "Headphones", price: 1999, image: "🎧" },
  { id: 2, name: "Keyboard", price: 2999, image: "⌨️" },
  { id: 3, name: "Mouse", price: 1499, image: "🖱️" },
  { id: 4, name: "Monitor", price: 12999, image: "🖥️" },
];

export default function Shop() {
  const { cart, addToCart, decreaseQty } = useCart();

  const getQty = (id: number) =>
    cart.find((item) => item.id === id)?.quantity || 0;

  const getTotalItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="p-10 min-h-screen bg-slate-900 text-white">
      <div className="flex justify-between mb-10">
        <h1 className="text-3xl font-bold">Shop</h1>
        <Link href="/checkout" className="font-semibold">
          Checkout ({getTotalItems()})
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => {
          const qty = getQty(product.id);

          return (
            <div
              key={product.id}
              className="bg-white text-black p-6 rounded-lg flex flex-col items-center"
            >
              <div className="text-5xl mb-4">{product.image}</div>
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p>₹{product.price}</p>

              {qty === 0 ? (
                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 px-4 py-2 bg-black text-white rounded"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center gap-4 mt-4">
                  <button
                    onClick={() => decreaseQty(product.id)}
                    className="px-3 py-1 bg-gray-300 rounded"
                  >
                    −
                  </button>
                  <span className="font-semibold">{qty}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="px-3 py-1 bg-gray-300 rounded"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}