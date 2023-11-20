import React, { useState } from 'react';
import IntroContainer from '../IntroContainer/IntroContainer';
import { useLocation, useParams } from 'react-router-dom';
import DeviceSelectionScreen from '../PreJoinScreens/DeviceSelectionScreen/DeviceSelectionScreen';
import SpotLightViewDeviceSelection from './SpotLightViewDeviceSelection';

export default function SpotLightViewPreJoinsScreens() {
  const { URLRoomName } = useParams<{ URLRoomName?: string }>();
  // Use useLocation to access the query string
  const location = useLocation();
  // Parse the query string
  // Parse the query string using URLSearchParams
  const searchParams = new URLSearchParams(location.search);
  const [roomName] = useState<string>(searchParams.get('roomName') || URLRoomName || '');
  return (
    <IntroContainer>
      <SpotLightViewDeviceSelection
        name={
          'Viewer Screen ' +
          Math.random()
            .toString(36)
            .substring(2, 7)
        }
        roomName={roomName}
      />
    </IntroContainer>
  );
}
