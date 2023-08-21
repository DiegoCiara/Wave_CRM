import React, { useContext, useState } from "react";
import {
  Button,
  FormControl,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import PipelineContext from "contexts/PipelineContext";
import Title from "../Title/Title";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import {
  ModalContainer,
  TwoColumnsContainer,
} from "./ModalStyles/ModalContainer.style";
import { ModalStyled } from "./ModalStyles/Modal.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";
import DealDetailCard from "../DealDetailCard/DealDetailCard";
import {
  ActionsDealDetailCardContainer,
  LinkPhoneStyled,
  NewActivityButton,
  NewActivityButtonLabel,
  NewActivityContainer,
  WhatsAppLink,
} from "../DealDetailCard/DealDetailCard.style";
import Activity from "../Activity/Activity";
import { useDealPage } from "data/services/hooks/PageHooks/DealHook";
import AuthContext from "contexts/AuthContext";
import { ButtonsContainer } from "./ModalStyles/ButtonsContainer";
import { LinkStyled } from "../Link/Link.style";
import Dialog from "../Dialog/Dialog";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";
import { SubtitleStyled, TitleStyled } from "../Title/Title.style";
import { FaInfo, FaInfoCircle, FaTimes, FaTimesCircle } from "react-icons/fa";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoMdArchive } from "react-icons/io";
import TextFieldMaskCopy from "../Input/TextFieldMask/TextFieldMaskCopy";


