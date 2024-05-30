import { createContext, useState } from "react";

export const ProductSelectionContext = createContext({
  counter: {
    selectedCounter: "",
    setSelectedCounter: () => null,
  },
  categoryName: {
    selectedCategoryName: "",
    setSelectedCategoryName: () => null,
  },
});

export const ProductSelectionProvider = ({ children }) => {
  const [selectedCounter, setSelectedCounter] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  return (
    <ProductSelectionContext.Provider
      value={{
        counter: { selectedCounter, setSelectedCounter },
        categoryName: { selectedCategoryName, setSelectedCategoryName },
      }}
    >
      {children}
    </ProductSelectionContext.Provider>
  );
};
