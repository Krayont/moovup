//
import {
  Backdrop,
  CircularProgress
} from '@mui/material';

//
const Loader = (props: any) => {
  //
  return (
    <Backdrop
      open={props.open}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: '#fff',
      }}
    >
      <CircularProgress
        size={100}
        sx={{
          color: '#666',
        }}
      />
    </Backdrop>
  );
}

//
export default Loader;