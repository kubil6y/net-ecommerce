import {
  Alert,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { agent } from "../../app/api/agent";

export const TestErrorsPage: FC = () => {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  function handle400() {
    agent.TestErrors.get400Error().catch((err) => console.log(err));
  }

  function handle401() {
    agent.TestErrors.get401Error().catch((err) => console.log(err));
  }

  function handle404() {
    agent.TestErrors.get404Error().catch((err) => console.log(err));
  }

  function handle500() {
    agent.TestErrors.get500Error().catch((err) => console.log(err));
  }

  function handleValidationError() {
    agent.TestErrors.getValidationError()
      .then(() => console.log("you should not see this!"))
      .catch((err) => setValidationErrors(err));
  }

  return (
    <Container>
      <Typography gutterBottom variant="h2">
        Errors for testing purposes
      </Typography>

      <ButtonGroup fullWidth color="error">
        <Button variant="contained" onClick={handle400}>
          Test 400 Error
        </Button>

        <Button variant="contained" onClick={handle401}>
          Test 401 Error
        </Button>

        <Button variant="contained" onClick={handle404}>
          Test 404 Error
        </Button>

        <Button variant="contained" onClick={handle500}>
          Test 500 Error
        </Button>

        <Button variant="contained" onClick={handleValidationError}>
          Test Validation Error
        </Button>
      </ButtonGroup>

      <Box sx={{ marginTop: "2rem" }}>
        {validationErrors.length > 0 && (
          <Alert severity="error">
            <AlertTitle>Validation Errors</AlertTitle>
            <List>
              {validationErrors.map((error, index) => (
                <ListItem key={error + index}>
                  <ListItemText>{error}</ListItemText>
                </ListItem>
              ))}
            </List>
          </Alert>
        )}
      </Box>
    </Container>
  );
};
