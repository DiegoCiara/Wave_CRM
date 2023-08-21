import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import HelpOutlineOutlined from "@material-ui/icons/HelpOutlineOutlined";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import React from "react";
import { DialogIconContainer, DialogStyled } from "./Dialog.style";

interface DialogProps {
  title: string;
  message: string | JSX.Element;
  type: "question" | "success" | "info";
  open: boolean;
  setOpen: () => void;
  result: (value: boolean) => void;
}
const Dialog: React.FC<DialogProps> = ({
  title,
  message,
  type,
  open,
  setOpen,
  result,
}) => {
  return (
    <DialogStyled open={open}>
      <DialogIconContainer>
        {type === "info" ? (
          <InfoOutlinedIcon fontSize="inherit" color="primary" />
        ) : type === "question" ? (
          <HelpOutlineOutlined fontSize="inherit" color="primary" />
        ) : (
          <CheckCircleOutline fontSize="inherit" color="success" />
        )}
      </DialogIconContainer>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>

      <DialogActions>
        {type === "question" ? (
          <div style={{display:"flex",justifyContent:"center", width: "100%", gap:"20px"}}>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                result(true);
                setOpen();
              }}
              type="submit"
              sx={{ color: "#fff", width:"100px" }}
            >
              Sim
            </Button>
            <Button
              variant="contained"
              color="error"
              type="submit"
              onClick={() => {
                result(false);
                setOpen();
              }}
              sx={{ color: "#fff", width:"100px" }}
              autoFocus
            >
              Não
            </Button>
          </div>
        ) : (
          <div style={{display:"flex",justifyContent:"center", width: "100%", gap:"20px"}}>
          <Button
            variant="contained"
            color="primary"
            sx={{ color: "#fff", width:"100px" }}
            type="submit"
            onClick={() => { 
              result(false);
              setOpen();
            }}
          >
            Ok
          </Button>

          </div>
        )}
      </DialogActions>
    </DialogStyled>
  );
};
export default Dialog;
