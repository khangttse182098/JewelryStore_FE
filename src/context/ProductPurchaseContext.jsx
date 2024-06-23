/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const addItemPurchase = (itemPurchase, productToAdd) => {
  const existingItemPurchase = itemPurchase.find(
    (item) => item.productCode === productToAdd.productCode
  );

  if (existingItemPurchase) {
    return itemPurchase;
  }

  return [{ ...productToAdd }, ...itemPurchase];
};

const removeItemPurchase = (itemPurchase, productToRemove) => {
  return itemPurchase.filter(
    (item) => item.productCode !== productToRemove.productCode
  );
};

export const ProductPurchaseContext = createContext({
  itemPurchase: [],
  setItemPurchase: () => {},
  addItemToPurchase: () => {},
  removeItemFromPurchase: () => {},
});

export const ProductPurchaseProvider = ({ children }) => {
  const [itemPurchase, setItemPurchase] = useState([]);

  const addItemToPurchase = (productToAdd) => {
    setItemPurchase((prevItems) => addItemPurchase(prevItems, productToAdd));
  };

  const removeItemFromPurchase = (productToRemove) => {
    setItemPurchase((prevItems) =>
      removeItemPurchase(prevItems, productToRemove)
    );
  };

  const value = {
    itemPurchase,
    setItemPurchase,
    addItemToPurchase,
    removeItemFromPurchase,
  };

  return (
    <ProductPurchaseContext.Provider value={value}>
      {children}
    </ProductPurchaseContext.Provider>
  );
};
