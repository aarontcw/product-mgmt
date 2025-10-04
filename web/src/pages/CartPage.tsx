import { useCart } from "../store/cart";
import { api } from "../api";

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
    alert("Order placed!");
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {items.length === 0 ? (
        <p>Empty cart.</p>
      ) : (
        <>
          <ul className="divide-y">
            {items.map((i) => (
              <li key={i.productId} className="py-3 flex justify-between">
                <span>
                  {i.name} × {i.quantity}
                </span>
                <div>
                  ${((i.priceCents * i.quantity) / 100).toFixed(2)}{" "}
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
          <div className="flex justify-between items-center mt-4">
            <div className="font-bold">Total: ${(total / 100).toFixed(2)}</div>
            <button
              className="px-3 py-2 rounded bg-black text-white"
              onClick={checkout}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
