import { useEffect, useState } from "react";
import CompanyService from "data/services/CompanyService";
import { CompanyTypes } from "types/Company";
import AutomationService from "data/services/AutomationService";
import { AutomatiionTypes } from "types/Automation";
import MailerService from "data/services/MailerService";
import { MailerTypes } from "types/Mailer";

export const useMailerPage = () => {
  //DECLARAÇÃO DAS VARIAVEIS
  const [mailers, setMailers] = useState([]);
  const [removeFilteredMailers, setFilteredMailers] = useState([]);
  const [formatMailersToSelect, setFormat] = useState([]);
  const [createMailerModalState, setCreateMailerModalState] =
    useState<boolean>(false);
  const [MailerDetail, setMailerDetail] = useState<MailerTypes>({});
  const [hasError, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!mailers.length) {
      getData();
    }
  }, []);

  const formatListToSelect = (mailers: any[]): any => {
    setFormat(
      mailers.map((mailer) => {
        return { value: mailer.id, label: mailer.subject };
      })
    );
  };

  const getData = async () => {
    setLoading(true);
    try {
      const response = await MailerService.getMailers();
      setMailers(response);
      setFilteredMailers(response);
      formatListToSelect(response);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(
        "Não foi possivel buscar os canais, verifique sua conexão e tente novamente"
      );
    }
  };

  const filteredMailer = async (terms: string, typeValue: string) => {
    let filtered = [];
    if (typeValue === "subject") {
      filtered = mailers.filter((mailer: MailerTypes) =>
      mailer.subject.toLowerCase().includes(terms.toLocaleLowerCase())
      );
    } else if (typeValue === "title") {
      filtered = mailers.filter((mailer: MailerTypes) =>
      mailer?.title.toLowerCase().includes(terms.toLocaleLowerCase())
      );
    } else if (typeValue === "text") {
      filtered = mailers.filter((mailer: MailerTypes) =>
      mailer?.text.toLowerCase().includes(terms.toLocaleLowerCase())
      );
    }

    setMailers(filtered);
  };

  const removeFiltered = async (isNewSearched: boolean) => {
    getData();
  };

  const createMailer = async (data: MailerTypes) => {
    const result = await MailerService.createMailer(data);
    return result;
  };

  const useCreateMailerModal = () => {
    setCreateMailerModalState(!createMailerModalState);
  };

  const useMailerDetailModal = (MailerDetail: any) => {
    setMailerDetail(MailerDetail);
  };

  const editMailer = async (MailerId: any, data: any) => {
    const result = await MailerService.editMailer(MailerId, data);
    return result;
  };

  const deleteMailer = async (MailerId: any) => {
    const result = await MailerService.deleteMailer(MailerId);
    return result;
  };
 
  return {
    mailers,
    setMailers,
    formatMailersToSelect,
    filteredMailer,
    removeFiltered,
    // CREATE MODAL
    createMailer,
    useCreateMailerModal,
    createMailerModalState,
    setCreateMailerModalState,
    setMailerDetail,
    useMailerDetailModal,
    editMailer,
    MailerDetail,
    deleteMailer,
    getData,
    hasError,
    isLoading,
  };
};
