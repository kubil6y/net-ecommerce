import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useHistory, useLocation } from "react-router-dom";

export const ServerError: FC = () => {
  const history = useHistory();
  const { state } = useLocation<any>();

  return (
    <Container component={Paper} sx={{ padding: "1rem" }}>
      {state?.error ? (
        <>
          <Typography variant="h3" gutterBottom color="error">
            {state?.error?.title || ""}
          </Typography>
          <Divider />
          <Typography sx={{ marginTop: "1rem" }}>
            {state.error.detail || ""}
          </Typography>
        </>
      ) : (
        <Typography variant="h5" gutterBottom>
          Server Error
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          width: "100%",
        }}
      >
        <Button
          onClick={() => history.push("/catalog")}
          color="error"
          variant="contained"
          sx={{ marginLeft: "auto" }}
        >
          Go back to the store
        </Button>
      </Box>
    </Container>
  );
};
