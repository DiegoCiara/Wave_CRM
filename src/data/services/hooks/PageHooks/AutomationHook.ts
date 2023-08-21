import { useEffect, useState } from "react";
import CompanyService from "data/services/CompanyService";
import { CompanyTypes } from "types/Company";
import AutomationService from "data/services/AutomationService";
import { AutomatiionTypes } from "types/Automation";

export const useAutomationPage = () => {
  //DECLARAÇÃO DAS VARIAVEIS
  const [automations, setAutomations] = useState([]);
  const [removeFilteredAutomations, setFilteredAutomations] = useState([]);
  const [formatAutomationsToSelect, setFormat] = useState([]);
  const [createAutomationModalState, setCreateAutomationModalState] =
    useState<boolean>(false);
  const [automationDetail, setAutomationDetail] = useState<AutomatiionTypes>({});
  const [hasError, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!automations.length) {
      getData();
    }
  }, []);

  const formatListToSelect = (automations: any[]): any => {
    setFormat(
      automations.map((automation) => {
        return { value: automation.id, label: automation.name };
      })
    );
  };

  const getData = async () => {
    setLoading(true);
    try {
      const response = await AutomationService.getAutomations();
      setAutomations(response);
      setFilteredAutomations(response);
      formatListToSelect(response);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(
        "Não foi possivel buscar os canais, verifique sua conexão e tente novamente"
      );
    }
  };

  const filteredAutomation = async (terms: string, typeValue: string) => {
    let filtered = [];
    if (typeValue === "name") {
      filtered = automations.filter((automation: AutomatiionTypes) =>
      automation.name.toLowerCase().includes(terms.toLocaleLowerCase())
      );
    } else if (typeValue === "input") {
      filtered = automations.filter((automation: AutomatiionTypes) =>
      automation?.input.toLowerCase().includes(terms.toLocaleLowerCase())
      );
    } else {
      filtered = automations.filter((automation: AutomatiionTypes) =>
      automation?.output.toLowerCase().includes(terms.toLocaleLowerCase())
      );
    }

    setAutomations(filtered);
  };

  const removeFiltered = async (isNewSearched: boolean) => {
    getData();
  };

  const createAutomation = async (data: AutomatiionTypes) => {
    const result = await AutomationService.createAutomation(data);
    return result;
  };

  const useCreateAutomationModal = () => {
    setCreateAutomationModalState(!createAutomationModalState);
  };

  const useAutomationDetailModal = (AutomationDetail: any) => {
    setAutomationDetail(AutomationDetail);
  };

  const editAutomation = async (AutomationId: any, data: any) => {
    const result = await AutomationService.editAutomation(AutomationId, data);
    return result;
  };

  const deleteAutomation = async (AutomationId: any) => {
    const result = await AutomationService.deleteAutomation(AutomationId);
    return result;
  };

  return {
    automations,
    setAutomations,
    formatAutomationsToSelect,
    filteredAutomation,
    removeFiltered,
    // CREATE MODAL
    createAutomation,
    useCreateAutomationModal,
    createAutomationModalState,
    setCreateAutomationModalState,
    setAutomationDetail,
    useAutomationDetailModal,
    editAutomation,
    automationDetail,
    deleteAutomation,
    getData,
    hasError,
    isLoading,
  };
};
