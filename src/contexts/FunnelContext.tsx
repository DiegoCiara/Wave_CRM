import React, { useState, createContext } from "react";
import { IAutomationContext } from "types/IAutomation";
import { ICompanyContext } from "types/ICompanyContext";
import { IFunnelContext } from "types/IFunnel";

const FunnelContext = createContext<IFunnelContext>({} as IFunnelContext);

export const FunnelProvider: React.FC = ({ children }) => {
  const [deleteFunnelModal, setDeleteFunnelModal] = useState<boolean>(false);

  function useDeleteFunnelModal() {
    setDeleteFunnelModal(!deleteFunnelModal);
  }

  return (
    <FunnelContext.Provider
      value={{
        useDeleteFunnelModal,
        deleteFunnelModal,
      }}
    >
      {children}
    </FunnelContext.Provider>
  );
};

export default FunnelContext;
