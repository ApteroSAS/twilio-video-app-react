import React, { useEffect } from 'react';
import { Typography, Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import useChatContext from '../../hooks/useChatContext/useChatContext';
import { useAppState } from '../../state';

interface DeviceSelectionScreenProps {
  name: string;
  roomName: string;
}

export default function SpotLightViewDeviceSelection({ name, roomName }: DeviceSelectionScreenProps) {
  const { getToken, isFetching } = useAppState();
  const { connect: chatConnect } = useChatContext();
  const { connect: videoConnect, isAcquiringLocalTracks, isConnecting } = useVideoContext();
  const disableButtons = isFetching || isAcquiringLocalTracks || isConnecting;
  const [joining, setJoining] = React.useState(false);

  useEffect(() => {
    if (!disableButtons && !isFetching && !joining && roomName) {
      setJoining(true);
      setTimeout(async () => {
        await handleJoin();
      }, 1000);
    }
  }, [disableButtons, isFetching, joining, roomName]);

  const handleJoin = async () => {
    console.log('Joining meeting : ' + name + ' in room ' + roomName + '');
    try {
      const { token } = await getToken(name, roomName);
      if (!token) {
        throw new Error('Failed to get token');
      } else {
        await videoConnect(token);
        if (process.env.REACT_APP_DISABLE_TWILIO_CONVERSATIONS !== 'true') {
          chatConnect(token);
        }
      }
    } catch (err) {
      console.error(err);
      setJoining(false);
    }
  };

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
}
