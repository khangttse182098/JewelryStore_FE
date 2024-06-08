import { createContext, useState } from "react";

const addItemProductList = (productList, productToAdd) => {
  const existingItemPurchase = productList.find(
    (item) => item.productCode === productToAdd.productCode
  );

  if (existingItemPurchase) {
    return productList;
  }

  return [{ ...productToAdd }, ...productList];
};

const removeItemProductList = (productList, productToRemove) => {
  return productList.filter(
    (item) => item.productCode !== productToRemove.productCode
  );
};

export const ProductPurchaseListContext = createContext({
  productList: [],
  setProductList: () => {},
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
    setProductList,
    addItemToProductList,
    removeItemFromProductList,
  };

  return (
    <ProductPurchaseListContext.Provider value={value}>
      {children}
    </ProductPurchaseListContext.Provider>
  );
};
