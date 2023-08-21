import { Icon, Tooltip } from "@material-ui/core";
import { formatValue } from "data/utils/formatValue";
import { getNameInitials } from "data/utils/nameConfig";
import moment from "moment";
import React, { useMemo } from "react";
import theme from "ui/theme/theme";
import {
  DealCardContainer,
  DealTitleStyled,
  DealTypeStyled,
  DealPictureStyled,
  DealBudgetStyled,
  DealDescriptionContainer,
  DealFooterContainer,
  DealEndDateStyled,
} from "./DealCompletedCard.style";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { FaTimesCircle } from "react-icons/fa";
import { IoMdArchive } from "react-icons/io";

export interface DealCardProps {
  companyName: any;
  companyPicture?: any;
  title: any;
  budget: number;
  startDate?: any;
  endDate?: any;
  contactName: any;
  status?: any;
  onClick: any;
  style?: any;
}

const DealCompletedCard: React.FC<DealCardProps> = (props) => {
  const iconTag = useMemo(() => {
    switch (props.status) {
      case "WON":
        return { icon: "thumbs-up", color: "#03f518" };
      case "LOST":
        return { icon: "thumbs-down", color: "#e63706" };
      case "ARCHIVED":
        return { icon: "archive", color: "#01306e" };
      default:
        return { icon: "bolt", color: "#effa5c" };
    }
  }, [props.status]);
  return (
    <DealCardContainer onClick={props.onClick} style={props.style}>
      <div
        style={{
          backgroundColor:"transparent",
          borderRadius: "5px",
          display:"flex",
          alignItems:"center",
        }}
      >
        <DealPictureStyled
        >
      {iconTag.icon === "thumbs-up" && (
        <Tooltip
          title="Convertida"
          placement="top-start"
          enterDelay={500}
          leaveDelay={100}
        >
          <BsFillCheckCircleFill
            className={`fa fa-${iconTag.icon}`}
            fontSize="inherit"
            style={{ color: "#00D34D" }}
          />
        </Tooltip>
      )}
      {iconTag.icon === "thumbs-down" && (
        <Tooltip
          title="Perdida"
          placement="top-start"
          enterDelay={500}
          leaveDelay={100}
        >
          <FaTimesCircle
            className={`fa fa-${iconTag.icon}`}
            fontSize="inherit"
            style={{ color: iconTag.color }}
          />
        </Tooltip>
      )}
      {iconTag.icon === "archive" && (
        <Tooltip
          title="Arquivada"
          placement="top-start"
          enterDelay={500}
          leaveDelay={100}
        >
          <IoMdArchive
            className={`fa fa-${iconTag.icon}`}
            fontSize="inherit"
            style={{ color: iconTag.color }}
          />
        </Tooltip>
      )}
        </DealPictureStyled>
      
      </div>
      <DealDescriptionContainer>
        <DealTitleStyled>{props.title}</DealTitleStyled>
        <DealTypeStyled>{props.contactName}</DealTypeStyled>
        <DealFooterContainer>
          <DealBudgetStyled>{formatValue(props.budget || 0)}</DealBudgetStyled>
          <DealEndDateStyled>
            <Icon className="fa fa-calendar" fontSize="inherit" /> FINAL:  
            {moment(props.endDate).format(" DD/MM/YYYY")}
          </DealEndDateStyled>
        </DealFooterContainer>
      </DealDescriptionContainer>
    </DealCardContainer>
  );
};
export default DealCompletedCard;
