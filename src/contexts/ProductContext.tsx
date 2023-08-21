import React, { useState, createContext } from "react";
import { IAutomationContext } from "types/IAutomation";
import { ICompanyContext } from "types/ICompanyContext";
import { IProductContext } from "types/Product";

const ProductContext = createContext<IProductContext>({} as IProductContext);

export const ProductProvider: React.FC = ({ children }) => {
  const [deleteProductModal, setDeleteProductModal] = useState<boolean>(false);

  function useDeleteProductModal() {
    setDeleteProductModal(!deleteProductModal);
  }

  return (
    <ProductContext.Provider
      value={{
        useDeleteProductModal,
        deleteProductModal,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
