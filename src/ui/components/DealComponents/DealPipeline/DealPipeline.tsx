import React, { useContext, useState} from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DealCardList from "../DealCard/DealCardList";
import { experimentalStyled as styled } from "@material-ui/core/styles";
import { ListGrid } from "../DealCard/DealCard.style";
import PipelineContext from "contexts/PipelineContext";
import { useFunnelPage } from "data/services/hooks/PageHooks/FunnelHooks";

export const DragDropContextContainer = styled("div")`

  max-width: 100vw;
  width: 100%;
  padding: 0;
`;

const DealPipeline = () => {
  const { onDragEnd, dealsList, pipelines } = useContext(PipelineContext);
  const { funnels } = useFunnelPage()
  const [selectedPipelineName, setSelectedPipelineName] = useState('');
  const [selectedFunnelId, setSelectedFunnelId] = useState('');

  const handlePipelineNameChange = (event) => {
    setSelectedPipelineName(event.target.value);
    setSelectedFunnelId(''); // Limpa o filtro do funil
  };

  const handleFunnelIdChange = (event) => {
    setSelectedFunnelId(event.target.value);
    setSelectedPipelineName(''); // Limpa o filtro do nome do pipeline
  };

  const filteredPipelines = Object.values(dealsList).filter((listKey) => {
    if (selectedFunnelId !== '') {
      const pipeline = pipelines.find((p) => p.id === listKey.id);
      return pipeline.funnel.id === selectedFunnelId;
    } else {
      return listKey.name === selectedPipelineName || selectedPipelineName === '';
    }
  });

  const uniquePipelineNames = Array.from(
    new Set(pipelines.map((pipeline) => pipeline.name))
  );

  const uniqueFunnelIds = Array.from(
    new Set(pipelines.map((pipeline) => pipeline.funnel))
  );

  return (
    <DragDropContextContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListGrid>
          {filteredPipelines.map((listKey) => (
            <DealCardList
              elements={listKey.deals}
              key={listKey.id}
              title={listKey.name}
              subtitle={listKey.description}
              pipeId={listKey.id}
              totalColumnValue={listKey.totalColumnValue}
            />
          ))}
        </ListGrid>
      </DragDropContext>
    </DragDropContextContainer>
  );
};
export default DealPipeline;
