import React, { useCallback, useEffect, useRef } from 'react';

import Button from '@material-ui/core/Button';
import VideoOffIcon from '../../../icons/VideoOffIcon';
import VideoOnIcon from '../../../icons/VideoOnIcon';

import useDevices from '../../../hooks/useDevices/useDevices';
import useLocalVideoToggle from '../../../hooks/useLocalVideoToggle/useLocalVideoToggle';
import { AUDIO_INPUT_MUTED_KEY, SELECTED_AUDIO_INPUT_KEY, VIDEO_INPUT_MUTED_KEY } from '../../../constants';

export default function ToggleVideoButton(props: { disabled?: boolean; className?: string }) {
  const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle();
  const lastClickTimeRef = useRef(0);
  const { hasVideoInputDevices } = useDevices();

  useEffect(() => {
    const videoInputMuted = window.localStorage.getItem(VIDEO_INPUT_MUTED_KEY);
    if (videoInputMuted === 'true' && isVideoEnabled) {
      toggleVideoEnabled(); //mute
    }
  }, [isVideoEnabled]);

  const toggleVideo = useCallback(() => {
    if (Date.now() - lastClickTimeRef.current > 500) {
      lastClickTimeRef.current = Date.now();
      toggleVideoEnabled();
    }
    window.localStorage.setItem(VIDEO_INPUT_MUTED_KEY, isVideoEnabled ? 'true' : 'false');
  }, [toggleVideoEnabled]);

  return (
    <Button
      className={props.className}
      onClick={toggleVideo}
      disabled={!hasVideoInputDevices || props.disabled}
      startIcon={isVideoEnabled ? <VideoOnIcon /> : <VideoOffIcon />}
    >
      {!hasVideoInputDevices ? 'No Video' : isVideoEnabled ? 'Stop Video' : 'Start Video'}
    </Button>
  );
}
