import { createContext, useState } from "react";

const addItemSellInvoice = (itemSellInvoice, productToAdd) => {
  const existingItemSellInvoice = itemSellInvoice.find(
    (item) => item.productCode === productToAdd.productCode
  );

  if (existingItemSellInvoice) {
    return itemSellInvoice;
  }

  return [{ ...productToAdd }, ...itemSellInvoice];
};

const removeItemSellInvoice = (itemSellInvoice, productToRemove) => {
  return itemSellInvoice.filter(
    (item) => item.productCode !== productToRemove.productCode
  );
};

export const ProductSellInvoiceContext = createContext({
  itemSellInvoice: [],
  addItemToSellInvoice: () => {},
  removeItemFromSellInvoice: () => {},
});

export const ProductSellInvoiceProvider = ({ children }) => {
  const [itemSellInvoice, setItemSellInvoice] = useState([]);

  const addItemToSellInvoice = (productToAdd) => {
    setItemSellInvoice((prevItems) =>
      addItemSellInvoice(prevItems, productToAdd)
    );
  };

  const removeItemFromSellInvoice = (productToRemove) => {
    setItemSellInvoice((prevItems) =>
      removeItemSellInvoice(prevItems, productToRemove)
    );
  };

  const value = {
    itemSellInvoice,
    addItemToSellInvoice,
    removeItemFromSellInvoice,
  };

  return (
    <ProductSellInvoiceContext.Provider value={value}>
      {children}
    </ProductSellInvoiceContext.Provider>
  );
};
