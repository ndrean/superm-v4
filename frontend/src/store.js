import { observable, action, runInAction } from "mobx";

const store = observable({
  products: [],
  getProducts: async () => {
    try {
      const res = await fetch(
        "https://react-tutorial-demo.firebaseio.com/supermarket.json"
      );
      const data = await res.json();
      return runInAction(() => (store.products = data));
    } catch (err) {
      console.log(err);
    }
  },

  cart: [],
  getItems: () =>
    store.cart.map((product) => {
      return { price: product.price_id, quantity: product.quantity };
    }),
  cartToRedis: async () => {
    fetch("http://localhost:9292/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(store.cart),
    }).then((res) => console.log(res.status));
  },
  cartToLS() {
    try {
      return localStorage.setItem("cart", JSON.stringify(store.cart));
    } catch (err) {
      console.log("pb with localStorage", err);
    }
  },
  findProductInCart: (id) => {
    return store.cart.find((product) => product.id === +id); // make sure it's a number
  },
  findQuantityById: (id) => {
    if (store.cart.length > 0) {
      const product = store.cart.find((product) => product.id === +id); // make sure it's a number
      if (product) return product.quantity;
    }
    return 0;
  },
  totalPrice: () => {
    if (store.cart.length > 0) {
      return store.cart.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
    }
    return 0;
  },
  getCartFromRedis: async () => {
    const request = await fetch("http://localhost:9292");
    const { data } = await request.json();
    runInAction(() => (store.cart = JSON.parse(data) || []));
  },
  getCartFromLS: action(() => {
    try {
      const getFromLS = JSON.parse(localStorage.getItem("cart"));
      store.cart = getFromLS || [];
    } catch (err) {
      store.cart = [];
    }
    return store.cart;
  }),
  cartCount: () => {
    if (store.cart?.length > 0) {
      return store.cart.reduce((total, product) => total + product.quantity, 0);
    } else {
      return 0;
    }
  },
  productDelete: action((id) => {
    return (store.cart = store.cart.filter((product) => product.id !== id));
  }),
  productAdd: action((newProduct) => {
    const existingProduct = store.cart.find(
      (product) => product.id === newProduct.id
    );
    if (!existingProduct) {
      return (store.cart = [
        ...store.cart,
        {
          ...newProduct,
          quantity: 1,
        },
      ]);
    }
    return (store.cart = store.cart.map((product) => {
      if (product.id === newProduct.id) {
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      }
      return product;
    }));
  }),
});

export default store;
