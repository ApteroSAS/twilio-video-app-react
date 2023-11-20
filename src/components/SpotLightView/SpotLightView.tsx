import { useAppState } from '../../state';
import useConnectionOptions from '../../utils/useConnectionOptions/useConnectionOptions';
import { VideoProvider } from '../VideoProvider';
import ErrorDialog from '../ErrorDialog/ErrorDialog';
import { ParticipantProvider } from '../ParticipantProvider';
import { ChatProvider } from '../ChatProvider';
import React from 'react';
import SpotLightViewApp from './SpotLightViewApp';

export const SpotLightView = () => {
  const { error, setError } = useAppState();
  const connectionOptions = useConnectionOptions();

  return (
    <VideoProvider options={connectionOptions} onError={setError}>
      <ErrorDialog dismissError={() => setError(null)} error={error} />
      <ParticipantProvider>
        <ChatProvider>
          <SpotLightViewApp />
        </ChatProvider>
      </ParticipantProvider>
    </VideoProvider>
  );
};
