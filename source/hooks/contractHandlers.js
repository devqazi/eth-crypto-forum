import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Actions } from "../redux-store";
import contractJson from './compiled-contract.json'; 

const CONTRACT_ADDRESS = '0x2A6225E86b61E0FA1ACBc977833C456D6695D825';
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
          title: result.title,
          message: result.message,
          author: result.author.slice(0,6) + '...',
          createdAt: result.createdAt.toNumber(),
        }
        dispatch({ type: Actions.TOPIC_FETCHED, payload: topic });
      }
    }
  } catch (error) {
    
  } finally {
    dispatch(isNotBusy());
  }
}


export {
  setNickname,
  getNickname,
  createTopic,
  fetchNextTopic,
}