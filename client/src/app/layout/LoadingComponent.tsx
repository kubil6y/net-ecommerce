import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { FC } from "react";

interface ILoadingComponentProps {
  message?: string;
}

export const LoadingComponent: FC<ILoadingComponentProps> = ({
  message = "Loading...",
}) => {
  return (
    <Backdrop open={true} invisible={true}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          heihgt: "100vh",
        }}
      >
        <CircularProgress size={100} color="secondary" />
        <Typography
          variant="h4"
          sx={{
            position: "fixed",
            justifyContent: "center",
            top: "60%",
          }}
        >
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
};
