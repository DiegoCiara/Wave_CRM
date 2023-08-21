import React, { useState, createContext } from "react";
import { IMailerContext } from "types/IMailer";

const MailerContext = createContext<IMailerContext>({} as IMailerContext);

export const MailerProvider: React.FC = ({ children }) => {
  const [deleteMailerModal, setDeleteMailerModal] = useState<boolean>(false);

  function useDeleteMailerModal() {
    setDeleteMailerModal(!deleteMailerModal);
  }

  return (
    <MailerContext.Provider
      value={{
        useDeleteMailerModal,
        deleteMailerModal,
      }}
    >
      {children}
    </MailerContext.Provider>
  );
};

export default MailerContext;
