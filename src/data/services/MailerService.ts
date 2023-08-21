import { DealTypes } from "types/Deal";
import { pipeline } from "types/Modal";
import { serviceApi as api } from "./ServiceApi";
import { toast } from "react-toastify";
import { MailerTypes } from "types/Mailer";

interface IResponse {
  status: string;
  message: string;
  titulo: string;
}

// O automation Service é uma cópia do pipeline service
class MailerService {
  async getMailers(): Promise<MailerTypes[]> {
    try {
      const { data } = await api.get("/mail");
      return data;
    } catch (error) {
      return error;
    }
  }
  async getMailer(id: string): Promise<MailerTypes> {
    try {
      const { data } = await api.get(`/mail/${id}`);
      return data;
    } catch (error) {
      toast.error(
        "Ops! algo deu errado, verifique sua conexão e tente novamente."
      );
      return error;
    }
  }

  async createMailer(data: MailerTypes): Promise<string> {
    try {
      const response = await api.post("/mail", data);
      toast.success("E-mail criado com sucesso!");
      return response.data.id;
    } catch (error) {
      toast.error(
        "Não foi possível criar e-mail, verifique sua conexão e tente novamente."
      );
      return error;
    }
  }

  async editMailer(mailId: string, mail): Promise<IResponse> {
    try {
      await api.put(`/mail/${mailId}`, mail);
      toast.success("E-mail editado com sucesso!");
      return {
        status: "success",
        message: "E-mail alterado com sucesso!",
        titulo: "Sucesso",
      };
    } catch (error) {
      return {
        status: "error",
        message:
          "Não foi possível alterar e-mail, verifique sua conexão e tente novamente.",
        titulo: "Erro",
      };
    }
  }

  async deleteMailer(id: string): Promise<object> {
    try {
      const response = await api.delete(`/mail/${id}`);

      toast.success("E-mail deletado com sucesso!");
      return response.data;
    } catch (error) {
      toast.error(
        "Não foi possível deletar o e-mail, verifique sua conexão e tente novamente."
      );
      return error;
    }
  }
}

export default new MailerService();
