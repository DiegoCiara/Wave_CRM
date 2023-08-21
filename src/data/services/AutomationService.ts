import { DealTypes } from "types/Deal";
import { pipeline } from "types/Modal";
import { serviceApi as api } from "./ServiceApi";
import { toast } from "react-toastify";
import { AutomatiionTypes } from "types/Automation";

interface IResponse {
  status: string;
  message: string;
  titulo: string;
}

// O automation Service é uma cópia do pipeline service
class AutomationService {
  async getAutomations(): Promise<AutomatiionTypes[]> {
    try {
      const { data } = await api.get("/automation");

      return data;
    } catch (error) {
      return error;
    }
  }
  async getAutomation(id: string): Promise<AutomatiionTypes> {
    try {
      const { data } = await api.get(`/automation/${id}`);

      return data;
    } catch (error) {
      toast.error(
        "Ops! algo deu errado, verifique sua conexão e tente novamente."
      );
      return error;
    }
  }

  async createAutomation(data: AutomatiionTypes): Promise<string> {
    try {
      const response = await api.post("/automation", data);
      toast.success("Automação criada com sucesso!");
      return response.data.id;
    } catch (error) {
      toast.error(
        "Não foi possível criar a automação, verifique sua conexão e tente novamente."
      );
      return error;
    }
  }

  async editAutomation(automationId: string, automation): Promise<IResponse> {
    try {
      await api.put(`/automation/${automationId}`, automation);
      toast.success("Automação editada com sucesso!");
      return {
        status: "success",
        message: "Automação alterada com sucesso!",
        titulo: "Sucesso",
      };
    } catch (error) {
      return {
        status: "error",
        message:
          "Não foi possível alterar a automação, verifique sua conexão e tente novamente.",
        titulo: "Erro",
      };
    }
  }

  async deleteAutomation(id: string): Promise<object> {
    try {
      const response = await api.delete(`/automation/${id}`);

      toast.success("Automação deletada com sucesso!");
      return response.data;
    } catch (error) {
      toast.error(
        "Não foi possível deletar a automação, verifique sua conexão e tente novamente."
      );
      return error;
    }
  }
}

export default new AutomationService();
