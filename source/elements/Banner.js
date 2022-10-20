import React from 'react'
import { Button, makeStyles, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { useState } from 'react';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(4),
  },
  text: {
    fontFamily: 'monospace',
    fontSize: 24,
    width: '80%',
    maxWidth: 640,
  },
  blur: {
    filter: 'blur(3px)',
  },
  radacted: {
    color: '#404040',
    backgroundColor: '#303030',
  },
  strike: {
    textDecoration: 'line-through',
  },
  type: {
    fontFamily: 'monospace',
    fontSize: 48,
    fontWeight: 'bold',
  }
}));
let phrases = [
  'Opinions',
  'Thoughts',
  'Ideas',
  'Freedom',
  'Expression',
  'Facts',
]

const getNextColor = (lastColor) => {
  let colors = [
    '#f0245e',
    '#9e32af',
    '#0099f3',
    '#88c047',
    '#ff5606',
    '#7b5446',
    '#ffe72f',
  ];
  while (true) {
    let index = Math.floor(Math.random() * colors.length);
    if (colors[index] !== lastColor) return colors[index];
  }
}
const Banner = () => {
  const classes = useStyles();
  let [index, setIndex] = useState(0);
  let [len, setLen] = useState(0);
  let [color, setColor] = useState(getNextColor('none'));

  useEffect(() => {
    const tick = () => {
      if (len === phrases[index].length) {
        setIndex(index === phrases.length - 1 ? 0 : index + 1);
        setColor(getNextColor);
        setLen(1);
      } else {
        setLen(len + 1);
      }
    }
    let interval = setTimeout(tick, len === phrases[index].length ? 1500 : 120);
    return () => {
      if (interval) {
        clearTimeout(interval);
        interval = null;
      } 
    }
  },[index, len]);

  return (
    <div className={classes.root}>
      <div className={classes.type} style={{ color }}>
        {phrases[index].slice(0,len)}
      </div>  
      <div className={classes.text}>
         ... <span className={classes.blur}>removal or expurgation</span> of content deemed by a 
         critic or critics to be {' '}
         <span className={classes.radacted}>offensive on moral, political, or religious grounds,</span> {' '} 
         the Board{' '} 
         <strike>shall act</strike>
         ...
      </div>
      <Button color="primary" variant="contained" size="large">
        Connect Wallet
      </Button>
    </div>
  )
}

export default Banner;