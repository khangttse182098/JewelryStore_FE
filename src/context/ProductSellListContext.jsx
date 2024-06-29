import { createContext, useState } from "react";

const addItemSellList = (itemSellList, productToAdd) => {
  const existingItemSellList = itemSellList.find(
    (item) => item.productCode === productToAdd.productCode
  );

  if (existingItemSellList) {
    return itemSellList;
  }

  return [{ ...productToAdd }, ...itemSellList];
};

const removeItemSellList = (itemSellList, productToRemove) => {
  return itemSellList.filter(
    (item) => item.productCode !== productToRemove.productCode
  );
};

export const ProductSellListContext = createContext({
  itemSellList: [],
  setItemSellList: () => {},
  addItemToSellList: () => {},
  removeItemFromSellList: () => {},
});

export const ProductSellListProvider = ({ children }) => {
  const [itemSellList, setItemSellList] = useState([]);

  const addItemToSellList = (productToAdd) => {
    setItemSellList((prevItems) => addItemSellList(prevItems, productToAdd));
  };

  const removeItemFromSellList = (productToRemove) => {
    setItemSellList((prevItems) =>
      removeItemSellList(prevItems, productToRemove)
    );
  };

  const value = {
    itemSellList,
    setItemSellList,
    addItemToSellList,
    removeItemFromSellList,
  };

  return (
    <ProductSellListContext.Provider value={value}>
      {children}
    </ProductSellListContext.Provider>
  );
};
