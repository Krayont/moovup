//
import {
  Box,
  // Divider,
  Typography,
  Button
} from '@mui/material';

//
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

//
import MapWrapper from '../../components/map';

//
const UserDetails = (props: any) => {
  //
  return (
    <>
      <Box
        sx={{
          mt: '16px'
        }}
      >
        <Button
          component="label"
          role={undefined}
          tabIndex={-1}
          startIcon={<ArrowBackIosNewIcon />}
          sx={{

          }}
          onClick={props.onBack}
        >
          Back
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '36px 36px',
        }}
      >
        <Typography
          variant='h5'
          sx={{
            mb: 2
          }}
        >
          {`${props.user?.name?.first ?? ''} ${props.user?.name?.last ?? '-'}`}
        </Typography>

        <MapWrapper
          location={props.user?.location}
          image={props.user?.picture ?? ''}
          name={props.user?.name}
        />
      </Box>

    </>
  );
};

//
export default UserDetails;