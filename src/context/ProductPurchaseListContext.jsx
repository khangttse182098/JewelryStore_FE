import { createContext, useState } from "react";

const addItemProductList = (itemPurchase, productToAdd) => {
  const existingItemPurchase = itemPurchase.find(
    (item) => item.productCode === productToAdd.productCode
  );

  if (existingItemPurchase) {
    return itemPurchase;
  }

  return [...itemPurchase, { ...productToAdd }];
};

const removeItemProductList = (itemPurchase, productToRemove) => {
  return itemPurchase.filter(
    (item) => item.productCode !== productToRemove.productCode
  );
};

export const ProductPurchaseListContext = createContext({
  productList: [],
  addItemToProductList: () => {},
  removeItemFromProductList: () => {},
});

export const ProductPurchaseListProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);

  const addItemToProductList = (productToAdd) => {
    setProductList((prevItems) => addItemProductList(prevItems, productToAdd));
  };

  const removeItemFromProductList = (productToRemove) => {
    setProductList((prevItems) => 
      removeItemProductList(prevItems, productToRemove)
    );
  };

  const value = {
    productList,
    addItemToProductList,
    removeItemFromProductList,
  };

  return (
    <ProductPurchaseListContext.Provider value={value}>
      {children}
    </ProductPurchaseListContext.Provider>
  );
};
