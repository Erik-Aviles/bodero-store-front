import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  const [showCart, setSetShowCart] = useState(false);

  useEffect(() => {
    if (showCart) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "17px";
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [showCart]);

  const dropdownCart = () => {
    setSetShowCart(!showCart);
  };

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }

  function removeProduct(productId) {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
    });
  }
  function removeOneProduct(nombreProducto) {
    setCartProducts((prev) => {
      const productosActualizados = prev.filter(
        (producto) => producto !== nombreProducto
      );
      return productosActualizados;
    });
  }

  function clearCart() {
    setCartProducts([]);
    ls.removeItem("cart");
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        removeOneProduct,
        clearCart,
        showCart,
        dropdownCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
