const initialProductState = {
  products: [],
};

export const productReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};
