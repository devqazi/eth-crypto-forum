import React from 'react'
import { Button, Dialog, makeStyles, TextField, Typography } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTopic } from '../hooks/contractHandlers';

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(4),
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
}));

const CreateTopic = ({ open, onClose }) => {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const handlePost = () => {
    if (title && message) {
      dispatch(createTopic(title, message));
    }
  }

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={onClose} PaperProps={{ className: classes.card }}>
      <Typography variant="h6" gutterBottom >Create New Topic</Typography>
      <TextField 
        variant="outlined" 
        color="primary" 
        size="small" 
        label="Title" 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
        fullWidth
      />
      <TextField
        style={{ margin: '16px 0' }}
        variant='outlined'
        color="primary"
        size="small"
        label="Message (upto 1KB)"
        multiline
        fullWidth
        minRows={4}
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <div className={classes.controls}>
        <InfoOutlined />
        <span>This operation is irreversible!</span>
        <Button color="primary" variant="contained" style={{ marginLeft: 'auto' }} onClick={handlePost}>
          Post Topic
        </Button>
      </div>
    </Dialog >
  )
}

export default CreateTopic;