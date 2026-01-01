"use client";

import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, addToCart, decreaseQty, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-10 min-h-screen bg-slate-900 text-white">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {cart.length === 0 && <p>Your cart is empty.</p>}

      {cart.map((item) => (
        <div
          key={item.id}
          className="bg-white text-black p-4 rounded mb-4 flex justify-between"
        >
          <div>
            <h2 className="font-semibold">{item.name}</h2>
            <p>₹{item.price}</p>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => decreaseQty(item.id)}>−</button>
            <span>{item.quantity}</span>
            <button onClick={() => addToCart(item)}>+</button>
            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-4 text-red-500"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <h2 className="text-xl font-semibold mt-6">
          Total: ₹{total}
        </h2>
      )}
    </div>
  );
}
