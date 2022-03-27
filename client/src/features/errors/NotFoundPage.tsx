import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { Link, useHistory } from "react-router-dom";

export const NotFoundPage: FC = () => {
  return (
    <Container component={Paper} sx={{ padding: "2rem" }}>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Ooops! We could not find what you are looking for.
        <Divider sx={{ margin: "1rem" }} />
        <Button component={Link} fullWidth to="/catalog">
          Go back to shop
        </Button>
      </Typography>
    </Container>
  );
};
