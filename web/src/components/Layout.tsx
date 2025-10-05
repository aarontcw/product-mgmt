import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useCart } from "../store/cart";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { token, role, clearAuth } = useAuth();
  const { items } = useCart();
  const nav = useNavigate();
  const cartCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-indigo-600">
            ProductStore
          </Link>
          <nav className="flex items-center gap-4">
            {role !== "ADMIN" && (
              <>
                <Link to="/" className="hover:text-indigo-600">
                  Shop
                </Link>
                <Link to="/cart" className="hover:text-indigo-600">
                  Cart
                  {cartCount ? (
                    <span className="ml-1 text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  ) : null}
                </Link>
              </>
            )}
            {role === "ADMIN" && (
              <Link to="/admin/products" className="hover:text-indigo-600">
                Admin
              </Link>
            )}
            {token ? (
              <button
                onClick={() => {
                  clearAuth();
                  nav("/login");
                }}
                className="hover:text-red-500"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="hover:text-indigo-600">
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-6xl mx-auto px-4 py-6">{children}</main>
      <footer className="bg-gray-100 text-center text-sm text-gray-600 py-3">
        © {new Date().getFullYear()} ProductStore
      </footer>
    </div>
  );
}
