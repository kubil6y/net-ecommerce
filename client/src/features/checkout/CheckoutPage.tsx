import { Typography } from "@mui/material";
import { FC } from "react";

export const CheckoutPage: FC = () => {
  return (
    <Typography variant="h3">
      Only logged in users should be able to see this!
    </Typography>
  );
};
