/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const removeItemPurchase = (itemPurchase, itemToRemove) =>
  itemPurchase.filter((item) => item.data !== itemToRemove.data);

const addItemPurchase = (itemPurchase, itemToAdd) => {
  const existingItemSellInvoice = itemPurchase.find(
    (item) => item.id === itemToAdd.id
  );

  // if (existingItemSellInvoice) {
  //   return itemPurchase;
  // }

  return [{ ...itemToAdd }, ...itemPurchase];
};

export const RepurchaseContext = createContext({
  itemPurchase: [],
  setItemPurchase: () => {},
  removeItemFromPurchase: () => {},
  addItemToPurchase: () => {},
});

export const RepurchaseProvider = ({ children }) => {
  const [itemPurchase, setItemPurchase] = useState([]);

  const removeItemFromPurchase = (itemToRemove) => {
    setItemPurchase((prevItems) => removeItemPurchase(prevItems, itemToRemove));
  };

  const addItemToPurchase = (itemToAdd) => {
    setItemPurchase((prevItems) => addItemPurchase(prevItems, itemToAdd));
  };

  const value = {
    itemPurchase,
    setItemPurchase,
    removeItemFromPurchase,
    addItemToPurchase,
  };

  return (
    <RepurchaseContext.Provider value={value}>
      {children}
    </RepurchaseContext.Provider>
  );
};
