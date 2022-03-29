import { FC } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { increment, decrement } from "./counterSlice";

// redux stuff experiment area
export const ContactPage: FC = () => {
  const { data, title } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  return (
    <div>
      <Typography variant="h2">Contact Page</Typography>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="h5">{data}</Typography>
      <Stack direction="row" spacing={2}>
        <Button
          onClick={() => dispatch(decrement(1))}
          variant="contained"
          color="secondary"
        >
          decrement
        </Button>
        <Button
          onClick={() => dispatch(increment(1))}
          variant="contained"
          color="primary"
        >
          increment
        </Button>

        <Button
          onClick={() => dispatch(increment(5))}
          variant="contained"
          color="warning"
        >
          increment by 5
        </Button>
      </Stack>
    </div>
  );
};
