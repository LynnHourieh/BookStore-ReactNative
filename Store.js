// ApiContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const Store = createContext();

export const StoreProvider = ({ children }) => {
  const [addedproduct, setProduct] = useState("");
  const [productLoading, setProductLoading] = useState(true);
  const [items, setItems] = useState([]);


  function addItemToCart(id) {
    const addProductToCart = async (productId) => {
      try {
        const response = await axios.get(
          `http://10.0.0.22:5000/api/products/${productId}`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    };

    // Use async function to add product to cart
    async function addProduct() {
      const product = await addProductToCart(id);
      //console.log("product",product)
      if (!product) {
        // Handle the case when product fetch fails
        return;
      }

      setItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === id);
        if (!existingItem) {
          return [
            ...prevItems,
            {
              id,
              qty: 1,
              product,
              totalPrice: product.price,
            },
          ];
        } else {
          return prevItems.map((item) => {
            if (item.id === id) {
              item.qty++;
              item.totalPrice += product.price;
            }
            return item;
          });
        }
      });
    }

    // Call the async function to add product
    addProduct();
  }

  function getItemsCount() {
    return items.reduce((sum, item) => sum + item.qty, 0);
  }

  function getTotalPrice() {
    return items.reduce((sum, item) => sum + item.totalPrice, 0);
  }
  const value = {
    items,
    addItemToCart,
    getItemsCount,
    getTotalPrice,

  };
  return <Store.Provider value={value}>{children}</Store.Provider>;
};
