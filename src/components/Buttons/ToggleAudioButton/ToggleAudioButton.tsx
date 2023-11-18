import React, { useEffect } from 'react';

import Button from '@material-ui/core/Button';
import MicIcon from '../../../icons/MicIcon';
import MicOffIcon from '../../../icons/MicOffIcon';

import useLocalAudioToggle from '../../../hooks/useLocalAudioToggle/useLocalAudioToggle';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import { AUDIO_INPUT_MUTED_KEY } from '../../../constants';

export default function ToggleAudioButton(props: { disabled?: boolean; className?: string }) {
  const [isAudioEnabled, toggleAudioEnabled] = useLocalAudioToggle();
  const { localTracks } = useVideoContext();
  const hasAudioTrack = localTracks.some(track => track.kind === 'audio');

  useEffect(() => {
    const audioInputMuted = window.localStorage.getItem(AUDIO_INPUT_MUTED_KEY);
    if (audioInputMuted === 'true' && isAudioEnabled) {
      toggleAudioEnabled(); //mute
      console.log('mute');
    }
  }, [isAudioEnabled]);

  return (
    <Button
      className={props.className}
      onClick={() => {
        toggleAudioEnabled();
        window.localStorage.setItem(AUDIO_INPUT_MUTED_KEY, isAudioEnabled ? 'true' : 'false');
      }}
      disabled={!hasAudioTrack || props.disabled}
      startIcon={isAudioEnabled ? <MicIcon /> : <MicOffIcon />}
      data-cy-audio-toggle
    >
      {!hasAudioTrack ? 'No Audio' : isAudioEnabled ? 'Mute' : 'Unmute'}
    </Button>
  );
}
