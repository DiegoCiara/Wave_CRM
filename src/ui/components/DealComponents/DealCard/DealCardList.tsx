/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useContext, useEffect } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import DealCard from "../DealCard/DealCard";
import { DroppableStyles, ColumnContainer } from "./DealCard.style";
import Title from "ui/components/Title/Title";
import { Button, ButtonGroup, Typography, Tooltip } from "@material-ui/core";
import PipelineContext from "contexts/PipelineContext";
import { formatValue } from "../../../../data/utils/formatValue";
import { FaInfoCircle, FaRegEdit } from "react-icons/fa";
import AuthContext from "contexts/AuthContext";
import theme from "ui/theme/theme";
import { TbMenu2, TbPointFilled } from "react-icons/tb";



const DealCardList = (props) => {
  const [viewButtonGroup, setViewButtonGroup] = useState(false);
  const {
    UseDeleteModal,
    UseUpdateModal,
    UseCreateModal,
    UseCreateDealModal,
    UseDealDetailModal,
    setDescription,
    setSelectedPipeline,
  } = useContext(PipelineContext);
  const { user } = useContext(AuthContext);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user?.role === "ADMIN") {
      setIsAdmin(true);
    }
  }, [user]);

  return (
    <ColumnContainer
    id={props.funnel}
      onClick={() => {
        if (viewButtonGroup) {
          setViewButtonGroup(false);
          
        }
      }}
    >        

      <div style={{ position: "relative", gap:"0"}}>
        <div
        style={isAdmin ? { 
          position: "absolute", 
          left: "35px", 
          width:"30px",} : { display: "none" }}
          onClick={() => {
            setViewButtonGroup(!viewButtonGroup);
          }}       
          className="element-hover"
        >
          <Tooltip title="Editar Pipeline" placement="top-start">
            <i
              style={{ fontSize: "16px" }}
            ><TbMenu2 style={{color:"#908e8e"}}/></i>
          </Tooltip>
        </div>
        {viewButtonGroup ? (
          <ButtonGroup
            sx={{
              position: "absolute",
              left: "30px",
              top: "20px",
              zIndex: "10",
              color:"white",
              backgroundColor: "#808080"
            }}
            orientation="vertical"
            color="primary"

            aria-label="vertical contained primary button group"
            variant="contained"
          >
            {/* <Button
              sx={{ display: "flex", justifyContent: "start", gap: "10px" }}
              onClick={() => {
                setSelectedPipeline(props.pipeId);
                UseCreateDealModal(props.pipeId);
                setViewButtonGroup(!viewButtonGroup);
              }}
            >
              <i className="fa fa-plus-circle" aria-hidden="true"></i>
              Nova negociação
            </Button>
            <Button
              onClick={() => {
                UseCreateModal();
                setViewButtonGroup(!viewButtonGroup);
              }}
              sx={{ display: "flex", justifyContent: "start", gap: "10px" }}
            >
              <i className="fa fa-plus-circle" aria-hidden="true"></i>
              Novo pipeline
            </Button> */}
            <Button
              onClick={() => {
                UseUpdateModal(props.pipeId);
                setViewButtonGroup(!viewButtonGroup);
              }}
              sx={{ display: "flex", justifyContent: "start", gap: "10px" }}
            >
              <i className="fa fa-pencil" aria-hidden="true"></i>
              Editar pipeline
            </Button>
            <Button
              onClick={() => {
                UseDeleteModal(props.pipeId);
                setViewButtonGroup(!viewButtonGroup);
              }}
              sx={{ display: "flex", justifyContent: "start", gap: "10px" }}
            >
              <i className="fa fa-trash" aria-hidden="true"></i>
              Excluir pipeline
            </Button>
          </ButtonGroup>
        ) : (
          ""
        )}
        <div
          style={{ position: "absolute", left: "5px", width:"0", cursor:"auto"}}
          
        >
          <Tooltip title={props.subtitle} placement="top-start">
            <i
              style={{ fontSize: "16px" }}
            ><FaInfoCircle style={{color: theme.palette.grey[60]}}/></i>
          </Tooltip>
        </div>

        <br />
        <Title
          title={props.title}
          subtitle={
            <div style={{ display: "flex", justifyContent: "space-around", alignItems:"center"}}>
              <Tooltip
                title="Valor total das negociações do Pipeline"
                placement="top-start"
              >
                <Typography>{formatValue(props.totalColumnValue)}</Typography>
              </Tooltip>
              <TbPointFilled
                style={{ position: "relative", top: "1px" }}
              />
              <Tooltip
                title="Total de negociações do Pipeline"
                placement="top-start"
              >
                <Typography>{props.elements.length} negociações</Typography>
              </Tooltip>
            </div>
          }
        ></Title>
      </div>
      <DroppableStyles>
        <div>
          <Droppable droppableId={`${props.pipeId}`}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {props.elements.length !== 0 ? (
                  props.elements.map((deal, index) => (
                    <Draggable
                      key={deal.id}
                      draggableId={deal.id}
                      index={index}
                    > 
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <DealCard
                            title={deal.name}
                            companyName={deal.company?.name}
                            contactName={deal.contact?.name}
                            budget={deal.value}
                            startDate={deal.createdAt}
                            tag={deal.activity[deal.activity.length - 1].tag}
                            onClick={() => UseDealDetailModal(deal)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <Button
                    variant="contained"
                    sx={{ width: "100%", height: "30px", gap: "5px" }}
                    color="primary"
                    onClick={() => {
                      UseCreateDealModal(props.pipeId);
                    }}
                    type="submit"
                  >
                    <i className="fa fa-plus"></i> 
                    Adicionar negociação
                  </Button>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DroppableStyles>
    </ColumnContainer>
  );
};
export default DealCardList;