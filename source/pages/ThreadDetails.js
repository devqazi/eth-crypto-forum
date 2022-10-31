import { Button, CircularProgress, Divider, IconButton, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import { AccessTimeOutlined, ArrowBack, PersonOutline } from '@material-ui/icons';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, fetchNextComment } from '../hooks/contractHandlers';
import { Actions } from '../redux-store';

const useStyles = makeStyles(theme => ({
  header: {
    boxShadow: theme.shadows[2],
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 4),
    gap: theme.spacing(2),
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

  const handlePostComment = () => {
    dispatch(createComment(comment));
  }
  const handleGoBack = () => {
    dispatch({ type: Actions.GOTO_TOPIC, payload: -1 });
  }
  return (
    <div>
      <div className={classes.header}>
        <IconButton size="small" color="primary" variant="contained" onClick={handleGoBack}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6">Discussion </Typography>
      </div>
      <div className={classes.body}>
        <Paper className={classes.card} key={topicItem.author + topicItem.createdAt}>
          <Typography gutterBottom variant="h5">{topicItem.title}</Typography>
          <Typography gutterBottom variant="body1">{topicItem.message}</Typography>
          {(topicItem.attachment && topicItem.attachment.length > 1) ?  <img src={'https://gateway.pinata.cloud/ipfs/' + topicItem.attachment} alt="attachment" /> : null}
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
            <Button disabled={busy} style={{ marginLeft: 'auto' }}  variant="contained" color="primary" onClick={handlePostComment}>
              Post Comment
            </Button>
          </div>
          <Typography gutterBottom variant="h5">All Comments {comments.length}</Typography>
          {comments.map((item, index) => (
            <div className={classes.comment} key={index}>
              <div>
                <b>{item.author}</b> - <i>{item.createdAt}</i>
              </div>
              <Typography>{item.message}</Typography>
            </div>
          ))}
        </Paper>
        {busy ? (
          <CircularProgress color="primary" style={{ alignSelf: 'center' }} size={64} /> 
        ) : (
          <Button style={{ alignSelf: 'center' }} variant="contained" onClick={handleMoreComments} >Load More Comments</Button>
        )}
      </div>
    </div>
  )
}

export default ThreadDetails