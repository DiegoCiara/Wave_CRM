import React, { useContext, useEffect, useState } from "react";
import Title from "../../Title/Title";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { ModalContainer } from "./../ModalStyles/ModalContainer.style";
import { ModalStyled } from "./../ModalStyles/Modal.style";
import { CloseButtonStyled } from "./../ModalStyles/CloseButtonModal.style";
import { DealTypes } from "types/Deal";
import { ButtonsContainer } from "../ModalStyles/ButtonsContainer";
import { usePipelineComponent } from "data/services/hooks/componentHooks/PipelineHook";
import { useDealPage } from "data/services/hooks/PageHooks/DealHook";
import { StatusTypes } from "types/Status";
import { useNavBarComponent } from "data/services/hooks/componentHooks/NavHook";
import { formatValue } from "data/utils/formatValue";
import Dialog from "ui/components/Dialog/Dialog";
import DealsService from "data/services/DealsService";
import { InfoContainer } from "./../ModalStyles/CompletedModal.style";
import { MdClose } from "react-icons/md";
import { useFunnelPage } from "data/services/hooks/PageHooks/FunnelHooks";
import PipelineContext from "contexts/PipelineContext";
import Activity from "ui/components/Activity/Activity";

interface AchivedDealModalProps {
  deal: DealTypes;
  setOpen: (value: boolean) => void;
  open: boolean;
  setStatus: (value: StatusTypes) => void;
  getDealsData: () => void;  
  finishedBy: string;
  isAdmin: boolean;
}

