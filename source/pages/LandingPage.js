import React from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import Banner from '../elements/Banner';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateRows : '64px 1fr',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    boxShadow: theme.shadows[2],
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 4),
    gap: theme.spacing(2),
    justifyContent: 'space-between',
  }
}));

const LandingPage = ({ onConnectRequest }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h6">Crypto Forums</Typography>
        <Button color="primary" variant="contained" onClick={onConnectRequest}>
          Connect Wallet
        </Button>
      </div>
      <Banner />
    </div>
  )
}

export default LandingPage;