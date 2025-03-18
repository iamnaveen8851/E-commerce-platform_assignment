import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);

  const increaseQty = (id) => {
    dispatch({ type: "INCREASE_QTY", payload: id });
  };

  const decreaseQty = (id) => {
    dispatch({ type: "DECREASE_QTY", payload: id });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  // Calculate total price correctly
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 rounded-md shadow-md mt-2"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-16 w-16 object-cover rounded-md"
              />
              <h4 className="text-lg font-semibold flex-1 ml-4">
                {item.title}
              </h4>

              {/* Individual Product Price Calculation */}
              <p className="text-gray-700 font-bold">
                ${(item.price * item.qty).toFixed(2)}
              </p>

              {/* Quantity Controls */}
              <div className="flex items-center">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="bg-gray-300 px-3 py-1 rounded-md text-lg"
                >
                  -
                </button>
                <span className="mx-2 text-lg">{item.qty}</span>
                <button
                  onClick={() => increaseQty(item.id)}
                  className="bg-gray-300 px-3 py-1 rounded-md text-lg"
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white py-1 px-3 rounded-md ml-4"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total Price Section */}
          <div className="mt-6 p-4 bg-gray-100 rounded-md shadow-md">
            <h3 className="text-lg font-bold">
              Total: ${totalAmount.toFixed(2)}
            </h3>
          </div>

          {/* Checkout Button */}
          <button
            onClick={() => navigate("/checkout")}
            className={`w-[20%] ml-90%   mt-4 py-4  text-white font-semibold rounded-full ${
              cart.length > 0
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
