import { IContact } from "types/Contact";
import { serviceApi as api } from "./ServiceApi";
import { toast } from "react-toastify";

class ContactService {
  async getContacts() {
    try {
      const { data } = await api.get("/contact?with=company&limit=1000000");
      return data;
    } catch (error) {
      toast.error(
        "Ops! algo deu errado, verifique sua conexão e tente novamente."
      );
      return error;
    }
  }

  async getContact(id: string): Promise<IContact> {
    try {
      const response = await api.get(`/contact/${id}?with=company`);
      return response.data;
    } catch (error) {
      toast.error(
        "Ops! algo deu errado, verifique sua conexão e tente novamente."
      );
      return error;
    }
  }

  async deleteContact(id: string): Promise<string> {
    try {
      const response = await api.delete(`/contact/${id}`);
      toast.success("Contato deletado com sucesso!");
      return response.data;
    } catch (error) {
      toast.error(
        "Não foi possível deletar o contato, verifique sua conexão e tente novamente."
      );
      return error;
    }
  }

  async createContact({ socialName, name, cpf_cnpj, email, phone, city, state, company, }) {
    const body = {
      socialName,
      name,
      cpf_cnpj,
      email,
      phone,
      city,
      state,
      company,
      
    };

    try {
      const { data } = await api.post("/contact", body);
      toast.success("Contato criado com sucesso!");
      return data;
    } catch (error) {
      toast.error(
        "Não foi possível criar o contato, verifique sua conexão e tente novamente."
      );
      return;
    }
  }

  async updateContact({
    id,
    socialName,
    name,
    cpf_cnpj,
    email,
    phone,
    city,
    state,
    company,
    
  }) {
    const body = {
      socialName,
      name,
      cpf_cnpj,
      email,
      phone,
      city,
      state,
      company,
      
    };

    try {
      const { data } = await api.put(`/contact/${id}?with=company`, body);
      toast.success("Contato atualizado com sucesso!");
      return data.name;
    } catch (error) {
      toast.error(
        "Não foi possível editar o contato, verifique sua conexão e tente novamente."
      );
      return error.message;
    }
  }
}

export default new ContactService();