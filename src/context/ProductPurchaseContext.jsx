import { createContext, useState } from "react";

const addItemPurchase = (itemPurchase, productToAdd) => {
  const existingItemPurchase = itemPurchase.find(
    (item) => item.productCode === productToAdd.productCode
  );

  if (existingItemPurchase) {
    return itemPurchase.map((item) =>
      item.productCode === item.productCode ? { ...item } : item
    );
  }

  return [...itemPurchase, { ...productToAdd }];
};

export const ProductPurchaseContext = createContext({
  itemPurchase: [],
  addItemToPurchase: () => {},
});

export const ProductPurchaseProvider = ({ children }) => {
  const [itemPurchase, setItemPurchase] = useState([]);

  const addItemToPurchase = (productToAdd) => {
    setItemPurchase(addItemPurchase(itemPurchase, productToAdd));
  };

  const value = { addItemToPurchase, itemPurchase };

  return (
    <ProductPurchaseProvider value={value}>{children}</ProductPurchaseProvider>
  );
};
