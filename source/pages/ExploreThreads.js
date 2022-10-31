import React, { useState } from 'react';
import { Button, Chip, CircularProgress, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { AccessTimeOutlined, InfoOutlined, PersonOutline, StarRateTwoTone, WatchOutlined } from '@material-ui/icons';
import CreateTopic from './CreateTopic';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchNextTopic, getNickname, setNickname } from '../hooks/contractHandlers';
import { Actions } from '../redux-store';
import UpdateNickname from './UpdateNickname';

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
  img: {
    width: 90,
  }
}));

const ExploreThreads = ({ }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [createDialog, setCreateDialog] = useState(false);
  const [nickDialog, setNickDialog] = useState(false);
  const busy = useSelector(state => state.busy);
  const topics = useSelector(state => state.topics);
  const nick = useSelector(state => state.nickname || state.address);

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
        <PersonOutline />
        <Typography variant="subtitle1">{nick}</Typography>
        <Button onClick={() => setNickDialog(true)} style={{ marginRight: 'auto' }} variant="outlined" color="primary" size="small">
          Set Nickname
        </Button>
        <Button disabled={busy} color="primary" variant="contained" onClick={() => setCreateDialog(true)}>
          Create New Topic
        </Button>
      </div>
      <div className={classes.body}>
        {topics.map((topicItem, index) => (
          <Paper className={classes.card} key={index}>
            <Typography gutterBottom variant="h5">{topicItem.title}</Typography>
            <Typography gutterBottom variant="body1">{topicItem.message}</Typography>
            {(topicItem.attachment && topicItem.attachment.length > 1) ?  <img className={classes.img} src={'https://gateway.pinata.cloud/ipfs/' + topicItem.attachment} alt="attachment" /> : null}
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
        <UpdateNickname open={nickDialog} onClose={() => setNickDialog(false)} />
      </div>
    </div>
  )
}

export default ExploreThreads;