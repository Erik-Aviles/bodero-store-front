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
        const storedCart = ls?.getItem("cart");
        const localCart = storedCart ? JSON.parse(storedCart) : [];

        if (session?.user) {
          const response = await axios.get("/api/customers/cart");
          const serverCart = response?.data?.cart || [];

          // Combinar ambos carritos manteniendo duplicados
          const combinedCart = [...serverCart, ...localCart];
          setCartProducts(combinedCart);

          if (localCart.length > 0) {
            await axios.put("/api/customers/cart", {
              cartProducts: combinedCart,
            });
            ls?.removeItem("cart"); // Limpiar el carrito local después de sincronizar
          }
        } else {
          setCartProducts(localCart);
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
      updateCart(updatedCart);
      return updatedCart;
    });
  };

  const removeProduct = (productId) => {
    setCartProducts((prev) => {
      const updatedCart = prev.filter(
        (id, index) => index !== prev.indexOf(productId)
      );
      updateCart(updatedCart);
      return updatedCart;
    });
  };

  const removeOneProduct = (productId) => {
    setCartProducts((prev) => {
      const updatedCart = prev.filter((product) => product !== productId);
      updateCart(updatedCart);
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCartProducts([]);
    updateCart([]);
    ls?.removeItem("cart");
  };

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