interface DetailModalProps {
  getData: () => void;
}
const DetailModal: React.FC<DetailModalProps> = ({ getData }) => {
  const { dealDetailModalState, UseDealDetailModal, dealDetail } =
    useContext(PipelineContext);
  const { createActivity, editDeal, updateStatus } = useDealPage();
  const [hasEdit, setHasEdit] = useState(false);
  const [hasNewActivity, setHasNewActivity] = useState(false);
  const [dialogView, setDialogView] = useState(false);
  const { user } = useContext(AuthContext);
  const [submited, setSubmited] = useState(false);
  const [changeStatusTo, setChangeStatusTo] = useState({
    label: "",
    value: "",
  });
  const [data, setData] = useState({
    name: "",
    description: "",
    tag: "WARM",
    createdAt: new Date(Date.now()),
    createdBy: user,
  });

  const handleClick = () => {
    setData({
      name: "",
      description: "",
      tag: "WARM",
      createdAt: new Date(Date.now()),
      createdBy: user,
    });
    setHasNewActivity(!hasNewActivity);
  };

  const handleSubmit = () => {
    if (data.name.length && data.description.length) {
      createActivity(dealDetail.id, data);
      dealDetail.activity.unshift(data);
      handleClick();
      getData();
      setSubmited(false);
    } else {
      setSubmited(true);
      toast.warning(
        "Preenchimento invalido, Verique os campos e tente novamente"
      );
    }
  };

  const handleSubmitEdit = (data) => {
    data.value = Number(data.value.replace(/\D+/g, ""));
    editDeal(dealDetail.id, data);
    setHasEdit(false);
    getData();
  };

  const onClose = () => {
    setData({
      name: "",
      description: "",
      tag: "WARM",
      createdAt: new Date(Date.now()),
      createdBy: user,
    });
    setHasEdit(false);
    setHasNewActivity(false);
    UseDealDetailModal("");
  };

  const body = (
    <ModalContainer>
      <Dialog
        title={"Atualizar status"}
        message={`Tem certeza que deseja finalizar esta negociação como ${changeStatusTo.label}?`}
        type={"question"}
        open={dialogView}
        setOpen={() => setDialogView(false)}
        result={async (res) => {
          if (res) {
            await updateStatus(dealDetail.id, { status: changeStatusTo.value });
            getData();
            onClose();
          }
        }}
      />
      {dealDetail.id ? (
        <>
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
          <h2 style={{textAlign:"center"}}> Detalhes da negociação {dealDetail?.name} </h2>

          <DealDetailCard
            onClick={() => setHasEdit(!hasEdit)}
            hasEdit={hasEdit}
            name={dealDetail?.name}
            saveEdit={(data) => handleSubmitEdit(data)}
            company={{
              value: dealDetail.company?.id,
            }}
            contact={{
              label: dealDetail.contact?.name,
              value: dealDetail.contact?.name,
            }}
            pipeline={{
              label: dealDetail.pipeline?.name,
            }}
            value={dealDetail?.value}
            currentResponsible={
              dealDetail.activity[dealDetail.activity?.length - 1].createdBy
                .name
            }
            status={dealDetail?.status}
          />
          <div>
            <p style={{ color:"#a4a4a4", fontSize:"14px", margin:"10px", width:"100%", textAlign:"center"}}>Finalizar negociação:</p>
          <div style={{ display: "flex", width:"100%",gap: "5px", alignItems:"center", justifyContent:"center"}}>
            <Tooltip
              title="Finalizar como convertida"
              placement="top-start"
              enterDelay={500}
              leaveDelay={100}
            >
              <Button
                onClick={() => { 
                  setChangeStatusTo({ value: "WON", label: "convertida" });
                  setDialogView(true);
                }}
                variant="contained"
                sx={{
                  mb: 2,
                  width:"120px"
                }}
                style={{color:"#ffff", gap:"5px"}}
                size="small"
                color="success"
                type="submit"
              >
                <BsFillCheckCircleFill/>
                Convertida
              </Button>
            </Tooltip>
            <Tooltip
              title="Finalizar como perdida"
              placement="top-start"
              enterDelay={500}
              leaveDelay={100}
            >
              <Button
                onClick={() => {
                  setChangeStatusTo({ value: "LOST", label: "perdida" });
                  setDialogView(true);
                }}
                variant="contained"
                sx={{
                  mb: 2,
                  width:"120px",
                  gap:"5px"
                }}
                size="small"
                color="error"
                type="submit"
              >
                <FaTimesCircle/>
                Perdida
              </Button>
            </Tooltip>
            <Tooltip
              title="Arquivar negociação"
              placement="top-start"
              enterDelay={500}
              leaveDelay={100}
            >
              <Button
                onClick={() => {
                  setChangeStatusTo({ value: "ARCHIVED", label: "arquivada" });
                  setDialogView(true);
                }}
                // variant="contained"
                size="small"
                sx={{
                  mb: 2,
                  width:"120px",
                  gap:"5px"
                }}
                style={{backgroundColor:"#949494"}}                
                variant="contained"
                type="submit"
              ><IoMdArchive/>
                Arquivada
              </Button>
            </Tooltip>
          </div>
          </div>
          <br />
          <ActionsDealDetailCardContainer>
          <h3 style={{margin:"0", width:"100%", textAlign:"center"}}>Ações do contato</h3>
          <TwoColumnsContainer>
            <div style={{ display: "flex" }}>
              <TextFieldMaskCopy
                label={"E-mail do contato"}
                size="small"
                value={dealDetail.contact?.email}
                copy={dealDetail.contact?.email}
                disabled
              />
              {/* <LinkPhoneStyled>
                <Tooltip
                  title="Copiar email"
                  placement="top-start"
                  enterDelay={500}
                  leaveDelay={100}
                >
                  <IconButton type="submit" aria-label="search">
                    <CopyToClipboard text={dealDetail.contact?.email}>
                      <i className={`fa fa-clone`}></i>
                    </CopyToClipboard>
                  </IconButton>
                </Tooltip>
              </LinkPhoneStyled> */}

              <LinkPhoneStyled href={`mailto:${dealDetail.contact?.email}`}>
                <Tooltip
                  title="Enviar email"
                  placement="top-start"
                  enterDelay={500}
                  leaveDelay={100}
                >
                  <IconButton type="submit" aria-label="search">
                    <i className={`fa fa-envelope-o`}></i>
                  </IconButton>
                </Tooltip>
              </LinkPhoneStyled>
            </div>
            <div style={{ display: "flex" }}>
              <TextFieldMaskCopy
                label={"Telefone do contato"}
                size="small"
                value={dealDetail.contact?.phone}
                copy={dealDetail.contact?.phone}
                disabled
              />{" "}
              {/* <LinkPhoneStyled>
                <Tooltip
                  title="Copiar número"
                  placement="top-start"
                  enterDelay={500}
                  leaveDelay={100}
                >
                  <IconButton type="submit">
                    <CopyToClipboard text={dealDetail.contact?.phone}>
                      <i className={`fa fa-clone`}></i>
                    </CopyToClipboard>
                  </IconButton>
                </Tooltip>
              </LinkPhoneStyled> */}
              <LinkPhoneStyled href={`tel:${dealDetail.contact?.phone}`}>
                <Tooltip
                  title="Ligar"
                  placement="top-start"
                  enterDelay={500}
                  leaveDelay={100}
                >
                  <IconButton type="submit" aria-label="search">
                    <i className={`fa fa-phone`}></i>
                  </IconButton>
                </Tooltip>
              </LinkPhoneStyled>
              <WhatsAppLink
                target="__blank"
                rel="no-referrer"
                href={`https://api.whatsapp.com/send?phone=55${dealDetail.contact?.phone}`}
              >
                <Tooltip
                  title="Ir para WhatsApp"
                  placement="top-start"
                  enterDelay={500}
                  leaveDelay={100}
                >
                  <IconButton type="submit" aria-label="search">
                    <i className={`fa fa-whatsapp`}></i>
                  </IconButton>
                </Tooltip>
              </WhatsAppLink>
            </div>

          </TwoColumnsContainer>
          </ActionsDealDetailCardContainer>

          {hasNewActivity && (
            <NewActivityContainer>
              <TitleStyled style={{display:"flex", gap:"5px"}}>Nova atividade           
                <Tooltip
                      title="Insira a atividade que você realizou para essa negociação, ou que deseja consultar posteriormente"
                      placement="top-start"
                      enterDelay={500}
                      leaveDelay={100}
                    >
                      <div
                        // variant="contained"
                        color="primary"
                        style={{marginTop: 5, cursor:"auto", alignItems:"center", position:"relative", color:"#898989", fontSize:"16px"}}
                      >
                        <FaInfoCircle/>
                      </div>
                    </Tooltip>
            </TitleStyled>
              <TwoColumnsContainer sx={{ rowGap: 2 }}>
                <TextFieldMask
                  label={"Titulo"}
                  sx={{ mt: submited && !data.name ? 3 : 1 }}
                  // variant={""}
                  size="small"
                  required
                  value={data.name}
                  onChange={(event) =>
                    setData({ ...data, name: event.target.value })
                  }
                  error={submited && !data.name}
                />
                <FormControl fullWidth>
                  <InputLabel  required>
                    Tag
                  </InputLabel>
                  <Select
                    label="Tag"
                    fullWidth
                    value={data.tag}
                    size="small"
                    onChange={(event) =>
                      setData({ ...data, tag: event.target.value })
                    }
                  >
                    <MenuItem value={"COLD"}>Fria</MenuItem>
                    <MenuItem value={"WARM"}>Morna</MenuItem>
                    <MenuItem value={"HOT"}>Quente</MenuItem>
                  </Select>
                </FormControl>
              </TwoColumnsContainer>
              <TextFieldMask
                multiline
                label={"Descrição"}
                // variant={"standard"}
                size="medium"
                required
                value={data.description}
                onChange={(event) =>
                  setData({ ...data, description: event.target.value })
                }
                rows={3}
                error={submited && !data.name}
              />
              <ButtonsContainer>
                <Tooltip
                  title="Salvar atividade"
                  placement="top-start"
                  enterDelay={500}
                  leaveDelay={100}
                >
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    size="small"
                    sx={{
                      width: "160px",
                      mt: 1,
                      color: "white",
                    }}
                    color="success"
                    type="submit"
                  >
                    Salvar
                  </Button>
                </Tooltip>

                <Tooltip
                  title="Cancelar atividade"
                  placement="top-start"
                  enterDelay={500}
                  leaveDelay={100}
                >
                  <Button
                    onClick={handleClick}
                    variant="contained"
                    size="small"
                    color="error"
                    type="submit"
                    sx={{
                      width: "160px",
                      mt: 1,
                    }}
                  >
                    Cancelar
                  </Button>
                </Tooltip>
              </ButtonsContainer>
            </NewActivityContainer>
          )}
          <br />
          <h3 style={{marginBottom:"0", width:"100%", textAlign:"center"}}>Histórico de atividades</h3>
          {!hasNewActivity && (
            <div style={{ position: "relative" }}>
              <Tooltip
                title="Adicionar nova atividade"
                placement="top-start"
                enterDelay={500}
                leaveDelay={100}
              >
                <NewActivityButton
                  variant="contained"
                  size="small"
                  color="primary"
                  type="submit"
                  onClick={handleClick}
                >
                  <i style={{ marginRight: "2px" }} className="fa fa-plus"></i>
                  <NewActivityButtonLabel>
                    {" "}
                    Nova atividade
                  </NewActivityButtonLabel>
                </NewActivityButton>
              </Tooltip>
            </div>
          )}
          {dealDetail.activity
            .sort((a, b) =>
              a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0
            )
            .map((act) => (
              <Activity
                key={act.createdAt}
                title={act.name}
                tag={act.tag}
                createdAt={act.createdAt}
                createdBy={act.createdBy.name}
                description={act.description}
              />
            ))}
        </>
      ) : (
        <div>Não foi possivel carregar dados, atualize a pagina</div>
      )}
    </ModalContainer>
  );
  return (
    <>
      <ModalStyled
        open={dealDetailModalState}
        onClose={() => onClose()}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};
export default DetailModal;
