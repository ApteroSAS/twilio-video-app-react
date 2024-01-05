import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import EndCallButton from '../Buttons/EndCallButton/EndCallButton';
import Menu from '../MenuBar/Menu/Menu';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    background: 'white',
    paddingLeft: '1em',
    display: 'flex',
    height: `${theme.mobileTopBarHeight}px`,
  },
  endCallButton: {
    height: '28px',
    fontSize: '0.85rem',
    padding: '0 0.6em',
  },
  settingsButton: {
    [theme.breakpoints.down('sm')]: {
      height: '28px',
      minWidth: '28px',
      border: '1px solid rgb(136, 140, 142)',
      padding: 0,
      margin: '0 1em',
    },
  },
}));

export default function TopMenuBar() {
  const classes = useStyles();
  const { room } = useVideoContext();

  return (
    <Grid container alignItems="center" justifyContent="space-between" className={classes.container}>
      <Typography variant="subtitle1">{room!.name}</Typography>
      <div>
        <EndCallButton className={classes.endCallButton} />
        <Menu buttonClassName={classes.settingsButton} />
      </div>
    </Grid>
  );
}
