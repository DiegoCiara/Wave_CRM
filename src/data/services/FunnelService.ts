import { DealTypes } from "types/Deal";
import { pipeline } from "types/Modal";
import { serviceApi as api } from "./ServiceApi";
import { toast } from "react-toastify";
import { Funnel } from "types/Funnel";

interface IResponse {
  status: string;
  message: string;
  titulo: string;
}

// O automation Service é uma cópia do pipeline service
class FunnelService {
  async getFunnels(): Promise<Funnel[]> {
    try {
      const { data } = await api.get("/funnel");

      console.log(data)
      return data;
    } catch (error) {
      return error;
    }
  }
  async getFunnel(id: string): Promise<Funnel> {
    try {
      const { data } = await api.get(`/funnel/${id}`);

      return data;
    } catch (error) {
      toast.error(
        "Ops! algo deu errado, verifique sua conexão e tente novamente."
      );
      return error;
    }
  }

  async createFunnel(data: Funnel): Promise<string | null> {
    try {
      const response = await api.post("/funnel", data);
      toast.success("funil criado com sucesso!");
      return response.data.id;
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.message === 'Maximum number of funnels reached') {
        toast.error("Número máximo de funis atingido");
      } else {
        toast.error(
          "Não foi possível criar funil, verifique sua conexão e tente novamente."
        );
      }
      return null;
    }
  }
  
  async editFunnel(funnelId: string, funnel): Promise<IResponse> {
    try {
      await api.put(`/funnel/${funnelId}`, funnel);
      toast.success("Funnil editado com sucesso!");
      return {
        status: "success",
        message: "Funnil alterado com sucesso!",
        titulo: "Sucesso",
      };
    } catch (error) {
      return {
        status: "error",
        message:
          "Não foi possível alterar funil, verifique sua conexão e tente novamente.",
        titulo: "Erro",
      };
    }
  }

  async deleteFunnel(id: string): Promise<object> {
    try {
      const response = await api.delete(`/funnel/${id}`);

      toast.success("Funil deletado com sucesso!");
      return response.data;
    } catch (error) {
      toast.error(
        "Não foi possível deletar o funil, verifique sua conexão e tente novamente."
      );
      return error;
    }
  }
}

export default new FunnelService();
