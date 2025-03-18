import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const cart = useSelector((state) => state.cart.cart);
  const [addedItems, setAddedItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("https://fakestoreapi.com/products");
        dispatch({ type: "SET_PRODUCTS", payload: data });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [dispatch]);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    setAddedItems((prev) => [...prev, product.id]); // Track added items
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
          <img
            src={product.image}
            alt={product.title}
            className="h-40 w-full object-cover rounded-md"
          />
          <h4 className="text-lg font-semibold mt-2">{product.title}</h4>
          <p className="text-gray-700 font-bold">${product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className={`w-full mt-3 py-2 rounded-md ${
              addedItems.includes(product.id) ? "bg-gray-400" : "bg-blue-500"
            } text-white`}
            disabled={addedItems.includes(product.id)}
          >
            {addedItems.includes(product.id) ? "Added" : "Add to Cart"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
