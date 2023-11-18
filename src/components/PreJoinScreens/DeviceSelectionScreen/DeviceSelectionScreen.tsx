import React, { ChangeEvent, useEffect } from 'react';
import { makeStyles, Typography, Grid, Button, Theme, Hidden, InputLabel, TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import LocalVideoPreview from './LocalVideoPreview/LocalVideoPreview';
import { DeviceSettingsMenu } from './SettingsMenu/SettingsMenu';
import ToggleAudioButton from '../../Buttons/ToggleAudioButton/ToggleAudioButton';
import ToggleVideoButton from '../../Buttons/ToggleVideoButton/ToggleVideoButton';
import { useAppState } from '../../../state';
import useChatContext from '../../../hooks/useChatContext/useChatContext';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import { useKrispToggle } from '../../../hooks/useKrispToggle/useKrispToggle';
import { PREVIOUSLY_JOINED_KEY } from '../../../constants';

const useStyles = makeStyles((theme: Theme) => ({
  gutterBottom: {
    marginBottom: '1em',
  },
  marginTop: {
    marginTop: '1em',
  },
  deviceButton: {
    width: '100%',
    border: '2px solid #aaa',
    margin: '1em 0',
  },
  localPreviewContainer: {
    paddingRight: '2em',
    marginBottom: '2em',
    [theme.breakpoints.down('sm')]: {
      padding: '0 2.5em',
    },
  },
  joinButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      width: '100%',
      '& button': {
        margin: '0.5em 0',
      },
    },
  },
  mobileButtonBar: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '1.5em 0 1em',
    },
  },
  mobileButton: {
    padding: '0.8em 0',
    margin: 0,
  },
  toolTipContainer: {
    display: 'flex',
    alignItems: 'center',
    '& div': {
      display: 'flex',
      alignItems: 'center',
    },
    '& svg': {
      marginLeft: '0.3em',
    },
  },
}));

interface DeviceSelectionScreenProps {
  name: string;
  roomName: string;
  setName: (name: string) => void;
}

export default function DeviceSelectionScreen({ name, roomName, setName }: DeviceSelectionScreenProps) {
  const classes = useStyles();
  const { getToken, isFetching, isKrispEnabled, isKrispInstalled } = useAppState();
  const { connect: chatConnect } = useChatContext();
  const { connect: videoConnect, isAcquiringLocalTracks, isConnecting } = useVideoContext();
  const { toggleKrisp } = useKrispToggle();
  const disableButtons = isFetching || isAcquiringLocalTracks || isConnecting;

  const [previouslyJoined, setPreviouslyJoined] = React.useState<boolean>(
    localStorage.getItem(PREVIOUSLY_JOINED_KEY) === 'true'
  );

  useEffect(() => {
    const firstTimeFlag = localStorage.getItem(PREVIOUSLY_JOINED_KEY);
    setPreviouslyJoined(firstTimeFlag === 'true');
    if (firstTimeFlag === null) {
      localStorage.setItem(PREVIOUSLY_JOINED_KEY, 'true');
    }
  }, []);

  useEffect(() => {
    if (previouslyJoined && !disableButtons) {
      setTimeout(() => {
        handleJoin();
      }, 1000);
    }
  }, [previouslyJoined, disableButtons]);

  const handleJoin = () => {
    getToken(name, roomName)
      .then(({ token }) => {
        if (!token) {
          console.error('no token');
          localStorage.removeItem(PREVIOUSLY_JOINED_KEY);
        } else {
          videoConnect(token);
          process.env.REACT_APP_DISABLE_TWILIO_CONVERSATIONS !== 'true' && chatConnect(token);
        }
      })
      .catch(err => {
        console.error('error');
        console.error(err);
        localStorage.removeItem(PREVIOUSLY_JOINED_KEY);
      });
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  if (isFetching || isConnecting || (previouslyJoined && roomName && name)) {
    return (
      <Grid container justifyContent="center" alignItems="center" direction="column" style={{ height: '100%' }}>
        <div>
          <CircularProgress variant="indeterminate" />
        </div>
        <div>
          <Typography variant="body2" style={{ fontWeight: 'bold', fontSize: '16px' }}>
            Joining Meeting
          </Typography>
        </div>
      </Grid>
    );
  } else {
    return (
      <>
        <Typography variant="h5">Join {roomName}</Typography>

        <Grid container justifyContent="center">
          <Grid item md={7} sm={12} xs={12}>
            <div className={classes.localPreviewContainer}>
              <LocalVideoPreview identity={name} />
            </div>
            <div className={classes.mobileButtonBar}>
              <Hidden mdUp>
                <ToggleAudioButton className={classes.mobileButton} disabled={disableButtons} />
                <ToggleVideoButton className={classes.mobileButton} disabled={disableButtons} />
                <DeviceSettingsMenu mobileButtonClass={classes.mobileButton} />
              </Hidden>
            </div>
          </Grid>
          <Grid item md={5} sm={12} xs={12}>
            <Grid container direction="column" justifyContent="space-between" style={{ alignItems: 'normal' }}>
              <div>
                <Hidden smDown>
                  <ToggleAudioButton className={classes.deviceButton} disabled={disableButtons} />
                  <ToggleVideoButton className={classes.deviceButton} disabled={disableButtons} />
                </Hidden>
              </div>
            </Grid>
          </Grid>

          <Grid item md={12} sm={12} xs={12}>
            <div>
              <InputLabel shrink htmlFor="input-user-name">
                Your Name
              </InputLabel>
              <TextField
                id="input-user-name"
                variant="outlined"
                fullWidth
                size="small"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <Grid container direction="row" alignItems="center" style={{ marginTop: '1em' }}>
              <Hidden smDown>
                <Grid item md={7} sm={12} xs={12}>
                  <DeviceSettingsMenu mobileButtonClass={classes.mobileButton} />
                </Grid>
              </Hidden>

              <Grid item md={5} sm={12} xs={12}>
                <div className={classes.joinButtons}>
                  <Button
                    variant="contained"
                    color="primary"
                    data-cy-join-now
                    onClick={handleJoin}
                    disabled={disableButtons}
                  >
                    Join Now
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}
