import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Btn from "./Btn";
import CancelTwoToneIcon from "@material-ui/icons/CancelTwoTone";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    maxWidth: 350,
    minWidth: 250,
    backgroundColor: theme.palette.secondary.light,
    border: `2px solid ${theme.palette.secondary.main}`,
    borderRadius: 15,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  btn: {
    float: "right",
    marginTop: theme.spacing(1),
  },
}));

function getModalStyle() {
  return {
    top: `30%`,
    left: `50%`,
    transform: `translate(-50%, -30%)`,
    boxShadow:
      "2px 2px 10px 0 rgba(0, 0, 0, 0.9),-2px -2px 10px 0 rgba(255, 255, 255, 0.1)",
  };
}

const BasicModal = ({ btnTxt, ...props }) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <CancelTwoToneIcon
        color={"error"}
        onClick={handleClose}
        className={classes.btn}
      />
      {props.children}
    </div>
  );

  return (
    <div>
      <Btn text={btnTxt} onOpen={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default BasicModal;
