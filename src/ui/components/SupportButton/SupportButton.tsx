import React, { useState } from "react";
import { Button, ButtonGroup, Tooltip } from "@material-ui/core";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FaFile, FaWhatsapp } from "react-icons/fa";


export const SupportButton = () => {
    
  const [viewButtonGroup, setViewButtonGroup] = useState(false);
    return(
        <>
        <div
        style={{
            display:"flex",
            justifyContent:"center",
          position: "absolute", 
          bottom:"10px",
          right: "20px", 
          alignItems:"center",
        }}
          
          onClick={() => {
            setViewButtonGroup(!viewButtonGroup)}}
          className="element-hover MobileNone"
        >
          <Tooltip title="Suporte e dúvidas" placement="top-start">
            <i
           
              style={{ fontSize: "25px" }}
            ><AiOutlineQuestionCircle  className="Support" style={{color:"#00000066"}}/></i>
          </Tooltip>
        </div>
        {viewButtonGroup ? (
          <ButtonGroup
            sx={{
                display:"flex",
                justifyContent:"space-between",
                padding:"5px",
              position: "absolute",
              right: "30px",
              bottom: "60px",
              zIndex: "40",
              color:"white",
              gap:"10px",
              height:"auto",
              backgroundColor: "#00000061"
            }}
            orientation="vertical"
            color="primary"

            aria-label="vertical contained primary button group"
            variant="contained"
          >
          <Tooltip title="Ir para WhatsApp" placement="top-start">
            <Button
              href="https://api.whatsapp.com/send/?phone=5581997052688&text=Olá,%20gostaria%20de%20tirar%20algumas%20dúvidas.&type=phone_number&app_absent=0"
              target="_blank"
              sx={{ display: "flex", justifyContent: "start", gap: "10px" }}
            >
              <FaWhatsapp style={{ fontSize:" 18px"}}/>
              Suporte via WhatsApp
            </Button>
            </Tooltip>
            {/* <Button
              onClick={() => {
              }}
              sx={{ display: "flex", justifyContent: "start", gap: "10px" }}
              
            >
              <FaFile/>
               Materiais e dúvidas frequentes
            </Button> */}
          </ButtonGroup>
        ) : (
          ""
        )}

        </>
    )
}