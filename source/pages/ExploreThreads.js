import React, { useState } from 'react';
import { Button, Chip, CircularProgress, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { AccessTimeOutlined, InfoOutlined, PersonOutline, WatchOutlined } from '@material-ui/icons';
import CreateTopic from './CreateTopic';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchNextTopic, getNickname, setNickname } from '../hooks/contractHandlers';
import { Actions } from '../redux-store';

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
}));

const ExploreThreads = ({ }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [createDialog, setCreateDialog] = useState(false);
  const busy = useSelector(state => state.busy);
  const topics = useSelector(state => state.topics);

  useEffect(() => {
    if (!topics.length) {
      dispatch(fetchNextTopic());
    }
  }, []);


  const handleMoreTopics = () => {
    dispatch(fetchNextTopic());
  }

  const handleViewDiscussion = (index) => {
    dispatch({ type: Actions.GOTO_TOPIC, payload: index });
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h6">Explore and Participate in Discussions</Typography>
        <Button disabled={busy} color="primary" variant="contained" onClick={() => setCreateDialog(true)}>
          Create New Topic
        </Button>
      </div>
      <div className={classes.body}>
        {topics.map((topicItem, index) => (
          <Paper className={classes.card} key={index}>
            <Typography gutterBottom variant="h5">{topicItem.title}</Typography>
            <Typography gutterBottom variant="body1">{topicItem.message}</Typography>
            <div className={classes.controls}>
              <PersonOutline />
              <span>{topicItem.author}</span>
              <AccessTimeOutlined />
              <span>{topicItem.createdAt}</span>
              <Button variant="outlined" color='primary' style={{ marginLeft: 'auto' }} onClick={() => handleViewDiscussion(index)}>
                View Full Discussion
              </Button>
            </div>
          </Paper>
        ))}
        {busy ? (
          <CircularProgress color="primary" style={{ alignSelf: 'center' }} size={64} /> 
        ) : (
          <Button style={{ alignSelf: 'center' }} variant="contained" onClick={handleMoreTopics} >Load More Topics</Button>
        )}
        <CreateTopic open={createDialog} onClose={() => setCreateDialog(false)} />
      </div>
    </div>
  )
}

export default ExploreThreads;