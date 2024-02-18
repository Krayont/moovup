//
import {
  Box,
  // Avatar,
} from '@mui/material';
import GoogleMapReact from 'google-map-react';

//
import LocationOnIcon from '@mui/icons-material/LocationOn';

//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Marker = (_data: any) => {
  //
  return (
    <LocationOnIcon
      color="primary"
      sx={{
        width: 48,
        height: 48,
        position: 'absolute',
        bottom: '0%',
        left: '50%',
        transform: 'translate(-50%, 0%)'
      }}
    />
    // <Avatar
    //   src={data.image}
    //   sx={{ width: 64, height: 64 }}
    // >
    // </Avatar>
  )
};

//
const MapWrapper = (props: any) => {

  //
  const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY ?? '';
  //
  const defaultProps = {
    center: {
      lat: props.location?.latitude ?? 0,
      lng: props.location?.longitude ?? 0
    },
    zoom: 11
  };

  return (
    // Important! Always set the container height explicitly
    <Box
      sx={{
        height: '60vh',
        width: '100%'
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker
          lat={props.location?.latitude ?? 0}
          lng={props.location?.longitude ?? 0}
          text={props.name.first ?? ''}
          image={props.image}
        />
      </GoogleMapReact>
    </Box>
  );
}

export default MapWrapper;