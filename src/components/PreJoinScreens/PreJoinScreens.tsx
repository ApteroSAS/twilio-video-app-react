import React, { useState, useEffect } from 'react';
import DeviceSelectionScreen from './DeviceSelectionScreen/DeviceSelectionScreen';
import IntroContainer from '../IntroContainer/IntroContainer';
import MediaErrorSnackbar from './MediaErrorSnackbar/MediaErrorSnackbar';
import { useAppState } from '../../state';
import { useLocation, useParams } from 'react-router-dom';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import { PREVIOUSLY_JOINED_KEY, USER_NAME_KEY } from '../../constants';

export default function PreJoinScreens() {
  const { user } = useAppState();
  const { getAudioAndVideoTracks } = useVideoContext();
  const { URLRoomName } = useParams<{ URLRoomName?: string }>();
  // Use useLocation to access the query string
  const location = useLocation();
  // Parse the query string
  // Parse the query string using URLSearchParams
  const searchParams = new URLSearchParams(location.search);

  const [name, setName] = useState<string>(
    user?.displayName || localStorage.getItem(USER_NAME_KEY) || searchParams.get('userName') || ''
  );
  const [roomName] = useState<string>(searchParams.get('roomName') || URLRoomName || '');

  const [mediaError, setMediaError] = useState<Error>();

  useEffect(() => {
    if (!mediaError) {
      getAudioAndVideoTracks().catch(error => {
        console.log('Error acquiring local media:');
        console.dir(error);
        setMediaError(error);
      });
    }
  }, [getAudioAndVideoTracks, mediaError]);

  return (
    <IntroContainer>
      <MediaErrorSnackbar error={mediaError} />
      <DeviceSelectionScreen
        name={name}
        roomName={roomName}
        setName={(name: string) => {
          localStorage.setItem(USER_NAME_KEY, name);
          setName(name);
        }}
      />
    </IntroContainer>
  );
}
