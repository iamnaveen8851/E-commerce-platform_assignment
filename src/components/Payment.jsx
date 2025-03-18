import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe("your_stripe_public_key");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error(error);
      alert("Payment Failed!");
    } else {
      alert("Payment Successful!");
      navigate("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-10 bg-white shadow-md rounded-md max-w-md mx-auto mt-6"
    >
      <h2 className="text-xl font-bold mb-4 text-center">Payment</h2>
      <CardElement className="border p-3 rounded-md" />
      <button
        type="submit"
        disabled={!stripe}
        className="bg-green-500 text-white w-full py-2 mt-4 rounded-md"
      >
        Pay
      </button>
    </form>
  );
};

const Payment = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Payment;
