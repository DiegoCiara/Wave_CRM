/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useContext } from "react";
import { ModalContainer } from "../ModalStyles/ModalContainer.style";
import { CloseButtonStyled } from "../ModalStyles/CloseButtonModal.style";
import Title from "../../Title/Title";
import { ModalStyled } from "../ModalStyles/Modal.style";
import ContactContext from "contexts/ContactContext";
import FileInput from "ui/components/Input/FileInput/FileInput";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@material-ui/core";
import readXlsxFile from "read-excel-file";
import Select from "ui/components/Input/Select/Select";
import { IContact } from "types/Contact";
import Dialog from "ui/components/Dialog/Dialog";
import TextFieldMask from "ui/components/Input/TextFieldMask/TextFieldMask";
import { toast } from "react-toastify";
import { emailValidator } from "data/utils/emailValidator";
import { formatPhone } from "data/utils/formatPhone";
import { MdClose } from "react-icons/md";

interface ImportContactModalProps {
  companies: any[];
  getData: () => void;
}
const ImportContactModal: React.FC<ImportContactModalProps> = ({
  companies,
  getData,
}) => {
  const { importContactModal, useImportContactModal, sendImportedContacts } =
    useContext(ContactContext);

  const [importedContacts, setImportedContacts] = useState<any[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [submited, setSubmited] = useState(false);

  const ReadDocument = async (file) => {
    let contacts = [];
    if (file) {
      await readXlsxFile(file).then((rows) => {
        rows.splice(0, 1);
        rows.forEach(async (row) => {
          const contact = {
            name: row[0] || "",
            cpf_cnpj: row[1] || "",
            email: row[2] || "",
            phone: row[3] || "",
            picture: row[4] || "",
            company: "",
          };
          contacts.push(contact);
        });
      });
      setImportedContacts(contacts);
    }
  };

  const handleSubmit = async (contacts: IContact[]) => {
    setSubmited(true);
    if (formIsValid()) {
      const res: any = await sendImportedContacts(contacts);
      if (res?.length) {
        console.log("a");

        setImportedContacts(res);
        setHasError(true);
        getData();
      } else {
        console.log("b");

        setSubmited(false);
        onClose();
        getData();
        useImportContactModal();
      }
    } else {
      toast.warning(
        "Preenchimento invalido, Verique os campos e tente novamente"
      );
    }
  };

  const formIsValid = () => {
    const isValid = !importedContacts.some((contact) => {
      return (
        !emailValidator(contact.email) || !contact.name || !contact.company || !contact.cpf_cnpj
      );
    });
    return isValid;
  };

  const getContactErrorList = () => {
    let contactsNamesList = "";
    importedContacts.forEach((contact, i) => {
      if (i === importedContacts.length - 1) {
        contactsNamesList += ` ${contact.name}`;
      } else if (i === importedContacts.length - 2) {
        contactsNamesList += ` ${contact.name} e`;
      } else {
        contactsNamesList += ` ${contact.name},`;
      }
    });
    return contactsNamesList;
  };

  const onClose = () => {
    setSubmited(false);
    setImportedContacts([]);
    useImportContactModal();
  };

  const body = (
    <ModalContainer>
      <Dialog
        title={`(${importedContacts.length}) erros de importação`}
        message={
          <>
            <span style={{ display: "block" }}>
              Os seguintes contatos não puderam ser criados:{" "}
            </span>
            <span style={{ display: "block" }}>{getContactErrorList()}</span>
            <span style={{ display: "block" }}>
              verifique se os contatos ja existem e sua conexão.
            </span>
            <span style={{ display: "block" }}>deseja tentar novamente?</span>
          </>
        }
        type={"question"}
        open={hasError}
        setOpen={() => setHasError(false)}
        result={(res) => {
          res ? handleSubmit(importedContacts) : setHasError(false);
          onClose();
        }}
      />

      <Tooltip
        title="Fechar"
        placement="top-start"
        enterDelay={500}
        leaveDelay={100}
      >
        <CloseButtonStyled
          onClick={() => {
            onClose();
          }}
        >
        <MdClose/>
        </CloseButtonStyled>
      </Tooltip>

      <Title
        title="Importar contatos"
        subtitle={
          <ul style={{ whiteSpace: "pre-wrap" }}>
            <li>
              <Typography variant="caption">
                O arquivo de importação deve ser do tipo .XLSX
              </Typography>
            </li>
            <li>
              <Typography variant="caption">
                As colunas aceitas são: Nome, CPF/CNPJ, E-mail Telefone e Link de imagem
              </Typography>
            </li>
            <li>
              <Typography variant="caption">
                As colunas Nome CNPJ e Email são OBRIGATÓRIAS
              </Typography>
            </li>
            <li>
              <Typography variant="caption">
                As colunas devem estar exatamente nessa ordem
              </Typography>
              <Typography variant="caption" sx={{ display: "block" }}>
                <strong>NOME, CPF/CNPJ, E-MAIL, TELEFONE</strong>
              </Typography>
            </li>
            <li>
              <Typography variant="caption">
                clique{" "}
                <a
                  href="https://docs.google.com/spreadsheets/d/e/2PACX-1vSdr9WFWL4AY_0eCEFtJ2MfPQWKhhGce7F5tblkuNJlGgRy4XVSw6p_Qh7bxx13vlxTmMiSgDIhWUFE/pubhtml?gid=0&single=true"
                  target="_blank"
                  rel="noreferrer"
                >
                  aqui
                </a>{" "}
                para ver um exemplo de arquivo
              </Typography>
            </li>
          </ul>
        }
      />
      <FileInput onChange={(file) => ReadDocument(file)} />

      {importedContacts.length ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Canal</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Telefone</TableCell>
                  {/* <TableCell align="left">Link de imagem</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {importedContacts.map((contact, index: number) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      align="left"
                      sx={{
                        minWidth: "160px",
                      }}
                    >
                      <FormControl
                        fullWidth
                        sx={{ mb: submited && !contact.company && -4 }}
                      >
                        <InputLabel
                          htmlFor="uncontrolled-native"
                          required
                          error={submited && !contact?.company}
                        >
                          Canal
                        </InputLabel>

                        <Select
                          onChange={(event) => {
                            contact.company = event.target.value;
                            setImportedContacts([...importedContacts]);
                          }}
                          size="small"
                          value={contact.company || ""}
                          fullWidth
                          error={submited && !contact.company}
                        >
                          {companies.map((company) => (
                            <MenuItem value={company.value} key={company.value}>
                              {company.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <TextFieldMask
                        onChange={(event) => {
                          contact.name = event.target.value;
                          setImportedContacts([...importedContacts]);
                        }}
                        value={contact.name}
                        label="Nome"
                        size="small"
                        fullWidth
                        required
                        error={submited && !contact.name}
                      />
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <TextFieldMask
                        onChange={(event) => {
                          contact.cpf_cnpj = event.target.value;
                          setImportedContacts([...importedContacts]);
                        }}
                        value={contact.cpf_cnpj}
                        label="cpf_cnpj"
                        size="small"
                        fullWidth
                        required
                        error={submited && !contact.cpf_cnpj}
                        helperText={
                          submited &&
                          !contact.cpf_cnpj &&
                          "CPF/CNPJ invalido"
                        }
                      />
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <TextFieldMask
                        onChange={(event) => {
                          contact.email = event.target.value;
                          setImportedContacts([...importedContacts]);
                        }}
                        value={contact.email}
                        label="Email"
                        size="small"
                        fullWidth
                        required
                        error={submited && !emailValidator(contact.email)}
                        helperText={
                          submited &&
                          !emailValidator(contact.email) &&
                          "E-mail invalido"
                        }
                      />
                    </TableCell>
                    {/* <TableCell align="left" sx={{ minWidth: "170px" }}>
                      {formatPhone(contact.phone)}
                    </TableCell>
                    <TableCell
                      sx={{
                        maxWidth: "150px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      align="left"
                    >
                      {contact.picture}
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Tooltip
            title="Confirmar importação"
            placement="top-start"
            enterDelay={500}
            leaveDelay={100}
          >
            <Button
              variant="contained"
              sx={{ width: "200px", margin: "32px auto 0", color: "white" }}
              color="success"
              onClick={() => handleSubmit(importedContacts)}
            >
              Confirmar
            </Button>
          </Tooltip>
        </>
      ) : (
        <div />
      )}
    </ModalContainer>
  );
  return (
    <>
      <ModalStyled
        open={importContactModal}
        onClose={() => {
          onClose();
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};

export default ImportContactModal;
