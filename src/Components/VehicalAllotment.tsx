import React, { useState } from 'react';
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { useParkingLot } from '../Context/ParkingLotContext';
import { updateParkingLots } from '../redux/ParkingLot/parkingLotsActions';
import { connect } from 'react-redux';

const boxStyle = {
  borderRadius: 1,
  p: 2,
  m: 1,
  color: 'white',
  fontFamily: 'Roboto',
  fontWeight: '600',
  ':hover': {
    cursor: 'pointer',
  },
};

// var parkingLots: any[] = [];
interface props {
  parkingLots: any[];
  updateParkingLots: any;
}

const VehicalAllotment = (props: props) => {
  const navigate = useNavigate();
  const [regNo, setRegNo] = useState<string>('');
  const [openAlert, setOpenAlert] = React.useState(false);
  const [response, setResponse] = useState('');
  const { parkingLots, updateParkingLots } = props;
  // const ctx = useParkingLot();
  // if (ctx !== null) {
  //   parkingLots = ctx.parkingLots;
  //   var updateParkingLots = ctx.updateParkingLots;
  // }

  const handleAlertClick = () => {
    setOpenAlert(true);
  };

  const handleAlertClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const onFormSubmit = () => {
    const arr: any[] = [...parkingLots];

    // let reducedArr = arr.reduce((accumulator: any, value: any) => {
    //   return value.regNo === '';
    // });

    // let isObjEmpty: boolean = true;
    // for (var i = 0; i < arr.length; i++) {
    //   if (arr[i].regNo === '') {
    //     isObjEmpty = true;
    //     break;
    //   } else {
    //     isObjEmpty = false;
    //   }
    // }

    // arr.forEach((value: any) => {
    //   if (value.regNo === '') {
    //     isObjEmpty = true;
    //   }
    // });

    // let emptyObj = arr.some((lot) => lot.regNo === '');
    // let emptyObj = arr.find((lot) => lot.regNo === '');
    let emptyObj = arr.findIndex((lot) => lot.regNo === '') !== -1;

    if (
      !arr.some((lot) => lot.regNo.toLowerCase() === regNo.toLowerCase().trim())
    ) {
      if (emptyObj) {
        while (true) {
          const random = Math.floor(Math.random() * arr.length);
          const time = new Date().getHours();
          if (arr[random].regNo === '') {
            arr[random].regNo = regNo.trim();
            arr[random].parkingTime = time;
            updateParkingLots(arr);
            setRegNo('');
            setResponse('200');
            handleAlertClick();
          } else {
            continue;
          }
          break;
        }
      } else {
        setResponse('All parking lots are full');
        handleAlertClick();
      }
    } else {
      setResponse('Vehical is already in the parking');
      handleAlertClick();
    }
  };

  const onClickExit = (lot: any) => {
    const tempArr: any[] = [...parkingLots];
    const objId = lot.id;
    const index = parkingLots.findIndex((obj) => obj.id === objId);
    const currentTime = new Date().getHours();
    const parkingTime = tempArr[index].parkingTime;
    const totalTime = currentTime - parkingTime;
    tempArr[index].totalTime = totalTime;
    if (totalTime <= 2) {
      tempArr[index].charges = 10;
    } else {
      tempArr[index].charges = 10 + (totalTime - 2) * 10;
    }
    updateParkingLots(tempArr);
    navigate('/exit', { state: { currentParkingLot: objId } });
  };

  return (
    <>
      <Container maxWidth='lg'>
        <Grid
          container
          minHeight='100vh'
          justifyContent='center'
          alignItems='center'
          columns={{ xs: 4, sm: 8, md: 12 }}
          spacing={{ xs: 2, md: 3 }}
        >
          <Grid item lg={4} sm={4} md={4} xs={4}>
            <Paper elevation={10} sx={{ p: 4, borderRadius: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant='h5'
                  color='primary'
                  fontWeight={600}
                  sx={{ mb: 4 }}
                >
                  Register Vehical
                </Typography>
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <TextField
                    label='Registration No'
                    value={regNo}
                    onChange={(e) => setRegNo(e.target.value)}
                    autoFocus
                    sx={{ mb: 2 }}
                    data-testid='parking-drawing-registration-input'
                  />
                  <Button
                    type='submit'
                    variant='contained'
                    onClick={onFormSubmit}
                    data-testid='parking-drawing-add-car-button'
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
              <Box sx={{ mt: 2 }}>
                {parkingLots?.map((value, index) => (
                  <Box
                    key={index}
                    sx={boxStyle}
                    style={{
                      backgroundColor: `${
                        value.regNo === '' ? '#aebcb4' : '#00C675'
                      }`,
                    }}
                    data-testid={`parking-drawing-space-${value.id}`}
                    onClick={() => onClickExit(value)}
                  >
                    <Typography
                      sx={{ flexGrow: 1 }}
                      fontWeight='600'
                      variant='subtitle1'
                      data-testid={`parking-drawing-registered-${value.id}`}
                    >
                      {`[${value.id}] ${
                        value.regNo === '' ? 'Empty' : value.regNo
                      }`}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      {response === '200' && (
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleAlertClose}
            severity='success'
            variant='filled'
            sx={{ width: '100%' }}
          >
            Vehical added to parking lot
          </Alert>
        </Snackbar>
      )}
      {response !== '200' && (
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleAlertClose}
            severity='error'
            variant='filled'
            sx={{ width: '100%' }}
          >
            {`Error: ${response}`}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return { parkingLots: state.parkingLots };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateParkingLots: (parkingLot: any[]) =>
      dispatch(updateParkingLots(parkingLot)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VehicalAllotment);
