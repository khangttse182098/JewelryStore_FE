import { createContext, useState } from "react";

export const ProductSelectionContext = createContext([
  { selectedCounter: "", setSelectedCounter: () => null },
  { selectedCategoryName: "", setSelectedCategoryName: () => null },
]);

export const ProductSelectionProvider = ({ children }) => {
  const [selectedCounter, setSelectedCounter] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  return (
    <ProductSelectionContext.Provider
      value={[
        { selectedCounter, setSelectedCounter },
        { selectedCategoryName, setSelectedCategoryName },
      ]}
    >
      {children}
    </ProductSelectionContext.Provider>
  );
};
