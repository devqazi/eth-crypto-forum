import { Button, CircularProgress, Divider, IconButton, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import { AccessTimeOutlined, ArrowBack, PersonOutline } from '@material-ui/icons';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNextComment } from '../hooks/contractHandlers';

const useStyles = makeStyles(theme => ({
  header: {
    boxShadow: theme.shadows[2],
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 4),
    gap: theme.spacing(2),
    justifyContent: 'space-between',
  },
  card: {
    padding: theme.spacing(4),
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  body: {
    width: '80%',
    maxWidth: 640,
    margin: theme.spacing(2, 'auto'),
    gap: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  comment: {
    margin: theme.spacing(2, 0),
  }
}));

const ThreadDetails = () => {
  const classes = useStyles();
  const topicItem = useSelector(state => state.topics[state.activeTopic] || {});
  const comments = useSelector(state => state.comments);
  const busy = useSelector(state => state.busy);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNextComment());
  }, []);

  const handleMoreComments = () => {
    dispatch(fetchNextComment());
  }
  return (
    <div>
      <div className={classes.header}>
        <IconButton size="small">
          <ArrowBack />
        </IconButton>
        <Typography variant="h6">Discussion </Typography>
        <Button color="primary" variant="contained" onClick={() => setCreateDialog(true)}>
          Somehting
        </Button>
      </div>
      <div className={classes.body}>
        <Paper className={classes.card} key={topicItem.author + topicItem.createdAt}>
          <Typography gutterBottom variant="h5">{topicItem.title}</Typography>
          <Typography gutterBottom variant="body1">{topicItem.message}</Typography>
          <div className={classes.controls}>
            <PersonOutline />
            <span>{topicItem.author}</span>
            <AccessTimeOutlined />
            <span>{topicItem.createdAt}</span>
          </div>
        </Paper>
        <Paper className={classes.card}>
          <Typography gutterBottom variant="h5">Share you thoughts!</Typography>
          <TextField
            style={{ margin: '8px 0' }}
            variant='outlined'
            color="primary"
            size="small"
            label="Message (upto 1KB)"
            multiline
            fullWidth
            minRows={4}
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <div className={classes.controls}>
            <Button style={{ marginLeft: 'auto' }}  variant="contained" color="primary" >
              Post Comment
            </Button>
          </div>
          <Typography gutterBottom variant="h5">All Comments {comments.length}</Typography>
          {comments.map(item => (
            <div className={classes.comment}>
              <div>
                <b>anan-20202</b> - <i>22 Jan 2022</i>
              </div>
              <Typography>This is a random coment by someone  </Typography>
            </div>
          ))}
        </Paper>
        {busy ? (
          <CircularProgress color="primary" style={{ alignSelf: 'center' }} size={64} /> 
        ) : (
          <Button style={{ alignSelf: 'center' }} variant="contained" onClick={handleMoreComments} >Load More Topics</Button>
        )}
      </div>
    </div>
  )
}

export default ThreadDetails