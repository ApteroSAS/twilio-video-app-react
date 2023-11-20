import React from 'react';
import MainParticipant from '../MainParticipant/MainParticipant';
import { ParticipantAudioTracks } from '../ParticipantAudioTracks/ParticipantAudioTracks';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import ParticipantList from '../ParticipantList/ParticipantList';
import SpotLightViewScreen from './SpotLightViewScreen';

const useStyles = makeStyles((theme: Theme) => {
  const totalMobileSidebarHeight = `${theme.sidebarMobileHeight +
    theme.sidebarMobilePadding * 2 +
    theme.participantBorderWidth}px`;
  return {
    container: {
      position: 'relative',
      height: '100%',
      display: 'grid',
      gridTemplateRows: '100%',
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: `100%`,
        gridTemplateRows: `calc(100% - ${totalMobileSidebarHeight}) ${totalMobileSidebarHeight}`,
      },
    },
  };
});

export default function SpotLightViewRoom() {
  const classes = useStyles();
  return (
    <div className={clsx(classes.container)}>
      <SpotLightViewScreen />
    </div>
  );
}
