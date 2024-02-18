//
import { useRouteError } from "react-router-dom";
import {
  Box, Typography
} from '@mui/material';

//
const ErrorPage = () => {
  //
  const error: any = useRouteError();

  //
  return (
    <Box
      sx={{
        height: '100vh',
        width: '80vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Typography
        variant="h2"
        sx={{
          textAlign: 'center'
        }}
      >
        Ooops. Something went wrong.
      </Typography>

      <Typography
        variant="body1"
        sx={{
          textAlign: 'center'
        }}
      >
        {error?.message}
      </Typography>
    </Box>
  )
};

//
export default ErrorPage;
