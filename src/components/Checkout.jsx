import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-xl font-bold">Checkout</h2>
      <h4 className="text-lg font-semibold text-gray-700">
        Total: ${totalAmount.toFixed(2)}
      </h4>
      <button
        onClick={() => navigate("/payment")}
        className="bg-blue-500 text-white px-6 py-2 mt-4 rounded-md shadow-md"
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default Checkout;