const AchivedDealModal: React.FC<AchivedDealModalProps> = ({
  deal,
  setOpen,
  open,
  setStatus,
  getDealsData,
  isAdmin,
  finishedBy,
}) => {
  const [hasRestore, setHasRestore] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [dialogView, setDialogView] = useState(false);
  const [selectedPipeline, setSelectedPipeline] = useState("default");
  // const { pipelines,  getData } = usePipelineComponent();
  const { updateStatusAndRestore } = useDealPage();
  const {funnels} = useFunnelPage()


  const handleDelete = async () => {
    await DealsService.deletedDeal(deal.id);
    getDealsData();
    onClose();
  };

  const onClose = () => {
    setHasRestore(false);
    setSelectedPipeline("default");
    setOpen(false);
  };
  
  
// Definir o primeiro funil como valor padrão para o estado selectedFunnelId
useEffect(() => {
  if (funnels.length > 0) {
    setSelectedFunnelId(funnels[0].id);
  }
}, [funnels]);
  const {
    dealsList, 
    pipelines,
    getPipelines 
  } = useContext(PipelineContext);

  useEffect(() => {
    getPipelines();
  }, []);

  const [selectedPipelineName, setSelectedPipelineName] = useState('');
  const [selectedFunnelId, setSelectedFunnelId] = useState('');


  const handleFunnelIdChange = (event) => {
    setSelectedFunnelId(event.target.value);
  };

  const filteredPipelines = Object.values(dealsList).filter((listKey) => {
    if (selectedFunnelId !== '') {
      const pipeline = pipelines.find((p) => p.id === listKey.id);
      return pipeline.funnel.id === selectedFunnelId;
    } else {
      return listKey.name === selectedPipelineName || selectedPipelineName === '';
    }
  });

  const body = (
    <ModalContainer>
      <Dialog
        title={"Deletar negociação"}
        message={`Tem certeza que deseja deletar ${deal.name}?`}
        type={"question"}
        open={dialogView}
        setOpen={() => setDialogView(false)}
        result={async (res) => {
          if (res) {
            handleDelete();
          }
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

      <Title title={`Ações para ${deal.name}`} />
      {/* <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "5px",
          boxShadow: "0 0 5px rgba(0,0,0,.2)",
          height: "50px",
          padding: "10px", 
          borderRadius: "4px",
        }}
      >
        <Typography variant="body2">{deal.company?.name}</Typography>
        <Typography variant="body2">{deal.pipeline?.name}</Typography>
        <Typography variant="body2">{formatValue(deal?.value)}</Typography> */}
        <InfoContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            height: "auto",
            padding: "10px",
            borderRadius: "4px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              flexDirection: "column",
              height: "80px",
              minWidth: "150px",
              borderRadius: "4px",
            }}
          >
            <Typography variant="body2" color="primary">
              Canal:
            </Typography>
            <Typography variant="body2">{deal.company?.name}</Typography>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              flexDirection: "column",
              height: "80px",
              minWidth: "150px",
              borderRadius: "4px",
            }}
          >
            <Typography variant="body2" color="primary">
              Contato:
            </Typography>
            <Typography variant="body2">{deal.contact?.name}</Typography>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            gap: "20px",
            padding: "10px",

            height: "auto",
            borderRadius: "4px",

            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              flexDirection: "column",
              height: "80px",
              minWidth: "150px",
              borderRadius: "4px",
            }}
          >
            <Typography variant="body2" color="primary">
              Valor:
            </Typography>
            <Typography variant="body2">{formatValue(deal?.value)}</Typography>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              flexDirection: "column",
              height: "80px",
              minWidth: "150px",
              borderRadius: "4px",
            }}
          >
            <Typography variant="body2" color="primary">
              Responsável:
            </Typography>
            <Typography variant="body2">{finishedBy}</Typography>
          </div>
        </div>
      </InfoContainer>

        {!hasRestore ? (
          <div style={{display:"flex", width:"100%", justifyContent:"center", gap:"10px"}}>
            <Tooltip
              title="Retomar negociação"
              placement="top-start"
              enterDelay={500}
              leaveDelay={100}
            >
              <Button
                sx={{ minWidth: 0,  mr: "2px", color: "#ffff", gap:"5px"}}
                variant="contained"
                color="success"
                size="small"
                onClick={() => setHasRestore(true)}
              >
                <i className="fa fa-refresh" aria-hidden="true"></i>Retomar
              </Button>
            </Tooltip>

            {isAdmin ? (
              <Tooltip
                title="Deletar negociação"
                placement="top-start"
                enterDelay={500}
                leaveDelay={100}
              >
                <Button
                  sx={{ minWidth: 0 ,gap:"5px"}}
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => {
                    setDialogView(true);
                  }}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>Deletar
                </Button>
              </Tooltip>
                    ) : null}
              </div>
                ) : null}
              {/* </div> */}
              {hasRestore ? (
                <ModalContainer>
                  <FormControl sx={{ mt: 3 }} fullWidth>             
                    <InputLabel  htmlFor="uncontrolled-native" sx={{mt:"-7px"}}>
                      Funil
                    </InputLabel>
                    <Select
                      sx={{backgroundColor:'#fff', width:"100%"}}
                      size="small"
                      label="Funis"
                      value={selectedFunnelId}
                     onChange={handleFunnelIdChange}
                    >
                      <MenuItem value={null} disabled>Selecione um funil</MenuItem>
                      {funnels.map(( index) => (
                        <MenuItem key={index.id} value={index.id}>
                          {index.name}
                        </MenuItem>
                      ))}
                    </Select>                
                    </FormControl>          
                  <FormControl sx={{ mt: 2 }} fullWidth>
                <InputLabel
                  error={hasError}
                  htmlFor="uncontrolled-native"
                >
                  Pipeline
                </InputLabel>
                <Select
                  value={selectedPipeline}
                  label="Pipeline"
                  onChange={(event) => {
                    if (
                      event.target.value.length &&
                      event.target.value !== "default"
                    ) {
                      setHasError(false);
                    }
                    setSelectedPipeline(event.target.value);
                  }}
                  size="small"
                  fullWidth
                  error={hasError}
                >
                  <MenuItem value={"default"}>Selecione um pipeline</MenuItem>
                  {filteredPipelines.map((pipeline) => (
                    <MenuItem key={pipeline.id} value={pipeline.id}>
                      {pipeline.name}
                    </MenuItem>
                  ))}
                </Select>
                {hasError ? (
                  <Typography variant="caption" color="error">
                    Pipeline é obrigatorio
                  </Typography>
                ) : null}
                  </FormControl>
          <ButtonsContainer>
            <Button
              onClick={async () => {
                if (selectedPipeline.length && selectedPipeline !== "default") {
                  setStatus(
                    await updateStatusAndRestore(deal.id, selectedPipeline)
                  );
                  onClose();
                }
              }}
              variant="contained"
              color="primary"
              startIcon={<i className="fa fa-pensil"></i>}
              sx={{ mt: 2 }}
            >
              Retomar
            </Button>
            <Button
              onClick={() => {
                setHasRestore(false);
                setSelectedPipeline("default");
                setHasError(false);
              }}
              variant="contained"
              color="error"
              startIcon={<i className="fa fa-pensil"></i>}
              sx={{ mt: 2 }}
            >
              Cancelar
            </Button>
          </ButtonsContainer>
        </ModalContainer>
      ) : null}
      <div
        style={{
          margin: "16px",
          padding: "8px",
        }}
      >
        <Title title={`Histórico de atividades`} />
        {deal.activity
          ? deal.activity
              .sort((a, b) =>
                a.createdAt < b.createdAt
                  ? 1
                  : a.createdAt > b.createdAt
                  ? -1
                  : 0
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
              ))
          : null}
      </div>
    </ModalContainer>
  );

  return (
    <>
      <ModalStyled
        open={open}
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
export default AchivedDealModal;
