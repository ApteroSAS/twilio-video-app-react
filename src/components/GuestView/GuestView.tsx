import { useAppState } from '../../state';
import useConnectionOptions from '../../utils/useConnectionOptions/useConnectionOptions';
import { VideoProvider } from '../VideoProvider';
import ErrorDialog from '../ErrorDialog/ErrorDialog';
import { ParticipantProvider } from '../ParticipantProvider';
import { ChatProvider } from '../ChatProvider';
import React from 'react';
import App from './GuestViewApp';
import { AUDIO_INPUT_MUTED_KEY, VIDEO_INPUT_MUTED_KEY } from '../../constants';

export const GuestView = () => {
  const { error, setError } = useAppState();
  const connectionOptions = useConnectionOptions();
  //force mute video and audio
  window.localStorage.setItem(AUDIO_INPUT_MUTED_KEY, 'true');
  window.localStorage.setItem(VIDEO_INPUT_MUTED_KEY, 'true');

  return (
    <VideoProvider options={connectionOptions} onError={setError}>
      <ErrorDialog dismissError={() => setError(null)} error={error} />
      <ParticipantProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </ParticipantProvider>
    </VideoProvider>
  );
};
