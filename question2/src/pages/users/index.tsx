//
import { useEffect, useState, useMemo, useRef } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Typography,
  Snackbar,
  Alert,
  FormControlLabel,
  Switch,
} from '@mui/material';

//
import ImageIcon from '@mui/icons-material/Image';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

//
import HttpClient from '../../utils/httpClient';

//
import Loader from '../../components/loader';

//
import UserDetail from './details';

//
const UsersList = () => {
  //
  const scrollPosition = useRef(0);

  //
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  //
  const [users, setUsers] = useState([]);
  const memoizedUsers = useMemo(() => users, [users]);

  //
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailPage, setShowDetailPage] = useState(false);

  //
  const [showActiveUsers, setShowActiveUsers] = useState(false);

  //
  useEffect(() => {
    //
    (async () => {
      try {
        //
        const response = await HttpClient.getData(
          `${import.meta.env.VITE_API_ENDPOINT}/data`,
          {
            'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
          }
        );

        setUsers(response);

      } catch (error) {
        setIsError(true);
        setErrorMessage('Failed to retrieve user data, Please try again later.');
        setUsers([]);

      } finally {
        setIsLoading(false);
      }
    })();

  }, []);

  //
  useEffect(() => {
    if (!showDetailPage) {
      window.scrollTo(0, scrollPosition.current);
    }
  }, [showDetailPage]);

  /* ************************************ */
  // Event Hanlders
  /* ************************************ */

  //
  const handleUserRowClick = (user: any) => {
    //
    scrollPosition.current = window.scrollY;
    //
    setSelectedUser(user);
    setShowDetailPage(true);
  };

  //
  const handleOnBack = () => {
    setSelectedUser(null);
    setShowDetailPage(false);
  };

  /* ************************************ */
  // Renderers
  /* ************************************ */

  //
  const renderRow = ((item : any) => {
    //
    let haveValidCoordinates = false;
    if (item.location.latitude !== null && item.location.longitude !== null) {
      haveValidCoordinates = true;
    }

    if (!showActiveUsers && !haveValidCoordinates) {
      return <></>
    }
    //
    return (
      <ListItem
        key={item._id}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: haveValidCoordinates ? 'white' : '#eee',
          borderRadius: '16px',
          mb: 2,
          padding: '16px 32px',
        }}
        secondaryAction={
          haveValidCoordinates ? <ArrowForwardIosIcon /> : <></>
        }
        onClick={() => {
          haveValidCoordinates ? handleUserRowClick(item) : '';
        }}
      >
        <ListItemAvatar>
          <Avatar
            src={item.picture ?? ''}
          >
            {/* Default Image */}
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${item.name?.first ?? ''} ${item.name?.last ?? '-'}`}
          secondary={`${item.email ?? '-'}`}
        />
      </ListItem>
    )
  });

  //
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '0 36px',
      }}
    >
      {/*  */}
      <Loader
        open={isLoading}
      />

      {/* Error */}
      <Snackbar
        open={isError}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => {
          setIsError(false);
          setErrorMessage('');
        }}
      >
        <Alert
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      {/*  */}
      <Box
        sx={{
          mt: 2,
          position: 'sticky',
          top: 0, // Adjust this value as needed
          zIndex: 1000,
          backgroundColor: 'rgba(243, 246, 249)',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            height: '64px',
          }}
        >
          User List
        </Typography>

        <Divider />
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          mt: 2,
        }}
      >
        <FormControlLabel
          control={<Switch />}
          onChange={() => setShowActiveUsers(!showActiveUsers)}
          label="Show All Users"
        />
      </Box>


      {/*  */}
      {!showDetailPage && (
        <>
          {memoizedUsers.length === 0 && (
            <Typography
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 4
              }}
            >
              No Record Found
            </Typography>
          )}

          <List>
            {memoizedUsers.map((item) => {
              return renderRow(item)
            })}
          </List>
        </>
      )}

      {showDetailPage && (
        <UserDetail
          user={selectedUser}
          onBack={handleOnBack}
        />
      )}

    </Box>
  );
};

//
export default UsersList;