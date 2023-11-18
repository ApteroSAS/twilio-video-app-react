export const BACKGROUND_FILTER_VIDEO_CONSTRAINTS: MediaStreamConstraints['video'] = {
  width: 640,
  height: 480,
  frameRate: 24,
};

export const DEFAULT_VIDEO_CONSTRAINTS: MediaStreamConstraints['video'] = {
  width: 1280,
  height: 720,
  frameRate: 24,
};

// These are used to store the selected media devices in localStorage
export const SELECTED_AUDIO_INPUT_KEY = 'TwilioVideoApp-selectedAudioInput';
export const SELECTED_AUDIO_OUTPUT_KEY = 'TwilioVideoApp-selectedAudioOutput';
export const SELECTED_VIDEO_INPUT_KEY = 'TwilioVideoApp-selectedVideoInput';

export const VIDEO_INPUT_MUTED_KEY = 'TwilioVideoApp-VideoInput-muted';
export const AUDIO_INPUT_MUTED_KEY = 'TwilioVideoApp-AudioInput-muted';
export const PREVIOUSLY_JOINED_KEY = 'TwilioVideoApp-previouslyJoined';
export const USER_NAME_KEY = 'TwilioVideoApp-userName';

// This is used to store the current background settings in localStorage
export const SELECTED_BACKGROUND_SETTINGS_KEY = 'TwilioVideoApp-selectedBackgroundSettings';

export const GALLERY_VIEW_ASPECT_RATIO = 9 / 16; // 16:9
export const GALLERY_VIEW_MARGIN = 3;
