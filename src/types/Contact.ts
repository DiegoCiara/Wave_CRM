export interface IContact {
  id?: string;
  socialName: string;
  name: string;
  cpf_cnpj: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  company_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  company?: {
    id: string;
    name: string;
  };
}

export interface IContactContext {
  useCreateContactModal: () => void;
  createContactModal: boolean;
  useCreateContactModalPipe: () => void;
  createContactModalPipe: boolean;
  useImportContactModal: () => void;
  importContactModal: boolean;
  useUpdateContactModal: () => void;
  updateContactModal: boolean;
  useDeleteContactModal: () => void;
  deleteContactModal: boolean;
  contacts: IContact[];
  filteredContact: (terms: string, typeValue: string) => void;
  removeFiltered: () => void;
  getContacts: () => Promise<void>;
  sendImportedContacts: (contacts: IContact[]) => Promise<{
    errors: any;
    alreadyExistMessageCount: number;
    invalidValuesMessageCount: number;
  }>;
  isLoading: boolean;
  hasError: string;
}