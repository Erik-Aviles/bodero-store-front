import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const { data: session } = useSession();
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    async function loadCart() {
      try {
        if (session?.user) {
          const response = await axios.get("/api/customers/cart");
          setCartProducts(response?.data?.cart || []);
        } else {
          const storedCart = ls?.getItem("cart");
          setCartProducts(storedCart ? JSON.parse(storedCart) : []);
        }
      } catch (error) {
        console.error("Error cargando la canasta:", error);
        setCartProducts([]);
      }
    }

    loadCart();
  }, [session]);

  async function updateCart(newCart) {
    try {
      if (session?.user) {
        await axios.put("/api/customers/cart", { cartProducts: newCart });
      } else {
        ls?.setItem("cart", JSON.stringify(newCart));
      }
    } catch (error) {
      console.error("Error actualizando la canasta:", error);
    }
  }

  const addProduct = (productId) => {
    setCartProducts((prev) => {
      const updatedCart = [...prev, productId];
      updateCart(updatedCart); // Llama a la función para sincronizar el carrito
      return updatedCart;
    });
  }

  const removeProduct = (productId) => {
    setCartProducts((prev) => {
      const updatedCart = prev.filter(
        (id, index) => index !== prev.indexOf(productId)
      );
      updateCart(updatedCart);
      return updatedCart;
    });
  }

  const removeOneProduct = (productId) => {
    setCartProducts((prev) => {
      const productosActualizados = prev.filter(
        (producto) => producto !== productId
      );
      updateCart(productosActualizados);
      return productosActualizados;
    });
  }

  const clearCart = () => {
    setCartProducts([]);
    updateCart([]);
    ls?.removeItem("cart");
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
