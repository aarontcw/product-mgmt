import Layout from "../components/Layout";
import { useCart } from "../store/cart";
import { api } from "../api";
import toast from "react-hot-toast";

export default function CartPage() {
  const { items, remove, clear } = useCart();
  const total = items.reduce((s, i) => s + i.priceCents * i.quantity, 0);

  const checkout = async () => {
    await api.post("/orders", {
      items: items.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
      })),
    });
    clear();
    toast.success("Order placed!");
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {!items.length ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y">
            {items.map((i) => (
              <li key={i.productId} className="py-3 flex justify-between">
                <span>
                  {i.name} × {i.quantity}
                </span>
                <div>
                  ${((i.quantity * i.priceCents) / 100).toFixed(2)}
                  <button
                    className="ml-3 underline"
                    onClick={() => remove(i.productId)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-6">
            <strong>Total: ${(total / 100).toFixed(2)}</strong>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded"
              onClick={checkout}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </Layout>
  );
}
