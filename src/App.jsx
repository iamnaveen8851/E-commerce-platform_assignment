import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Login from "./pages/Login";
import Payment from "./components/Payment";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("user")
  );

  return (
    <Router>
      <nav className="flex justify-between items-center bg-blue-500 p-4 text-white">
        <Link to="/" className="text-lg font-bold">
          Shop
        </Link>
        <div>
          <Link to="/cart" className="px-4">
            Cart
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/checkout" className="px-4">
                Checkout
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  setIsAuthenticated(false);
                }}
                className="bg-red-500 px-3 py-1 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="px-4">
              Login
            </Link>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/checkout"
          element={
            isAuthenticated ? (
              <Checkout />
            ) : (
              <Login onLogin={() => setIsAuthenticated(true)} />
            )
          }
        />
        <Route
          path="/login"
          element={<Login onLogin={() => setIsAuthenticated(true)} />}
        />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
};

export default App;
