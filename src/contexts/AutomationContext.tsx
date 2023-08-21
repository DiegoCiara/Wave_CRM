import React, { useState, createContext } from "react";
import { IAutomationContext } from "types/IAutomation";
import { ICompanyContext } from "types/ICompanyContext";

const AutomationContext = createContext<IAutomationContext>({} as IAutomationContext);

export const AutomationProvider: React.FC = ({ children }) => {
  const [deleteAutomationModal, setDeleteAutomationModal] = useState<boolean>(false);

  function useDeleteAutomationModal() {
    setDeleteAutomationModal(!deleteAutomationModal);
  }

  return (
    <AutomationContext.Provider
      value={{
        useDeleteAutomationModal,
        deleteAutomationModal,
      }}
    >
      {children}
    </AutomationContext.Provider>
  );
};

export default AutomationContext;
