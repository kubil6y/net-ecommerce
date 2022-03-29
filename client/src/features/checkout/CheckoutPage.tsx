import { FC } from "react";
import { Typography } from "@mui/material";

export const CheckoutPage: FC = () => {
  return (
    <Typography variant="h3">
      Only logged in users should be able to see this!
    </Typography>
  );
};
