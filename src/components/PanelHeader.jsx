import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { theme } from "../theme/customTheme";
import Modals from "../components/Modal";

const PanelHeader = ({ txt, btnTxt, children }) => {
  const useStyle = makeStyles({
    text: {
      padding: theme.spacing(3),
    },
    flex: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
  const classes = useStyle();
  return (
    <Box className={classes.flex}>
      <Box className={classes.text}>
        <Typography variant="h3">{txt}</Typography>
      </Box>
      <Box>
        <Modals btnTxt={btnTxt} children={children} />
      </Box>
    </Box>
  );
};

export default PanelHeader;
