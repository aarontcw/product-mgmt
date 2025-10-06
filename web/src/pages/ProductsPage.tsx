import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import Layout from "../components/Layout";
import { useCart } from "../store/cart";
import toast from "react-hot-toast";
import { useAuth } from "../store/auth";

type Product = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  stock: number;
  isActive: boolean;
};

export default function ProductsPage() {
  const { data, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => (await api.get("/products")).data,
  });

  const { items: cartItems, add } = useCart();
  const { token, role } = useAuth();

  const handleAddToCart = (p: Product) => {
    if (!token || role === "ADMIN") {
      toast.error("Please log in as a user before adding items to the cart.");
      return;
    }

    const cartItem = cartItems.find((i) => i.productId === p.id);
    const remainingStock = p.stock - (cartItem?.quantity || 0);

    if (remainingStock <= 0) {
      toast.error("This product is out of stock.");
      return;
    }

    add({
      productId: p.id,
      name: p.name,
      priceCents: p.priceCents,
      quantity: 1,
      stock: p.stock,
    });

    toast.success(`"${p.name}" has been added to your cart!`);
  };

  if (isLoading)
    return (
      <Layout>
        <p>Loading products...</p>
      </Layout>
    );

  const visibleProducts = data?.filter((p) => p.isActive && p.stock > 0);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Available Products</h1>

      {visibleProducts?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProducts.map((p) => {
            const cartItem = cartItems.find((i) => i.productId === p.id);
            const remaining = p.stock - (cartItem?.quantity || 0);

            return (
              <div
                key={p.id}
                className="bg-white p-5 rounded-lg shadow border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-lg font-semibold">{p.name}</h2>
                  <p className="text-gray-600 text-sm mb-2">{p.description}</p>
                  <p className="text-gray-800 font-medium mb-2">
                    ${(p.priceCents / 100).toFixed(2)}
                  </p>
                  <p
                    className={`text-sm ${
                      remaining > 0 ? "text-gray-500" : "text-red-500"
                    }`}
                  >
                    {remaining > 0
                      ? `Quantity left: ${remaining}`
                      : "Out of stock"}
                  </p>
                </div>

                <button
                  onClick={() => handleAddToCart(p)}
                  disabled={remaining <= 0}
                  className={`mt-4 px-4 py-2 rounded text-white ${
                    remaining <= 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  {remaining <= 0 ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500">No products available at the moment.</p>
      )}
    </Layout>
  );
}
