import { format } from "date-fns";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";


const Actions = {
  WALLET_CONNECTED: 'wallet-connected',
  NICKNAME_UPDATED: 'set-nickname',
  TOPIC_CREATED: 'topic-created',
  COMMENT_CREATED: 'comment-created',
  TOPIC_FETCHED: 'topic-fetched',
  COMMENT_FETCHED: 'comment-fetched',
  GOTO_TOPIC: 'goto-topic',
  BUSY: 'busy',
  NOT_BUSY: 'not-busy',
}


const initialState = {
  nickname: '',
  address: null,
  busy: false,
  topics: [],
  comments: [],
  activeTopic: -1,
}

const rootReducer = (state = initialState, { type, payload }) => {
  if (type === Actions.SET_NICKNAME) {
    return { ...state, nickname: payload };
  } else if (type === Actions.WALLET_CONNECTED) {
    return { ...state, address: payload };
  } else if (type === Actions.BUSY) {
    return {...state, busy: true};
  } else if (type === Actions.NOT_BUSY) {
    return {...state, busy: false};
  } else if (type === Actions.TOPIC_CREATED) {
    let newTopic = {
      ...payload,
      autor: state.address.slice(0,6) + '...' + state.address.slice(-4),
      createdAt: format(Date.now(), 'dd MMM yyyy'),
    }
    return {
      ...state, 
      topics: state.topics.concat([newTopic]),
    }
  } else if (type === Actions.COMMENT_CREATED) {
    let newComment = {
      ...payload,
      topicId: state.activeTopic,
      author: state.address.slice(0,6) + '...' + state.address.slice(-4),
      createdAt: format(Date.now(), 'dd MMM yyyy'),
    }
    return {
      ...state,
      comments: state.comments.concat([newComment]),
    }
  }
  else if (type === Actions.TOPIC_FETCHED) {
    return {
      ...state, 
      topics: state.topics.concat([payload]),
    }
  } else if (type === Actions.COMMENT_FETCHED) {
    return {
      ...state, 
      comments: state.comments.concat([payload]),
    }
  } else if (type === Actions.GOTO_TOPIC) {
    return {
      ...state,
      activeTopic: payload,
      comments: [],
      topics: payload === -1 ? [] : state.topics,
    };
  }
  return state;
}

const store = createStore(rootReducer, applyMiddleware(thunk));

export {
  Actions,
  store,
}