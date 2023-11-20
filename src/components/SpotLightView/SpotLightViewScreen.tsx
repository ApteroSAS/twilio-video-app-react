import MainParticipantInfo from '../MainParticipantInfo/MainParticipantInfo';
import ParticipantTracks from '../ParticipantTracks/ParticipantTracks';
import React from 'react';
import useMainParticipant from '../../hooks/useMainParticipant/useMainParticipant';
import useSelectedParticipant from '../VideoProvider/useSelectedParticipant/useSelectedParticipant';
import useScreenShareParticipant from '../../hooks/useScreenShareParticipant/useScreenShareParticipant';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import { Participant, RemoteAudioTrack, RemoteParticipant } from 'twilio-video';
import useTracks from '../../hooks/useTracks/useTracks';
import AudioTrack from '../AudioTrack/AudioTrack';

function ParticipantAudioTrack({ participant }: { participant: RemoteParticipant }) {
  const tracks = useTracks(participant);
  const audioTrack = tracks.find(track => track.kind === 'audio') as RemoteAudioTrack | undefined;

  if (audioTrack?.kind === 'audio') return <AudioTrack track={audioTrack} />;

  return null;
}

export default function SpotLightViewScreen() {
  const mainParticipant = useMainParticipant();
  const [selectedParticipant] = useSelectedParticipant();
  const screenShareParticipant = useScreenShareParticipant();

  let participant: RemoteParticipant | null = null;
  if (mainParticipant && mainParticipant && mainParticipant === selectedParticipant) {
    participant = mainParticipant as RemoteParticipant;
  }
  if (mainParticipant && mainParticipant === screenShareParticipant) {
    participant = mainParticipant as RemoteParticipant;
  }

  if (participant) {
    return (
      <MainParticipantInfo participant={participant}>
        <ParticipantAudioTrack participant={participant} />
        <ParticipantTracks
          videoOnly={false}
          participant={participant}
          enableScreenShare={true}
          videoPriority={'high'}
          isLocalParticipant={false}
        />
      </MainParticipantInfo>
    );
  } else {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Adjust height as needed
          width: '100%', // Adjust width as needed
        }}
      >
        <div style={{ textAlign: 'center', color: 'white' }}>No one is currently streaming</div>
      </div>
    );
  }
}
