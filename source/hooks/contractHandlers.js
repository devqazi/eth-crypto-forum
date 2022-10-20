import { format } from "date-fns";
import { ethers } from "ethers";
import { Actions } from "../redux-store";
import contractJson from './compiled-contract.json'; 

const CONTRACT_ADDRESS = '0x920e571fcC519c828a873F660D27571F0f0F82D6';
const CONTRACT_ABI = contractJson.abi;

let contractInstance = null;

const isBusy = () => ({
  type: Actions.BUSY,
})

const isNotBusy = () => ({
  type: Actions.NOT_BUSY,
})


if (!contractInstance) {
  const { ethereum } = window;
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  }
}

const getNickname = () => async (dispatch, getState) => {
  try {
    const { address } = getState();
    dispatch(isBusy());
    const { ethereum } = window;
    if (ethereum) {
      let result = await contractInstance.nicknames(address);
      dispatch({ type: Actions.NICKNAME_UPDATED, payload: result });
    }
  } catch (error) {
    
  } finally {
    dispatch(isNotBusy());
  }
}


const setNickname = (desiredNickname) => async (dispatch) => {
  try {
    dispatch(isBusy());
    const { ethereum } = window;
    if (ethereum) {
      let txn = await contractInstance.setNickname(desiredNickname);
      await txn.wait();
      console.log(txn);
      dispatch({ type: Actions.NICKNAME_UPDATED, payload: desiredNickname });
    }
  } catch (error) {
    
  } finally {
    dispatch(isNotBusy());
  }
}

const createTopic = (title, message) => async (dispatch) => {
  try {
    dispatch(isBusy());
    const { ethereum } = window;
    if (ethereum) {
      let txn = await contractInstance.createTopic(title, message);
      await txn.wait();
      dispatch({ type: Actions.TOPIC_CREATED, payload: { title, message } });
    }
  } catch (error) {
    
  } finally {
    dispatch(isNotBusy());
  }
}

const createComment = (message) => async (dispatch, getState) => {
  try {
    dispatch(isBusy());
    const { activeTopic } = getState();
    const { ethereum } = window;
    if (ethereum) {
      let txn = await contractInstance.createComment(message, activeTopic);
      await txn.wait();
      dispatch({ type: Actions.COMMENT_CREATED, payload: { message } });
    }
  } catch (error) {
    
  } finally {
    dispatch(isNotBusy());
  }
}

// currying
const fetchNextTopic = () => async (dispatch, getState) => {
  try {
    dispatch(isBusy());
    const { topics } = getState();
    const topicIndex = topics.length;
    const { ethereum } = window;
    if (ethereum) {
      let result = await contractInstance.topics(topicIndex);
      if (result) {
        const topic = {
          id: result.id.toNumber(),
          title: result.title,
          message: result.message,
          author: result.author.slice(0,6) + '...' + result.author.slice(-4),
          createdAt: format(result.createdAt.toNumber() * 1000, 'dd MMM yyyy'),
        }
        dispatch({ type: Actions.TOPIC_FETCHED, payload: topic });
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(isNotBusy());
  }
}

const fetchNextComment = () => async (dispatch, getState) => {
  try {
    dispatch(isBusy());
    const { activeTopic, comments } = getState();
    const offset = comments.length;
    const { ethereum } = window;
    if (ethereum) {
      let result = await contractInstance.getNextComment(activeTopic, offset);
      if (result.message) {
        const data = {
          id: result.id.toNumber(),
          message: result.message,
          author: result.author.slice(0,6) + '...' + result.author.slice(-4),
          createdAt: format(result.createdAt.toNumber() * 1000, 'dd MMM yyyy'),
        }
        dispatch({ type: Actions.COMMENT_FETCHED, payload: data });
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(isNotBusy());
  }
}

export {
  setNickname,
  getNickname,
  createTopic,
  createComment,
  fetchNextTopic,
  fetchNextComment,
}