import { useCart } from "../store/cart";
import Layout from "../components/Layout";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { api } from "../api";
import { useQueryClient } from "@tanstack/react-query";

export default function CartPage() {
  const { token } = useAuth();
  const { items, remove, updateQuantity, clear } = useCart();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient(); // ✅ enables React Query re-fetch

  // Redirect unauthenticated users
  if (!token) {
    return (
      <Layout>
        <div className="text-center mt-20">
          <p className="text-lg mb-4">Please log in to view your cart.</p>
          <button
            onClick={() => nav("/login")}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Go to Login
          </button>
        </div>
      </Layout>
    );
  }

  // Calculate total
  const total = items.reduce(
    (sum, item) => sum + item.priceCents * item.quantity,
    0
  );

  // ✅ Checkout: deduct stock in backend, clear cart, and refresh products
  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    try {
      setLoading(true);

      await api.post("/orders/checkout", {
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
        })),
      });

      // ✅ Refresh products list so updated stock is fetched automatically
      await queryClient.invalidateQueries(["products"]);

      toast.success(
        "Your order has been processed! Please check your email for the invoice and payment instructions."
      );

      clear();
      setTimeout(() => nav("/"), 1200);
    } catch (err) {
      toast.error("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle item removal confirmation
  const handleRemove = (productId: string, name: string) => {
    const confirmDelete = confirm(
      `Are you sure you want to remove "${name}" from your cart?`
    );
    if (confirmDelete) {
      remove(productId);
      toast.success(`"${name}" has been removed from your cart.`);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is currently empty.</p>
      ) : (
        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex justify-between items-center bg-white shadow p-4 rounded-lg border border-gray-100"
            >
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-500 text-sm">
                  ${(item.priceCents / 100).toFixed(2)} each
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Remaining stock: {item.stock - item.quantity}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded">
                  <button
                    className="px-2 text-gray-600 hover:text-indigo-600"
                    onClick={() =>
                      updateQuantity(
                        item.productId,
                        Math.max(1, item.quantity - 1)
                      )
                    }
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(
                        item.productId,
                        Math.max(1, +e.target.value)
                      )
                    }
                    className="w-12 text-center border-x outline-none"
                  />
                  <button
                    className="px-2 text-gray-600 hover:text-indigo-600"
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                <p className="w-20 text-right font-medium">
                  ${((item.priceCents * item.quantity) / 100).toFixed(2)}
                </p>

                <button
                  onClick={() => handleRemove(item.productId, item.name)}
                  className="text-red-500 underline hover:text-red-600"
                >
                  Remove Item
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <h2 className="text-xl font-semibold">Total:</h2>
            <p className="text-xl font-bold">${(total / 100).toFixed(2)}</p>
          </div>

          <div className="text-right">
            <button
              onClick={handleCheckout}
              disabled={loading}
              className={`px-6 py-3 rounded text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Processing..." : "Checkout"}
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
