import React from 'react'
import { Button, CircularProgress, Dialog, makeStyles, TextField, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { contractInstance } from '../hooks/contractHandlers';

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(4),
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
}));
const UpdateNickname = ({ open, onClose }) => {
  const classes = useStyles();
  const [busy, setBusy] = useState(false);
  const [nick, setNick] = useState('');
  const dispatch = useDispatch();

  const handleSaveNickname = async () => {
    if (!nick) return;
    try {
      setBusy(true);
      const { ethereum } = window;
      if (ethereum) {
        let txn = await contractInstance.setNickname(nick);
        await txn.wait();
        setBusy(false);
        dispatch({ type: Actions.NICKNAME_UPDATED, payload: desiredNickname });
      }
    } catch (error) {
      
    } finally {
      setBusy(false);
      onClose();
    }
  }
  const handleClose = () => {
    if (!busy) onClose();
  }

  return (
    <Dialog maxWidth="xs" fullWidth open={open} onClose={handleClose} PaperProps={{ className: classes.card }}>
    <Typography variant="h6" gutterBottom >Choose an inspiring nickname</Typography>
    <TextField 
      variant="outlined" 
      color="primary" 
      size="small" 
      label="Nickname" 
      value={nick} 
      onChange={e => setNick(e.target.value)} 
      fullWidth
      inputProps={{ maxLength: 30 }}
    />
    <div className={classes.controls}>
      <Button disabled={busy} color="primary" variant="contained" style={{ marginLeft: 'auto' }} onClick={handleSaveNickname}>
        Save Nickname
      </Button>
      {busy ? <CircularProgress color="primary" size={32}/> : null}
    </div>
  </Dialog >
  )
}

export default UpdateNickname;